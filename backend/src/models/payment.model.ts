import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Invoice} from './invoice.model';

@model()
export class Payment extends Entity {
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
  voucher: number;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'boolean',
    required: true,
  })
  partial: boolean;

  @property({
    type: 'string',
    required: true,
  })
  dateTime: string;

  @belongsTo(() => Invoice)
  invoiceId: string;

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  // describe navigational properties here
}

export type PaymentWithRelations = Payment & PaymentRelations;
