import { Request, Response } from 'express';

import PipedriveService from '../services/PipedriveService';
import BlingService from '../services/BlingService';
import OrderService from '../services/OrderService';
import { IOrder, Order } from '../models/Order';

class PipedriveController {
  async index(
    _request: Request,
    response: Response,
  ): Promise<Response<IOrder[]>> {
    const orders = await Order.find();
    return response.json(orders);
  }

  async create(_request: Request, response: Response): Promise<Response> {
    const deals = await PipedriveService.getApi();

    if (!deals) {
      return response.status(204);
    }

    deals.forEach(async deal => {
      BlingService.castOrder(deal);
      OrderService.saveOrder(deal);
    });

    return response.status(201).json({ message: 'done' });
  }
}

export default PipedriveController;
