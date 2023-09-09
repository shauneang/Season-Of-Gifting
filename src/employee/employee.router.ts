import type { Request, Response} from "express";
import express from "express";
import {body, validationResult} from "express-validator";
import * as EmployeeService from "./employee.service";
export const employeeRouter = express.Router();

// GET: Employee with staff_pass_id
employeeRouter.get("/:staff_pass_id", async (request: Request, response: Response) => {
    try{
        const employee = await EmployeeService.getEmployee(request.params.staff_pass_id.toString())
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
        const employee = await EmployeeService.listEmployees()

        return response.status(200).json(employee)
    }
    catch(e: any) {
        return response.status(500).json(e.message)
    }
})

// GET: Check if team_name exists
employeeRouter.get("/team/:team_name", async (request: Request, response: Response) => {
    try{
        const employees = await EmployeeService.getTeam(request.params.team_name.toString())
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