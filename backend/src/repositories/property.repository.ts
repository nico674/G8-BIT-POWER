import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Property, PropertyRelations, Management, User, Section, Area, Invoice} from '../models';
import {ManagementRepository} from './management.repository';
import {UserRepository} from './user.repository';
import {SectionRepository} from './section.repository';
import {AreaRepository} from './area.repository';
import {InvoiceRepository} from './invoice.repository';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.id,
  PropertyRelations
> {

  public readonly management: BelongsToAccessor<Management, typeof Property.prototype.id>;

  public readonly users: HasManyRepositoryFactory<User, typeof Property.prototype.id>;

  public readonly section: BelongsToAccessor<Section, typeof Property.prototype.id>;

  public readonly areas: HasManyRepositoryFactory<Area, typeof Property.prototype.id>;

  public readonly invoice: HasOneRepositoryFactory<Invoice, typeof Property.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ManagementRepository') protected managementRepositoryGetter: Getter<ManagementRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('SectionRepository') protected sectionRepositoryGetter: Getter<SectionRepository>, @repository.getter('AreaRepository') protected areaRepositoryGetter: Getter<AreaRepository>, @repository.getter('InvoiceRepository') protected invoiceRepositoryGetter: Getter<InvoiceRepository>,
  ) {
    super(Property, dataSource);
    this.invoice = this.createHasOneRepositoryFactoryFor('invoice', invoiceRepositoryGetter);
    this.registerInclusionResolver('invoice', this.invoice.inclusionResolver);
    this.areas = this.createHasManyRepositoryFactoryFor('areas', areaRepositoryGetter,);
    this.registerInclusionResolver('areas', this.areas.inclusionResolver);
    this.section = this.createBelongsToAccessorFor('section', sectionRepositoryGetter,);
    this.registerInclusionResolver('section', this.section.inclusionResolver);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
    this.management = this.createBelongsToAccessorFor('management', managementRepositoryGetter,);
    this.registerInclusionResolver('management', this.management.inclusionResolver);
  }
}
