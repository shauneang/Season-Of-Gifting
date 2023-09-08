import express from "express"
import type { Request, Response} from "express"
import {body, validationResult} from "express-validator"

import * as EmployeeService from "../employee/employee.service";
import * as RedemptionService from "./redemption.service";
import { Prisma } from "@prisma/client";
export const redemptionRouter = express.Router()

//POST: Redemption with staff_pass_id 
redemptionRouter.post("/", body("staff_pass_id").isString(), async (request: Request, response: Response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }
    try{
        const staff_pass_id = request.body.staff_pass_id
        const team_name = await EmployeeService.getEmployeeTeamName(staff_pass_id)
        const newRedemption = await RedemptionService.createRedemption(team_name)
        return response.status(201).json(newRedemption)
    }
    catch(e: any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') { // Unique constraint error
                return response.status(409).json("Team already redeemed")
            }
        }
        return response.status(500).json(e.message)
    }
})

//GET: Redemption with staff_pass_id 
redemptionRouter.get("/eligible", body("staff_pass_id").isString(), async (request: Request, response: Response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }
    try{
        const team_name = await EmployeeService.getEmployeeTeamName(request.body.staff_pass_id)
        const eligible = await RedemptionService.eligibleForRedemption(team_name)
        const message = eligible ? `Team ${team_name} is eligible` : `Team ${team_name} is not eligible`
        return response.status(201).json(message)
    }
    catch(e: any) {
        return response.status(500).json(e.message)
    }
})