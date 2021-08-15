import {Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
  sub: string;
}

export function ensureAthenticated(
  request: Request,
  response: Response,
  next: NextFunction
){
  //Receber o token
  const authToken = request.headers.authorization;
  
  //Validar se o token está preenchido
  if(!authToken){
    return response.status(401).end(); 
  }

  const [,token] = authToken.split(" ")

  try {
    const { sub } = verify( token, "90880e6e12ef332464804bbc9cd31e5a") as IPayload;
   
    request.user_id = sub;
    
    return next(); 
  } catch (error) {
    return response.status(401).end("Não foi possivel validar seu token!");
  }
}