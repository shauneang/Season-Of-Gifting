import express from "express"
import cors from "cors"

import makeEmployeeRouter from "./employee/employee.router" 
import makeRedemptionRouter from "./redemption/redemption.router"
import { PrismaClient } from "@prisma/client";

export default function makeApp(db: PrismaClient) {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/api/employee", makeEmployeeRouter(db))
    app.use("/api/redemption", makeRedemptionRouter(db))
    return app
}
