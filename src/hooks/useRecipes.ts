import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRecipes, fetchRecipe } from '../api/recipeApi';

interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    [key: string]: string | null; // Для динамических свойств
}

export const useRecipes = () => {
    return useQuery<Recipe[]>({
        queryKey: ['recipes'],
        queryFn: fetchRecipes,
    });
};

export const useRecipe = (id?: string) => {
    return useQuery<Recipe>({
        queryKey: ['recipe', id],
        queryFn: () => fetchRecipe(id!),
        enabled: !!id,
    });
};

export const useSelectedRecipes = () => {
    const [selectedIds, setSelectedIds] = useState<string[]>(() => {
        const rawData = window.localStorage.getItem("selectedRecipesIds");
        return rawData ? JSON.parse(rawData) : [];
    });

    const queryClient = useQueryClient();
    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

    const addRecipe = async (id: string) => {
        if (!selectedIds.includes(id)) {
            const updatedSelectedIds = [...selectedIds, id];
            setSelectedIds(updatedSelectedIds);
            window.localStorage.setItem("selectedRecipesIds", JSON.stringify(updatedSelectedIds)); // Сохраняем в localStorage
        }
    };

    const removeRecipe = (id: string) => {
        const updatedSelectedIds = selectedIds.filter((recipeId) => recipeId !== id);
        setSelectedIds(updatedSelectedIds);
        window.localStorage.setItem("selectedRecipesIds", JSON.stringify(updatedSelectedIds)); // Сохраняем в localStorage
    };

    // Загружаем рецепты, если их нет в кэше
    useEffect(() => {
        const loadSelectedRecipes = async () => {
            const recipes = await Promise.all(
                selectedIds.map(async (id) => {
                    let cachedRecipe = queryClient.getQueryData<Recipe>(['recipe', id]);

                    if (!cachedRecipe) {
                        cachedRecipe = await fetchRecipe(id);
                        if (cachedRecipe) {
                            queryClient.setQueryData(['recipe', id], cachedRecipe); // Сохраняем в кэш
                        }
                    }
                    return cachedRecipe;
                })
            );

            setSelectedRecipes(recipes.filter((recipe): recipe is Recipe => recipe !== undefined));
        };

        loadSelectedRecipes();
    }, [selectedIds, queryClient]); // Перезапускать при изменении selectedIds или queryClient

    const combinedIngredients = selectedRecipes.reduce((acc, recipe) => {
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
            const measure = recipe[`strMeasure${i}` as keyof Recipe];
            if (ingredient) {
                const key = `${ingredient} (${String(measure).trim() || ''})`;
                acc[key] = (acc[key] || 0) + 1;
            }
        }
        return acc;
    }, {} as Record<string, number>);

    return { selectedRecipes, combinedIngredients, addRecipe, removeRecipe };
};
