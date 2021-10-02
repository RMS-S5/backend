import { Router } from "express";
import auth from "../../utils/auth";
const rQuestion = Router();
import askQuestionHandler from "./add/askQuestion";
/**
 * Getters
 */

/**
 * Post
 */
rQuestion.post("/ask-question", askQuestionHandler);

export default rQuestion;
