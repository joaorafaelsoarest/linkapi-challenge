import axios from 'axios';

import { IPipedriveApiReturn, IDeal } from '../interfaces';

class PipedriveService {
  private pipedriveApi = axios.create({
    baseURL: process.env.PIPEDRIVE_API_URL,
  });

  async getApi(): Promise<IDeal[]> {
    const { data } = await this.pipedriveApi.get<IPipedriveApiReturn>('deals', {
      params: {
        status: 'won',
        api_token: process.env.PIPEDRIVE_API_KEY,
      },
    });

    return data.data.map(deal => ({
      id: deal.id,
      title: deal.title,
      person_name: deal.person_name,
      value: deal.value,
      currency: deal.currency,
      update_time: deal.update_time,
      status: deal.status,
    })) as IDeal[];
  }
}

export default new PipedriveService();
