import express from "express";
import controllerRegisterTeachers from "../controllers/registerTeachers.js";

const router = express.Router()

router.route("/")
.post(controllerRegisterTeachers.post)

router.route("/verify")
.post(controllerRegisterTeachers.verifyCode)


export default router