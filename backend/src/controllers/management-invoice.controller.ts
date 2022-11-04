import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Management,
  Invoice,
} from '../models';
import {ManagementRepository} from '../repositories';

export class ManagementInvoiceController {
  constructor(
    @repository(ManagementRepository) protected managementRepository: ManagementRepository,
  ) { }

  @get('/managements/{id}/invoices', {
    responses: {
      '200': {
        description: 'Array of Management has many Invoice',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Invoice)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Invoice>,
  ): Promise<Invoice[]> {
    return this.managementRepository.invoices(id).find(filter);
  }

  @post('/managements/{id}/invoices', {
    responses: {
      '200': {
        description: 'Management model instance',
        content: {'application/json': {schema: getModelSchemaRef(Invoice)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Management.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {
            title: 'NewInvoiceInManagement',
            exclude: ['id'],
            optional: ['managementId']
          }),
        },
      },
    }) invoice: Omit<Invoice, 'id'>,
  ): Promise<Invoice> {
    return this.managementRepository.invoices(id).create(invoice);
  }

  @patch('/managements/{id}/invoices', {
    responses: {
      '200': {
        description: 'Management.Invoice PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {partial: true}),
        },
      },
    })
    invoice: Partial<Invoice>,
    @param.query.object('where', getWhereSchemaFor(Invoice)) where?: Where<Invoice>,
  ): Promise<Count> {
    return this.managementRepository.invoices(id).patch(invoice, where);
  }

  @del('/managements/{id}/invoices', {
    responses: {
      '200': {
        description: 'Management.Invoice DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Invoice)) where?: Where<Invoice>,
  ): Promise<Count> {
    return this.managementRepository.invoices(id).delete(where);
  }
}
