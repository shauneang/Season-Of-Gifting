import {db} from '../src/utils/db.server'
import fs from 'fs';
import csv from 'csv-parser';

type Employee = {
    staff_pass_id: string
    team_name: string
    created_at: bigint
}

type Redemption = {
    team_name: string
    redeemed_at: bigint
}

async function seed() {
    await Promise.all(
        (await getEmployees()).map(employee => {
            const {staff_pass_id, team_name, created_at} = employee
            return db.employee.create({
                data:{
                    staff_pass_id,
                    team_name,
                    created_at
                }
            })
        })
    )
}

async function readCSVFile(filePath: string): Promise<Employee[]> {
    const results: Employee[] = [];
    
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
}

async function getEmployees(): Promise<Array<Employee>> {
    return readCSVFile('csv-team-mapping-long.csv')
}

seed()