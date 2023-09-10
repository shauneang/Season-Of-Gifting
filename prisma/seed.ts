import prisma from '../src/utils/client'
// import prismaMock from '../src/utils/mockClient'
import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';
import { prismaMock } from '../src/utils/__mocks__/mockClient';

type csvRow = {
    staff_pass_id: string
    team_name: string
    created_at: string
}

export default async function seed(db: PrismaClient) {
    await Promise.all(
        (await getEmployees()).map(employee => {
            let {staff_pass_id, team_name, created_at} = employee
            const d = new Date(0)
            d.setUTCMilliseconds(+created_at)
            return db.employee.create({
                data:{
                    staff_pass_id,
                    team_name,
                    created_at: d
                }
            })
        })
    )
}

async function readCSVFile(filePath: string): Promise<csvRow[]> {
    const results: csvRow[] = [];
    
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
}

async function getEmployees(): Promise<Array<csvRow>> {
    return readCSVFile('csv-team-mapping-long.csv')
}

seed(prisma)