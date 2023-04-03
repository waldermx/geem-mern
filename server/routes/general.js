import {Router} from "express";
import {getUser} from "../controllers/general.js";

const router = Router();

router.get("/user/:id", getUser);

export default router;