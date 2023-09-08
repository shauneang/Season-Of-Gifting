import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"

import {employeeRouter} from "./employee/employee.router" 
import { redemptionRouter } from "./redemption/redemption.router"

dotenv.config()

if(!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/employee", employeeRouter)
app.use("/api/redemption", redemptionRouter)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})