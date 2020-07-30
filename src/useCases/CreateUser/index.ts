import { MailtrapMailProvider } from '../../providers/implementations/MailtrapMailProvider';
import { PostgresUserRepository } from '../../repositories/implementations/PostgresUserRepo';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';

const postgresUserRepository = new PostgresUserRepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const createUserUseCase = new CreateUserUseCase(
  postgresUserRepository,
  mailtrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
