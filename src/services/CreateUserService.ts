import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
interface IUserRequest{
	name: string;
	email: string;
	admin?: boolean;
	password: string;
}

class CreateUserService{
	async execute({ name, email, admin, password} : IUserRequest){
		const usersRepository = getCustomRepository(UsersRepositories);

		if(!email){
			throw new Error("Email incorrect");
		}


		const userAlreadExists = await usersRepository.findOne({
			email
		});

		if(userAlreadExists){
			throw new Error("Usuario já existe");
		}

		const passwordhash = await hash(password, 8);

		const user = usersRepository.create({
			name,
			email,
			admin,
			password: passwordhash,	 
		});

		await usersRepository.save(user);

		return user;
	}
}

export { CreateUserService };