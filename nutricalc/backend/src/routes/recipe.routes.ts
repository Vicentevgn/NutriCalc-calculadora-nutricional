import { Router } from "express";
import { RecipeController } from "../controllers/recipe.controller";

const router = Router();

router.post("/", RecipeController.create);

router.post("/:id/ingredients", RecipeController.addIngredient);

router.get("/user/:userId", RecipeController.listByUser);

router.get("/:id/nutrition", RecipeController.getNutrition);

router.get("/:id", RecipeController.findById);

export default router;