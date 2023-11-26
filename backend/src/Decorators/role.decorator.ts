import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/Entities/Role.enum';

export const ROLES_KEY = 'role'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
