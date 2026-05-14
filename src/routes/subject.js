import express from "express";
import controllerSubject from "../controllers/subject.js";

const router = express.Router()

router.route("/")
.get(controllerSubject.get)
.post(controllerSubject.post)

router.route("/:id")
.put(controllerSubject.put)
.delete(controllerSubject.delete)


export default router