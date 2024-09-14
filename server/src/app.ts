import "module-alias/register"
import express from "express"
import { PORT } from "@/app.config"
import dramaUploadRouter from "@/routes/drama-upload"
import { useMongoDB } from "./db"
import UserRoute from "@/routes/UserRoute"

const app = express()
const db = useMongoDB()
db.connect()
app.use(express.json())

app.use("/drama",dramaUploadRouter);
app.use("/api/v1/user",UserRoute);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}...`);
})
