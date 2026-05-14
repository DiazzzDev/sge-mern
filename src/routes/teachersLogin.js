import express from "express";
import controllerTeacherLogin from "../controllers/teachersLogin.js";

const router = express.Router()

router.route("/")
.post(controllerTeacherLogin.login)

export default router