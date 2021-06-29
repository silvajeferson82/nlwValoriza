import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest{
	name: string;
	emai: string;
	admin?: boolean
}

class CreateUsersService{
	async execute({ name, email, admin} : IUserRequest){
		const UsersRepository = new UsersRepositories();

		if(!email){
			throw new Error("Email incorrect");
		}


		const userAlreadExists = await UsersRepository.findOne({
			email
		});

		if(userAlreadExists){
			throw new Error("User alread exists");
		}

		const user = UsersRepository.create({
			name,
			email,
			admin	 
		})

		await userRepository.save(user);

		return user;
	}
}

export { CreateUsersService };