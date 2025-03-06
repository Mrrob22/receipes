import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import {Link} from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const AllRecipesPage: React.FC = () => {
    const { data: recipes, isLoading } = useRecipes();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);

    useEffect(() => {
        const debouncedSearch = debounce(() => {
            if (searchTerm) {
                setFilteredRecipes(recipes?.filter((r) => r.strMeal.toLowerCase().includes(searchTerm.toLowerCase())) || []);
            } else {
                setFilteredRecipes(recipes || []);
            }
        }, 300);

        debouncedSearch();
        return () => debouncedSearch.cancel();
    }, [searchTerm, recipes]);

    if (isLoading) return <div>Загрузка...</div>;
    if (!recipes) return <div>Рецепты не найдены</div>;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);

    return (
        <div>
            <h1>Все рецепты</h1>
            <div className="selected-recipes-button">
                <Link to="/selected">
                    <button>Перейти к выбранным рецептам</button>
                </Link>
            </div>

            <input type="text" placeholder="Поиск..." onChange={(e) => setSearchTerm(e.target.value)}/>

            <div className="recipes-list">
                {paginatedRecipes.map((recipe) => (
                    <RecipeCard key={recipe.idMeal} {...recipe} />
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
        </div>
    );
};

export default AllRecipesPage;
