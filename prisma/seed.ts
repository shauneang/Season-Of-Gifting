import {db} from '../src/utils/db.server'
import fs from 'fs';
import csv from 'csv-parser';
import { Employee } from '../src/types/tableTypes';

async function seed() {
    await Promise.all(
        (await getEmployees()).map(employee => {
            const {staff_pass_id, team_name, created_at} = employee
            // const date = new Date(created_at).getTime()
            return db.employee.create({
                data:{
                    staff_pass_id,
                    team_name
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