import dotenv from "dotenv";

dotenv.config()

export const config = {
    port: process.env.PORT,
    db: {
        URI: process.env.DB_URI
    },
    JWT: {
        secret: process.env.JWT_SECRET
    },
    email:{
        user_email: process.env.USER_EMAIL,
        user_password:process.env.USER_PASSWORD,
    }
}