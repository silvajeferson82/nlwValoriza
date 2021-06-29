import "reflect-metadata";
import express from "express";
import { router } from "./routes";



import "./database"

const app = express();

app.use(express.json);

app.use(router);


app.listen(3031, () => console.log("Server Running in 3031 - NLW#6")); 