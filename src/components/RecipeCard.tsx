import React from 'react';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ idMeal, strMeal, strCategory, strArea, strMealThumb }) => {
    return (
        <div className="recipe-card">
            <img src={strMealThumb} alt={strMeal} />
            <h3>{strMeal}</h3>
            <p>Категория: {strCategory}</p>
            <p>Регион: {strArea}</p>
            <Link to={`/recipe/${idMeal}`}>Подробнее</Link>
        </div>
    );
};

export default RecipeCard;
