import { Router } from "express";
import { RecipeController } from "../controllers/recipe.controller";

const router = Router();

router.post("/", RecipeController.create);
router.post("/:id/ingredients", RecipeController.addIngredient);
router.get("/:id", RecipeController.findById);
router.get("/:id/nutrition", RecipeController.getNutrition);

export default router;