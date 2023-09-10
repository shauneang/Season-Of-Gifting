import { PrismaClient, Redemption } from "@prisma/client"
import { getEmployeeTeamName } from "../employee/employee.service"
import { Employee } from "../types/tableTypes"
import prisma from "../utils/client"

export const getRedemption = async (team_name:string, db: PrismaClient): Promise<Redemption | null> => {
    return prisma.redemption.findUnique({
        where:{
            team_name
        }
    })
}

export const createRedemption = async (team_name:string,db?: PrismaClient): Promise<Redemption> => {
    return prisma.redemption.create({
        data: {
            team_name
        },
        select:{
            team_name:true,
            redeemed_at:true
        }
    })
}

export const eligibleForRedemption = async (team_name:string, db: PrismaClient): Promise<boolean> => {
    const redemption =  await getRedemption(team_name, db)
    return redemption === null
}

export const deleteRedemption = async (team_name:string,db?: PrismaClient): Promise<Redemption> => {
    return prisma.redemption.delete({
        where:{
            team_name
        }
    })
}