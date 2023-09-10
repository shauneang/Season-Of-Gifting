import type { Request, Response} from "express";
import express from "express";
import {body, validationResult} from "express-validator";
import * as EmployeeService from "./employee.service";
import { PrismaClient } from "@prisma/client";

export default function makeEmployeeRouter(db: PrismaClient) {
    const employeeRouter = express.Router();

    // GET: Employee with staff_pass_id
    employeeRouter.get("/:staff_pass_id", async (request: Request, response: Response) => {
        try{
            const employee = await EmployeeService.getEmployee(request.params.staff_pass_id.toString(), db)
            if(employee){
                return response.status(200).json(employee)
            }
            else {
                return response.status(404).json('Employee could not be found')
            }
        }
        catch(e: any) {
            return response.status(500).json(e.message)
        }
    })

    // GET: List all employee
    employeeRouter.get("/", async (request: Request, response: Response) => {
        try{
            const employees = await EmployeeService.listEmployees(db)
            return response.status(200).json(employees)
        }
        catch(e: any) {
            return response.status(500).json(e.message)
        }
    })

    // GET: Check if team_name exists
    employeeRouter.get("/team/:team_name", async (request: Request, response: Response) => {
        try{
            const employees = await EmployeeService.getTeam(request.params.team_name.toString(), db)
            const teamExists = employees.length > 0
            if (teamExists) {
                return response.status(200).json(teamExists)
            }
            else {
                return response.status(404).json(teamExists)
            }
        }
        catch(e: any) {
            return response.status(500).json(e.message)
        }
    })

    return employeeRouter
}
