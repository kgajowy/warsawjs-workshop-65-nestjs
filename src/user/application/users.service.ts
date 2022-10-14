import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../infrastructure/database/user.entity';

import { plainToInstance } from 'class-transformer';
import { isDefined, validateSync } from 'class-validator';
import * as E from 'fp-ts/Either';
import { User } from '../contracts/user';

export const notFound = Symbol('User not found.');
export const unknownError = Symbol('User was formally incorrect');

export type UserError = typeof notFound | typeof unknownError;
export type UserCreationError = typeof unknownError;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async create(name: string): Promise<E.Either<UserCreationError, User>> {
    const user = await this.repo.save({
      name,
    });

    const dto = plainToInstance(User, user);
    const errors = validateSync(dto);

    if (errors.length > 0) {
      // should roll back - or verify before ;)
      return E.left(unknownError);
    }

    return E.right(dto);
  }

  async find(id: string): Promise<E.Either<UserError, User>> {
    try {
      const user = await this.repo.findOne({
        where: {
          id,
        },
      });

      if (!isDefined(user)) {
        return E.left(notFound);
      }

      const dto = plainToInstance(User, user);
      const errors = validateSync(dto);

      if (errors.length > 0) {
        return E.left(unknownError);
      }

      return E.right(dto);
    } catch (error) {
      console.log('[reporter]', error);
      return E.left(notFound);
    }
  }
}
