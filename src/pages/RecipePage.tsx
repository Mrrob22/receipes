import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { useRecipe, useSelectedRecipes } from '../hooks/useRecipes';

const RecipePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: recipe, isLoading } = useRecipe(id!);
    const { addRecipe, removeRecipe } = useSelectedRecipes();

    if (isLoading) return <div>Загрузка...</div>;
    if (!recipe) return <div>Рецепт не найден</div>;

    return (
        <div>
            <div className="selected-recipes-button">
                <Link to="/">
                    <button>Перейти ко всем рецептам</button>
                </Link>
            </div>
            <h1>{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal}/>
            <p>{recipe.strInstructions}</p>

            <h3>Ингредиенты:</h3>
            <ul>
                {Array.from({length: 20}).map((_, i) => {
                    const ingredient = recipe[`strIngredient${i + 1}`];
                    return ingredient ? <li key={i}>{ingredient}</li> : null;
                })}
            </ul>

            <button onClick={() => addRecipe(recipe.idMeal)}>Добавить в список</button>
            <button onClick={() => removeRecipe(recipe.idMeal)}>Убрать из списка</button>
        </div>
    );
};

export default RecipePage;
