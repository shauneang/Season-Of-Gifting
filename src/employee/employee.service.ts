import { PrismaClient } from "@prisma/client"
import { Employee } from "../types/tableTypes"
import prisma from "../utils/client"

export const getEmployee = async (staff_pass_id:string, db: PrismaClient): Promise<Employee | null> => {
    return prisma.employee.findUnique({
        where:{
            staff_pass_id
        }
    })
}

export const listEmployees = async (db: PrismaClient): Promise<Array<Employee>> => {
    return prisma.employee.findMany()
}

export const getEmployeeTeamName = async (staff_pass_id:string, db: PrismaClient): Promise<string> => {
        const employee = await getEmployee(staff_pass_id, db)
        if (!employee) {
            throw new Error("No employee found")
        }
        return employee.team_name
}

export const getTeam = async (team_name:string, db: PrismaClient): Promise<Array<Employee>> => {
    return prisma.employee.findMany({
        where:{
            team_name
        }
    })
}
