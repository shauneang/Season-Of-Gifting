import { Employee } from "../types/tableTypes"
import {db} from "../utils/db.server"

export const getEmployee = async (staff_pass_id:string): Promise<Employee | null> => {
    return db.employee.findUnique({
        where:{
            staff_pass_id
        }
    })
}

export const listEmployees = async (): Promise<Array<Employee>> => {
    return db.employee.findMany()
}

export const getEmployeeTeamName = async (staff_pass_id:string): Promise<string> => {
        const employee = await getEmployee(staff_pass_id)
        if (!employee) {
            throw new Error("No employee found")
        }
        return employee.team_name
}
