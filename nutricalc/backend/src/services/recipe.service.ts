import { prisma } from "../lib/prisma";

export class RecipeService {
    // 🥗 Criar receita
    static async create(name: string) {
        return prisma.recipe.create({
            data: { name },
        });
    }

    // 🧂 Adicionar ingrediente à receita
    static async addIngredient(
        recipeId: string,
        ingredientId: string,
        grams: number
    ) {
        return prisma.recipeIngredient.create({
            data: {
                recipeId,
                ingredientId,
                grams,
            },
        });
    }

    // 📄 Buscar receita completa
    static async findById(id: string) {
        return prisma.recipe.findUnique({
            where: { id },
            include: {
                ingredients: {
                    include: {
                        ingredient: {
                            include: {
                                nutrients: {
                                    include: {
                                        nutrient: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    // 🔥 Cálculo nutricional da receita
    static async getNutrition(recipeId: string) {
        const recipe = await prisma.recipe.findUnique({
            where: { id: recipeId },
            include: {
                ingredients: {
                    include: {
                        ingredient: {
                            include: {
                                nutrients: {
                                    include: {
                                        nutrient: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!recipe) {
            throw new Error("Recipe not found");
        }

        const result: Record<string, number> = {};

        for (const item of recipe.ingredients) {
            const factor = item.grams / 100;

            for (const n of item.ingredient.nutrients) {
                const name = n.nutrient.name;

                if (!result[name]) {
                    result[name] = 0;
                }

                result[name] += n.amount * factor;
            }
        }

        return {
            recipe: recipe.name,
            nutrition: result,
        };
    }
}