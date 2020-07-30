import { IUserRepository } from '../../repositories/IUserRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../entities/User';
import { IMailProvider } from '../../providers/IMailProvider';

export class CreateUserUseCase {
	constructor(
		private userRepo: IUserRepository,
		private mailProvider: IMailProvider
	) {}

	async execute(data: ICreateUserRequestDTO) {
		const userAlreadyExists = await this.userRepo.findByEmail(data.email);

		if (userAlreadyExists) {
			throw new Error('User already exists.');
		}

		const user = new User(data);

    await this.userRepo.save(user);
    
    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'App Team',
        email: 'team@app.com'
      },
      subject: 'Seja bem-vindo à nossa plataforma!',
      body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    });
	}
}
