import express from "express";
import controllerSpeciality from "../controllers/speciality.js";

const router = express.Router()

router.route("/")
.get(controllerSpeciality.get)
.post(controllerSpeciality.post)

router.route("/:id")
.put(controllerSpeciality.put)
.delete(controllerSpeciality.delete)

export default router