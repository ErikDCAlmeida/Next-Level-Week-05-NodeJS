import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";


class UsersService {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository =  getCustomRepository(UsersRepository);
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
        
        return user;
    }

    async create(email: string) {
        //Verificar se o usuário existe.
        const userExists = await this.usersRepository.findOne({
            email
        })

        if (userExists) {
            return userExists;
        }

        //Se não existir, salvar no banco de dados.
        const user = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(user);
        //Se existir, retornar o usuário.

        return user;
    };
}

export { UsersService };