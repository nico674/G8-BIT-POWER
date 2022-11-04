import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Property,
  Area,
} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertyAreaController {
  constructor(
    @repository(PropertyRepository) protected propertyRepository: PropertyRepository,
  ) { }

  @get('/properties/{id}/areas', {
    responses: {
      '200': {
        description: 'Array of Property has many Area',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Area)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Area>,
  ): Promise<Area[]> {
    return this.propertyRepository.areas(id).find(filter);
  }

  @post('/properties/{id}/areas', {
    responses: {
      '200': {
        description: 'Property model instance',
        content: {'application/json': {schema: getModelSchemaRef(Area)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Property.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Area, {
            title: 'NewAreaInProperty',
            exclude: ['id'],
            optional: ['propertyId']
          }),
        },
      },
    }) area: Omit<Area, 'id'>,
  ): Promise<Area> {
    return this.propertyRepository.areas(id).create(area);
  }

  @patch('/properties/{id}/areas', {
    responses: {
      '200': {
        description: 'Property.Area PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Area, {partial: true}),
        },
      },
    })
    area: Partial<Area>,
    @param.query.object('where', getWhereSchemaFor(Area)) where?: Where<Area>,
  ): Promise<Count> {
    return this.propertyRepository.areas(id).patch(area, where);
  }

  @del('/properties/{id}/areas', {
    responses: {
      '200': {
        description: 'Property.Area DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Area)) where?: Where<Area>,
  ): Promise<Count> {
    return this.propertyRepository.areas(id).delete(where);
  }
}
