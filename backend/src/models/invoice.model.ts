import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Management} from './management.model';
import {Payment} from './payment.model';

@model()
export class Invoice extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'string',
    required: true,
  })
  dateTime: string;

  @belongsTo(() => Management)
  managementId: string;

  @property({
    type: 'string',
  })
  propertyId?: string;

  @hasMany(() => Payment)
  paymentId: Payment[];

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
