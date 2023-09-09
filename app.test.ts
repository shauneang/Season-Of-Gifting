import makeApp from "./src/app";

const request = require('supertest');
const app = makeApp()

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

    it('GET /api/employee/:staff_pass_id --> Employees', () => {
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

    it('GET /api/employee/:staff_pass_id --> 404 if employee not found', () => {
        const nonEmployeeId = "fakeId"
        return request(app)
        .get(`/api/employee/${nonEmployeeId}`)
        .expect(404)
        .then((response:any) => {
            expect(response.body).toEqual("Employee could not be found")
        })
    });

    it('GET /api/employee/:team_name --> True if team_name exists', () => {
        const existingTeam = "SLYTHERIN"
        return request(app)
        .get(`/api/employee/team/${existingTeam}`)
        .expect(200)
        .then((response:any) => {
            expect(response.body).toEqual(true)
        })
    })

    it('GET /api/employee/:team_name --> False if team_name does not exist', () => {
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

    it('GET /api/redemption/:team_name --> Redemption', () => {
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
    });

    it('GET /api/redemption/:team_name --> 404 if redemption not found', () => {
        const unredeemedTeam = "unredeemedTeam"
        return request(app)
        .get(`/api/redemption/${unredeemedTeam}`)
        .expect(404)
        .then((response:any) => {
            expect(response.body).toEqual("Redemption could not be found")
        })
    });

    it('GET /api/redemption/eligible/:staff_pass_id --> True if team has not redeemed', () => {})

    it('GET /api/redemption/eligible/:staff_pass_id --> False if team has redeemed', () => {
        const employeeId = "BOSS_CEQOWI8GNAB3"

        return request(app)
        .get(`/api/redemption/eligible/${employeeId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response: any) => {
            expect(response.body).toEqual(false)
        })
    });

    it('POST /api/redemption/:staff_pass_id --> Redemption if staff\'s team has not redeemed', () => {})

    it('POST /api/redemption/:staff_pass_id --> 409 if staff\'s team has redeemed', () => {})
});