import { Injectable } from '@nestjs/common';
import { decode, sign } from 'jsonwebtoken';

const TOKEN_HASH = process.env.TOKEN_HASH || 'spacekrypton';

export type TokenData = {
  id: number;
};

@Injectable()
export default class TokenService {
  generate(id: number, expiresIn: string | number = '7d') {
    return sign({ id }, TOKEN_HASH, {
      expiresIn,
    });
  }

  decode(data: string) {
    return decode(data) as TokenData;
  }
}
