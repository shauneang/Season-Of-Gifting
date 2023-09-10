import * as dotenv from "dotenv"
import makeApp from "./app"
import prisma from "./utils/client"

dotenv.config()

if(!process.env.PORT) {
    process.exit(1)
}
const app = makeApp(prisma)

const PORT = parseInt(process.env.PORT as string, 10);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})