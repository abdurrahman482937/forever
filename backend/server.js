import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"

// App Config
const app = express()
const port = process.env.PORT || 3000
connectDB()
connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

// Api endpoints
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
    res.send("Server Running..")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
})