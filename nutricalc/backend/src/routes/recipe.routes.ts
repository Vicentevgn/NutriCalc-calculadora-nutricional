import { Router } from "express";
import { RecipeController } from "../controllers/recipe.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, RecipeController.create);

router.post("/:id/ingredients", authMiddleware, RecipeController.addIngredient);

router.get("/", authMiddleware, RecipeController.list)

router.get("/:id/nutrition", authMiddleware, RecipeController.getNutrition);

router.get("/:id", authMiddleware, RecipeController.findById);

export default router;