import * as dotenv from "dotenv"
import getApp from "./app"

dotenv.config()

if(!process.env.PORT) {
    process.exit(1)
}

const app = getApp()

const PORT = parseInt(process.env.PORT as string, 10);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})