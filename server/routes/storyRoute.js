import express from 'express'
import { upload } from '../configs/multer.js'
import { protect } from '../middlewares/auth.js'
import { addUserStory, getStory } from '../controllers/storyController.js';

const storyRouter = express.Router()

storyRouter.post('/create', upload.single('media'), protect, addUserStory);
storyRouter.get('/get',  protect, getStory);


export default storyRouter
