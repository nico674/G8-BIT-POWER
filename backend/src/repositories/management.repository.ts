import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Management, ManagementRelations, Property, Invoice, User} from '../models';
import {PropertyRepository} from './property.repository';
import {InvoiceRepository} from './invoice.repository';
import {UserRepository} from './user.repository';

export class ManagementRepository extends DefaultCrudRepository<
  Management,
  typeof Management.prototype.id,
  ManagementRelations
> {

  public readonly properties: HasManyRepositoryFactory<Property, typeof Management.prototype.id>;

  public readonly invoices: HasManyRepositoryFactory<Invoice, typeof Management.prototype.id>;

  public readonly admin: HasOneRepositoryFactory<User, typeof Management.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>, @repository.getter('InvoiceRepository') protected invoiceRepositoryGetter: Getter<InvoiceRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Management, dataSource);
    this.admin = this.createHasOneRepositoryFactoryFor('admin', userRepositoryGetter);
    this.registerInclusionResolver('admin', this.admin.inclusionResolver);
    this.invoices = this.createHasManyRepositoryFactoryFor('invoices', invoiceRepositoryGetter,);
    this.registerInclusionResolver('invoices', this.invoices.inclusionResolver);
    this.properties = this.createHasManyRepositoryFactoryFor('properties', propertyRepositoryGetter,);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
  }
}
