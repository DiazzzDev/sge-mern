import express from "express";
import controllerTeachers from "../controllers/teachers.js"

const router = express.Router()

router.route("/")
.get(controllerTeachers.get)

router.route("/:id")
.put(controllerTeachers.put)
.delete(controllerTeachers.delete)


export default router