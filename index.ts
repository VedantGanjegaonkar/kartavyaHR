import {errorHandler} from "./middleware/errorHandler.middleware"

import express from "express"
import mongoose from "mongoose"

import userRoutes from "./routes/user.routes"
import jobPOstRoutes from "./routes/jobPost.routes"
 
const app = express()
const port = 3000

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.use("/user", userRoutes)
app.use("/jobpost",jobPOstRoutes)


app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('welcome to kartavya HR')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect('mongodb+srv://vedantsg112233:MzUFmOl5GA6oCL77@cluster0.rfaqwkb.mongodb.net/kartavya?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('connected to DB');
  });