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
    return db.employee.findMany({
        select:{
            staff_pass_id:true,
            team_name:true,
            created_at:true
        }
    })
}
