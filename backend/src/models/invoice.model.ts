import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'string',
    required: true,
  })
  extraFeeId?: string;


  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
