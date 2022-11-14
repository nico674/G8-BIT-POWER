<<<<<<< HEAD
import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Management} from './management.model';
import {Property} from './property.model';

=======
import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Management} from './management.model';
import {Property} from './property.model';


>>>>>>> 1-dev-ds-dot-env
@model()
export class Section extends Entity {
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
  name: string;

  @property({
    type: 'string',
<<<<<<< HEAD
    required: true,
  })
  description: string;
=======
  })
  description?: string;


  // @property({
  //   type: 'string',
  // })
  // managementId: string;
>>>>>>> 1-dev-ds-dot-env

  @belongsTo(() => Management)
  managementId: string;

  @hasMany(() => Property)
  properties: Property[];

  constructor(data?: Partial<Section>) {
    super(data);
  }
}

export interface SectionRelations {
  // describe navigational properties here
}

export type SectionWithRelations = Section & SectionRelations;
