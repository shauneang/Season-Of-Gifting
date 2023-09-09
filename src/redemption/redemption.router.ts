import express from "express"
import type { Request, Response} from "express"
import {body, validationResult} from "express-validator"

import * as EmployeeService from "../employee/employee.service";
import * as RedemptionService from "./redemption.service";
import { Prisma } from "@prisma/client";
export const redemptionRouter = express.Router()

// GET: Redemption with team_name
redemptionRouter.get("/:team_name", async (request: Request, response: Response) => {
    try{
        if (request.params.team_name == undefined) throw new Error('Team name is undefined')
        const redemption = await RedemptionService.getRedemption(request.params.team_name.toString())
        if(redemption){
            return response.status(200).json(redemption)
        }
        else {
            return response.status(404).json('Redemption could not be found')
        }
    }
    catch(e: any) {
        return response.status(500).json(e.message)
    }
})

//POST: Create Redemption with staff_pass_id 
redemptionRouter.post("/:staff_pass_id", async (request: Request, response: Response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }
    try{
        const team_name = await EmployeeService.getEmployeeTeamName(request.params.staff_pass_id)
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

//GET: Check Redemption with staff_pass_id 
redemptionRouter.get("/eligible/:staff_pass_id", body("staff_pass_id").isString(), async (request: Request, response: Response) => {
    try{
        const team_name = await EmployeeService.getEmployeeTeamName(request.params.staff_pass_id)
        const eligible = await RedemptionService.eligibleForRedemption(team_name)
        // const message = eligible ? `Team ${team_name} is eligible` : `Team ${team_name} is not eligible`
        return response.status(200).json(eligible)
    }
    catch(e: any) {
        return response.status(500).json(e.message)
    }
})