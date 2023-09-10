import makeApp from "../src/app";
import { prismaMock } from '../src/utils/__mocks__/mockClient'
import prisma from '../src/utils/client'
import { createRedemption, deleteRedemption } from "../src/redemption/redemption.service";
const request = require('supertest');
const app = makeApp(prisma)

describe("Employees API", () => {
    it('GET /api/employee --> List of all Employees', () => {
        return request(app)
        .get('/api/employee')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response: any) => {
            expect(response.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    staff_pass_id: expect.any(String),
                    team_name: expect.any(String),
                    created_at: expect.any(String)
                })
            ]))
        })
    });

    it('GET /api/employee/:staff_pass_id --> Employee', async () => {
        await prismaMock.employee.create({
            data: {
                staff_pass_id: "BOSS_CEQOWI8GNAB3", 
                team_name: "SLYTHERIN" 
            }
        })

        const employeeId = "BOSS_CEQOWI8GNAB3"
        return request(app)
        .get(`/api/employee/${employeeId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response: any) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    staff_pass_id: expect.any(String),
                    team_name: expect.any(String),
                    created_at: expect.any(String)
                })
            )
        })
    });

    it('GET /api/employee/:staff_pass_id --> 404 if employee not found', async() => {
        const nonEmployeeId = "fakeId"
        return request(prismaMock)
        .get(`/api/employee/${nonEmployeeId}`)
        .expect(404)
        .then((response:any) => {
            expect(response.body).toEqual("Employee could not be found")
        })
    });

    it('GET /api/employee/:team_name --> True if team_name exists', async() => {
        const existingTeam = "SLYTHERIN"
        return request(app)
        .get(`/api/employee/team/${existingTeam}`)
        .expect(200)
        .then((response:any) => {
            expect(response.body).toEqual(true)
        })
    })

    it('GET /api/employee/:team_name --> False if team_name does not exist', async() => {
        const nonExistingTeam = "nonExistingTeam"
        return request(app)
        .get(`/api/employee/team/${nonExistingTeam}`)
        .expect(404)
        .then((response:any) => {
            expect(response.body).toEqual(false)
        })
    })

});

describe("Redemption API", () => {
    it('POST /api/redemption/:staff_pass_id --> Redemption if staff\'s team has not redeemed', async() => {
        const unredeemedTeamMember = "BOSS_CEQOWI8GNAB3"
        return request(app)
        .post(`/api/redemption/${unredeemedTeamMember}`)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response: any) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    team_name: expect.any(String),
                    redeemed_at: expect.any(String)
                })
            )

            deleteRedemption(response.body.team_name)
        })
    })

    it('POST /api/redemption/:staff_pass_id --> 409 if staff\'s team has redeemed', async() => {
        const redeemedTeamMember = "STAFF_AZ5HS58J5NA6"
        // await createRedemption(redeemedTeamMember)

        return request(app)
        .post(`/api/redemption/${redeemedTeamMember}`)
        .expect('Content-Type', /json/)
        .expect(409)
        .then((response: any) => {
            expect(response.body).toEqual("Team already redeemed")
        })
    })

    it('GET /api/redemption/:team_name --> Redemption', async() => {
        const redeemedTeam = "SLYTHERIN"
        return request(app)
        .get(`/api/redemption/${redeemedTeam}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response: any) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    team_name: expect.any(String),
                    redeemed_at: expect.any(String)
                })
            )
        })
    })

    it('GET /api/redemption/:team_name --> 404 if redemption not found', async() => {
        const unredeemedTeam = "unredeemedTeam"
        return request(app)
        .get(`/api/redemption/${unredeemedTeam}`)
        .expect(404)
        .then((response:any) => {
            expect(response.body).toEqual("Redemption could not be found")
        })
    });

    it('GET /api/redemption/eligible/:staff_pass_id --> True if team has not redeemed', async() => {
        const employeeId = "MANAGER_JRTGFCAS9F52"
        return request(app)
        .get(`/api/redemption/eligible/${employeeId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response: any) => {
            expect(response.body).toEqual(true)
        })
    })

    it('GET /api/redemption/eligible/:staff_pass_id --> False if team has redeemed', async() => {
        const employeeId = "BOSS_CEQOWI8GNAB3" // Team RAVENCLAW

        return request(app)
        .get(`/api/redemption/eligible/${employeeId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response: any) => {
            expect(response.body).toEqual(false)
        })
    });
});