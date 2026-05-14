import express from "express";
import controllerRegisterStudent from "../controllers/registerStudent.js"

const router = express.Router()

router.route("/")
.post(controllerRegisterStudent.post)

router.route("/verify")
.post(controllerRegisterStudent.verifyCode)

export default router