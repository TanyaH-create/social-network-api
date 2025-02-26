import { Router } from 'express';
const router = Router();

import { getThoughts, getSingleThought, createThought, updateThought, deleteThought } from '../../controllers/thoughtController.js';

// /api/applications
router.route('/').get(getThoughts).post(createThought);

// /api/applications/:applicationId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/applications/:applicationId/tags
//router.route('/:applicationId/tags').post(addTag);

// /api/applications/:applicationId/tags/:tagId
//router.route('/:applicationId/tags/:tagId').delete(removeTag);

export default router;
