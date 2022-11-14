import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Property} from './property.model';
import {Payment} from './payment.model';

<<<<<<< HEAD
=======

>>>>>>> 1-dev-ds-dot-env
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
<<<<<<< HEAD
    type: 'string',
=======
    type: 'date',
>>>>>>> 1-dev-ds-dot-env
    required: true,
  })
  dateTime: string;

  @property({
    type: 'string',
    required: true,
  })
  managementId: string;

<<<<<<< HEAD
=======
  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // propertyId: string;

>>>>>>> 1-dev-ds-dot-env
  @belongsTo(() => Property)
  propertyId: string;

  @hasOne(() => Payment)
  payment: Payment;

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
