import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Invoice, InvoiceRelations, Management, Payment} from '../models';
import {ManagementRepository} from './management.repository';
import {PaymentRepository} from './payment.repository';

export class InvoiceRepository extends DefaultCrudRepository<
  Invoice,
  typeof Invoice.prototype.id,
  InvoiceRelations
> {

  public readonly management: BelongsToAccessor<Management, typeof Invoice.prototype.id>;

  public readonly payments: HasManyRepositoryFactory<Payment, typeof Invoice.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ManagementRepository') protected managementRepositoryGetter: Getter<ManagementRepository>, @repository.getter('PaymentRepository') protected paymentRepositoryGetter: Getter<PaymentRepository>,
  ) {
    super(Invoice, dataSource);
    this.payments = this.createHasManyRepositoryFactoryFor('payments', paymentRepositoryGetter,);
    this.registerInclusionResolver('payments', this.payments.inclusionResolver);
    this.management = this.createBelongsToAccessorFor('management', managementRepositoryGetter,);
    this.registerInclusionResolver('management', this.management.inclusionResolver);
  }
}
