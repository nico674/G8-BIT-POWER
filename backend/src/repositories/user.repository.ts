import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {User, UserRelations, Property, Management} from '../models';
import {PropertyRepository} from './property.repository';
import {ManagementRepository} from './management.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly property: BelongsToAccessor<Property, typeof User.prototype.id>;

  public readonly management: HasOneRepositoryFactory<Management, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>, @repository.getter('ManagementRepository') protected managementRepositoryGetter: Getter<ManagementRepository>,
  ) {
    super(User, dataSource);
    this.management = this.createHasOneRepositoryFactoryFor('management', managementRepositoryGetter);
    this.registerInclusionResolver('management', this.management.inclusionResolver);
    this.property = this.createBelongsToAccessorFor('property', propertyRepositoryGetter,);
    this.registerInclusionResolver('property', this.property.inclusionResolver);
  }
}
