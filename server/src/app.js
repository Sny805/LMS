import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import courseRouter from "./routes/course.routes.js";

const app = express()


app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

// Routing 

app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)






export default app;