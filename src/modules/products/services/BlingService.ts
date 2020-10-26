import axios from 'axios';
import { toXML } from 'jstoxml';

import { IBlingRequest, IBlingReturn, IDeal } from '../interfaces';

class BlingService {
  private blingApi = axios.create({
    baseURL: process.env.BLING_API_URL,
  });

  public castOrder(deal: IDeal): void {
    this.createRequest({
      clientName: deal.person_name,
      code: deal.id,
      description: deal.title,
      value: deal.value,
    });
  }

  public async createRequest(request: IBlingRequest): Promise<void> {
    const xml = this.replaceToXML(request);

    await this.blingApi.post<IBlingReturn>('/', null, {
      params: {
        apikey: process.env.BLING_API_KEY,
        xml,
      },
    });
  }

  replaceToXML(request: IBlingRequest): any {
    return toXML({
      pedido: {
        cliente: {
          nome: request.clientName,
        },
        itens: {
          item: {
            codigo: request.code,
            descricao: request.description,
            vlr_unit: request.value,
            qtde: '5',
          },
        },
      },
    });
  }
}

export default new BlingService();
