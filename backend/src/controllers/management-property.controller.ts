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
  Management,
  Property,
} from '../models';
import {ManagementRepository} from '../repositories';

export class ManagementPropertyController {
  constructor(
    @repository(ManagementRepository) protected managementRepository: ManagementRepository,
  ) { }

  @get('/managements/{id}/properties', {
    responses: {
      '200': {
        description: 'Array of Management has many Property',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Property)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Property>,
  ): Promise<Property[]> {
    return this.managementRepository.properties(id).find(filter);
  }

  @post('/managements/{id}/properties', {
    responses: {
      '200': {
        description: 'Management model instance',
        content: {'application/json': {schema: getModelSchemaRef(Property)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Management.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Property, {
            title: 'NewPropertyInManagement',
            exclude: ['id'],
            optional: ['managementId']
          }),
        },
      },
    }) property: Omit<Property, 'id'>,
  ): Promise<Property> {
    return this.managementRepository.properties(id).create(property);
  }

  @patch('/managements/{id}/properties', {
    responses: {
      '200': {
        description: 'Management.Property PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Property, {partial: true}),
        },
      },
    })
    property: Partial<Property>,
    @param.query.object('where', getWhereSchemaFor(Property)) where?: Where<Property>,
  ): Promise<Count> {
    return this.managementRepository.properties(id).patch(property, where);
  }

  @del('/managements/{id}/properties', {
    responses: {
      '200': {
        description: 'Management.Property DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Property)) where?: Where<Property>,
  ): Promise<Count> {
    return this.managementRepository.properties(id).delete(where);
  }
}
