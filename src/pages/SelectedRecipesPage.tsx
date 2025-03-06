import React from 'react';
import { useSelectedRecipes } from '../hooks/useRecipes';
import {Link} from "react-router-dom";

const SelectedRecipesPage: React.FC = () => {
    const { selectedRecipes, combinedIngredients, removeRecipe } = useSelectedRecipes();

    return (
        <div>
            <h1>Выбранные рецепты</h1>
            <div className="selected-recipes-button">
                <Link to="/">
                    <button>Перейти ко всем рецептам</button>
                </Link>
            </div>

            {selectedRecipes.length === 0 ? (
                <p>Вы не выбрали ни одного рецепта.</p>
            ) : (
                <>
                    <div className="selected-recipes">
                        {selectedRecipes.map((recipe) => (
                            <div key={recipe.idMeal} className="recipe-card">
                                <img src={recipe.strMealThumb} alt={recipe.strMeal}/>
                                <h3>{recipe.strMeal}</h3>
                                <button onClick={() => removeRecipe(recipe.idMeal)}>Удалить</button>
                            </div>
                        ))}
                    </div>

                    <h2>Общие ингредиенты:</h2>
                    <ul>
                        {Object.entries(combinedIngredients).map(([ingredient, count]) => (
                            <li key={ingredient}>
                                {ingredient} - {Number(count)}x
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default SelectedRecipesPage;
