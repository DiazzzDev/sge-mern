import express from "express";
import controllerStudentLogin from "../controllers/studentsLogin.js";

const router = express.Router()

router.route("/")
.post(controllerStudentLogin.login)

export default router