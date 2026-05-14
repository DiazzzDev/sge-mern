import mongoose from "mongoose";
import { config } from "./config.js";

mongoose.connect(config.db.URI)

const connection = mongoose.connection

connection.once("open", () => {
    console.log("Database connected")
})

connection.on("disconnected", () => {
    console.log("Database is disconnected")
})

connection.on("error", (error) => {
    console.log("Error found " + error)
})