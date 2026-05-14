import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import teacherRoutes from "./src/routes/teachers.js";
import studentRoutes from "./src/routes/students.js";
import registerTeacherRoutes from "./src/routes/registerTeachers.js";
import registerStudentRoutes from "./src/routes/registerStudent.js";
import paymentRoutes from "./src/routes/payments.js";
import logoutRoutes from "./src/routes/logout.js";
import subjectRoutes from "./src/routes/subject.js"
import specialtyRoutes from "./src/routes/speciality.js"

//Initialize expressjs app
const app = express()

//Origins allowed to consume endpoints (frontend)
app.use(cors({
    origin: ["http://127.0.0.1:5173"],
    credentials: true //Allow cookies
}))

//Hadle cookies on server
app.use(cookieParser())

//Support JSON
app.use(express.json())

app.use("/api/teachers", teacherRoutes)
app.use("/api/registerTeachers", registerTeacherRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/registerStudents", registerStudentRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/logout", logoutRoutes)
app.use("/api/subjects", subjectRoutes)
app.use("/api/specialties", specialtyRoutes)

export default app