import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Section, SectionRelations} from '../models';

export class SectionRepository extends DefaultCrudRepository<
  Section,
  typeof Section.prototype.id,
  SectionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Section, dataSource);
  }
}
