import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Section} from './section.model';
import {Invoice} from './invoice.model';

@model()
export class Property extends Entity {
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
  owner: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  coefficient: number;

  @property({
    type: 'number',
    required: true,
  })
  area: number;

  @property({
    type: 'string',
    required: true,
  })
  managementId: string;

  @belongsTo(() => Section)
  sectionId: string;

  @hasMany(() => Invoice)
  invoices: Invoice[];

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
