import {Entity, model, property} from '@loopback/repository';

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
    required: true,
  })
  secondName: string;

  @property({
    type: 'string',
    required: true,
  })
  firstSurname: string;

  @property({
    type: 'string',
    required: true,
  })
  secondSurname: string;

  @property({
    type: 'string',
    required: true,
  })
  documentType: string;

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
  userName: string;

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

  @property({
    type: 'string',
    required: true,
  })
  propertyId: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
