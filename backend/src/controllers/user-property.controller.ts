import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Property,
} from '../models';
import {UserRepository} from '../repositories';

export class UserPropertyController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/property', {
    responses: {
      '200': {
        description: 'Property belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Property)},
          },
        },
      },
    },
  })
  async getProperty(
    @param.path.string('id') id: typeof User.prototype.id,
  ): Promise<Property> {
    return this.userRepository.property(id);
  }
}
