import {Entity, hasMany, model, property} from '@loopback/repository';
import {Invoice} from './invoice.model';
import {Property} from './property.model';

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
  userId: string;

  @hasMany(() => Property)
  properties: Property[];

  @hasMany(() => Invoice)
  invoices: Invoice[];

  constructor(data?: Partial<Management>) {
    super(data);
  }
}

export interface ManagementRelations {
  // describe navigational properties here
}

export type ManagementWithRelations = Management & ManagementRelations;
