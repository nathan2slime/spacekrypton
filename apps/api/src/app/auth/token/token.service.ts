import { Injectable } from '@nestjs/common';
import { decode, sign } from 'jsonwebtoken';

const TOKEN_HASH = process.env.TOKEN_HASH || 'spacekrypton';

export type TokenData = {
  id: number;
};

@Injectable()
export default class TokenService {
  generate(id: number) {
    return sign({ id }, TOKEN_HASH, {
      expiresIn: '7d',
    });
  }

  decode(data: string) {
    return decode(data) as TokenData;
  }
}
