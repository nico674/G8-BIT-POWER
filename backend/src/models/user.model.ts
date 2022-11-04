import {belongsTo, Entity, hasMany, model, property, hasOne} from '@loopback/repository';
import {Property} from './property.model';
import {Role} from './role.model';
import {Management} from './management.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  secondName?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstSurname: string;

  @property({
    type: 'string',
  })
  secondSurname?: string;

  @property({
    type: 'number',
    required: true,
  })
  documentType: number;

  @property({
    type: 'string',
    required: true,
  })
  documentNumber: string;

  @property({
    type: 'boolean',
    required: true,
  })
  sex: boolean;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'boolean',
    required: true,
  })
  state: boolean;

  @hasMany(() => Role)
  roles: Role[];

  @belongsTo(() => Property)
  propertyId: string;

  @hasOne(() => Management)
  management: Management;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
