import express from "express"
import type { Request, Response} from "express"
import {body, validationResult} from "express-validator"

import * as EmployeeService from "./employee.service"
export const employeeRouter = express.Router()

// GET: Employee with staff_pass_id
employeeRouter.get("/:id", async (request: Request, response: Response) => {
    try{
        if (request.params.id == undefined) throw new Error('Id is undefined')
        const employee = await EmployeeService.getEmployee(request.params.id.toString())
        if(employee){
            return response.status(200).json(employee)
        }
        else {
            return response.status(405).json("Employee could not be found")
        }
    }
    catch(e: any) {
        return response.status(500).json(e.message)
    }
})

// GET: List all employee
employeeRouter.get("/", async (request: Request, response: Response) => {
    try{
        const employees = await EmployeeService.listEmployees()

        return response.status(200).json(employees)
    }
    catch(e: any) {
        return response.status(500).json(e.message)
    }
})