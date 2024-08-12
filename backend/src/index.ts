import express, { Router } from "express";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { userRoute } from "./routes/userRoute";
import { adminRoute } from "./routes/adminRoute";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoute);
app.use('/admin', adminRoute);

const PORT = process.env.PORT || 8000;

app.listen(process.env.PORT, () => {
  console.log("Server running on port" + process.env.PORT);
});
