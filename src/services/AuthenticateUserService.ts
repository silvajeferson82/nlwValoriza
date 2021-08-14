import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";



interface IAuthenticareRequest{
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticareRequest){
    const userRepositories = getCustomRepository(UsersRepositories)

    const user = await userRepositories.findOne({
      email
    });

    if(!user){
      throw new Error("Email ou senha Incorretos!"); 
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Email ou senha Incorretos!");
    }

    const token = sign(
      {
        email: user.email,
      },
      "90880e6e12ef332464804bbc9cd31e5a",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };