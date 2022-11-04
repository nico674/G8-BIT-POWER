import {belongsTo, Entity, hasMany, model, property, hasOne} from '@loopback/repository';
import {Area} from './area.model';
import {Management} from './management.model';
import {Section} from './section.model';
import {User} from './user.model';
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

  @belongsTo(() => Management)
  managementId: string;

  @hasMany(() => User)
  users: User[];

  @belongsTo(() => Section)
  sectionId: string;

  @hasMany(() => Area)
  areas: Area[];

  @hasOne(() => Invoice)
  invoice: Invoice;

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
