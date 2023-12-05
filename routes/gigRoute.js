import express from "express";

import { deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/sample", deleteUser);

export default router;
