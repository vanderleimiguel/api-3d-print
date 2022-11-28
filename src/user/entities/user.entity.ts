import { UserDto } from '../services/dto/userInput.dto';

// duas opções, como ja esta criado no dto não precisa criar inteiro, apenas extender
// export interface IUserEntity {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
//   cpf: string;
//   role: string;
// }

export interface IUserEntity extends UserDto {
  id: string;
}
