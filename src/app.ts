import express from "express"
import cors from "cors"

import {employeeRouter} from "./employee/employee.router" 
import { redemptionRouter } from "./redemption/redemption.router"

export default function makeApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/api/employee", employeeRouter)
    app.use("/api/redemption", redemptionRouter)
    return app
}
