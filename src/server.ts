import "reflect-metadata";
import express from "express";

import "./database"

const app = express();

/**
 * Tipos de parâmetros
 * Routes Params -> http://localhost:3031/produtos/?????????
 * Query Parms ->
 * 
 * Body Params ->
 * */

 /**
  * Request(req) => Entrando
  * Response(res) => Saindo
  * */

app.get("/teste",(req, res)=>{
	return res.send("Teste da rota GET");
})

app.post("/teste-post",(req, res)=>{
	return res.send("Teste da rota POST");
})

app.listen(3031, () => console.log("Server Running in 3031 - NLW#6"));