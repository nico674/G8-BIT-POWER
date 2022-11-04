import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Section, SectionRelations, Property} from '../models';
import {PropertyRepository} from './property.repository';

export class SectionRepository extends DefaultCrudRepository<
  Section,
  typeof Section.prototype.id,
  SectionRelations
> {

  public readonly properties: HasManyRepositoryFactory<Property, typeof Section.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>,
  ) {
    super(Section, dataSource);
    this.properties = this.createHasManyRepositoryFactoryFor('properties', propertyRepositoryGetter,);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
  }
}
