import { Request, Response } from "express";
import { RecipeService } from "../services/recipe.service";

export class RecipeController {
    static async create(req: Request, res: Response) {
        try {
            const { name } = req.body;

            const recipe = await RecipeService.create(name);
            return res.json(recipe);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar receita" });
        }
    }

    static async addIngredient(req: Request, res: Response) {
        try {
            const id = String(req.params.id);
            const { ingredientId, grams } = req.body;

            const result = await RecipeService.addIngredient(
                id,
                String(ingredientId),
                Number(grams)
            );

            return res.json(result);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao adicionar ingrediente" });
        }
    }

    static async findById(req: Request, res: Response) {
        try {
            const id = String(req.params.id);

            const recipe = await RecipeService.findById(id);
            return res.json(recipe);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar receita" });
        }
    }

    static async getNutrition(req: Request, res: Response) {
        try {
            const id = String(req.params.id);

            const result = await RecipeService.getNutrition(id);
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao calcular nutrição" });
        }
    }
}