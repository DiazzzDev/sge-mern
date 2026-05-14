import "./database.js"
import app from "./app.js"
import { config } from "./config.js"

const main = async (PORT) => {
    app.listen(PORT)
    console.log("Server on port: " + PORT)
}

main(config.port)