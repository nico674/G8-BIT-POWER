import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Property,
  Management,
} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertyManagementController {
  constructor(
    @repository(PropertyRepository)
    public propertyRepository: PropertyRepository,
  ) { }

  @get('/properties/{id}/management', {
    responses: {
      '200': {
        description: 'Management belonging to Property',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Management)},
          },
        },
      },
    },
  })
  async getManagement(
    @param.path.string('id') id: typeof Property.prototype.id,
  ): Promise<Management> {
    return this.propertyRepository.management(id);
  }
}
