import express from 'express';
import dutyController from '../../controllers/dutyController.js';

const router = express.Router()

router
  .get('/', dutyController.getAllDuties)
  .post('/', dutyController.createDuty)
  .put('/:dutyId', dutyController.updateDuty)
// .delete('/:userId')

export default router;
