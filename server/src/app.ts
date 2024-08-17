import "module-alias/register"
import express from "express"
import { PORT } from "@/app.config"
import dramaUploadRouter from "@/routes/drama-upload"

const app = express()

app.use(express.json())

app.use("/drama",dramaUploadRouter);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}...`);
})
