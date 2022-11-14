import {Entity, model, property, hasMany} from '@loopback/repository';
import {Section} from './section.model';

<<<<<<< HEAD
=======

>>>>>>> 1-dev-ds-dot-env
@model()
export class Management extends Entity {
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
  condominiumName: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  bankAccount: string;

  @property({
    type: 'string',
    required: true,
  })
  bankName: string;

  @property({
    type: 'number',
    required: true,
  })
  interest: number;

  @property({
    type: 'string',
    required: true,
  })
  invoiceStart: string;

  @property({
    type: 'number',
    required: true,
  })
  currentBudget: number;

  @property({
    type: 'number',
    required: true,
  })
  totalArea: number;

  @property({
    type: 'string',
    required: true,
  })
<<<<<<< HEAD
  userId: string;
=======
  managerId: string;
>>>>>>> 1-dev-ds-dot-env

  @hasMany(() => Section)
  sections: Section[];

  constructor(data?: Partial<Management>) {
    super(data);
  }
}

export interface ManagementRelations {
  // describe navigational properties here
}

export type ManagementWithRelations = Management & ManagementRelations;
