import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Invoice,
  Management,
} from '../models';
import {InvoiceRepository} from '../repositories';

export class InvoiceManagementController {
  constructor(
    @repository(InvoiceRepository)
    public invoiceRepository: InvoiceRepository,
  ) { }

  @get('/invoices/{id}/management', {
    responses: {
      '200': {
        description: 'Management belonging to Invoice',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Management)},
          },
        },
      },
    },
  })
  async getManagement(
    @param.path.string('id') id: typeof Invoice.prototype.id,
  ): Promise<Management> {
    return this.invoiceRepository.management(id);
  }
}
