import { Router } from 'express';
import PipedriveController from '@modules/products/controllers/PipedriveController';

const routes = Router();
const pipedriveController = new PipedriveController();

routes.get('/orders', pipedriveController.index);
routes.post('/create', pipedriveController.create);

export default routes;
