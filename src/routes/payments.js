import express from "express";
import controllerPayments from "../controllers/payments.js"

const router = express.Router()

router.route("/")
.get(controllerPayments.get)
.post(controllerPayments.post)

router.route("/:id")
.put(controllerPayments.put)
.delete(controllerPayments.delete)

export default router