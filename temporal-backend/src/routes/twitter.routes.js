import { Router } from 'express';
import { 
    getTweets,
    createTweet,
    updateTweet,
    deleteTweet,
} from '../controllers/twitter.controller.js';

const router = Router();

// Routes
router.post("/", createTweet);
router.put("/:id", updateTweet);
router.delete("/:id", deleteTweet);
router.get("/", getTweets);

export default router;