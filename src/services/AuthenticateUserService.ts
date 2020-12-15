import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if(!user) {
      throw new Error('Incorrect email password combination! ');
    }

    // user.password - senha criptografada
    // password - senha nao criptografada

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new Error('Incorrect email password combination! ');
    }

    // experiencia do usuario / segurança

    const token = sign({  }, '6330576eaba5f7ca96f70ecb487ae334', {
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
