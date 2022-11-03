import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Management, ManagementRelations} from '../models';

export class ManagementRepository extends DefaultCrudRepository<
  Management,
  typeof Management.prototype.id,
  ManagementRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Management, dataSource);
  }
}
