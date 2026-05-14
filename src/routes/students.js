import express from "express";
import controllerStudents from "../controllers/students.js";

const router = express.Router()

router.route("/")
.get(controllerStudents.get)

router.route("/:id")
.put(controllerStudents.put)
.delete(controllerStudents.delete)

export default router