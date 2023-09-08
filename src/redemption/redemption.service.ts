import { Redemption } from "@prisma/client"
import { getEmployeeTeamName } from "../employee/employee.service"
import { Employee } from "../types/tableTypes"
import {db} from "../utils/db.server"

export const getRedemption = async (team_name:string): Promise<Redemption | null> => {
    return db.redemption.findUnique({
        where:{
            team_name
        }
    })
}

export const createRedemption = async (team_name:string): Promise<Redemption> => {
    return db.redemption.create({
        data: {
            team_name
        },
        select:{
            team_name:true,
            redeemed_at:true
        }
    })
}

export const eligibleForRedemption = async (team_name:string): Promise<boolean> => {
    const redemption =  await getRedemption(team_name)
    return redemption === null
}