const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchRecipes = async (): Promise<any[]> => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const allRecipes: any[] = [];

    for (const letter of alphabet) {
        const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
        const data = await response.json();
        if (data.meals) {
            allRecipes.push(...data.meals);
        }
    }

    return allRecipes;
};

export const fetchRecipe = async (id: string) => {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
};
