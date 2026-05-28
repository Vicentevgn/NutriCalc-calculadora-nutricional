import { Request, Response } from "express";
import { RecipeService } from "../services/recipe.service";

interface AuthRequest extends Request {
    userId: string;
}

export class RecipeController {
    static async create(req: Request, res: Response) {
        try {
            const { name, userId, totalWeight } = req.body;

            const recipe = await RecipeService.create(
                String(name),
                String(userId),
                Number(totalWeight)
            );

            return res.status(201).json(recipe);
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: "Erro ao criar receita",
            });
        }
    }

    static async addIngredient(req: Request, res: Response) {
        try {
            const recipeId = String(req.params.id);

            const { ingredientId, quantity } = req.body;

            const result = await RecipeService.addIngredient(
                recipeId,
                String(ingredientId),
                Number(quantity)
            );

            return res.status(201).json(result);
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: "Erro ao adicionar ingrediente",
            });
        }
    }

    static async findById(req: Request, res: Response) {
        try {
            const id = String(req.params.id);

            const recipe = await RecipeService.findById(id);

            if (!recipe) {
                return res.status(404).json({
                    error: "Receita não encontrada",
                });
            }

            return res.json(recipe);
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: "Erro ao buscar receita",
            });
        }
    }

    static async getNutrition(req: Request, res: Response) {
        try {
            const id = String(req.params.id);

            const result = await RecipeService.getNutrition(id);

            return res.json(result);
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: "Erro ao calcular nutrição",
            });
        }
    }

    static async list(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId;

            const recipes = await RecipeService.listByUser(userId);

            return res.json(recipes);
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao listar receitas",
            });
        }
    }
}