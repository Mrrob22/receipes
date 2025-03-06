import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipesPage from './pages/RecipePage';
import RecipePage from './pages/RecipePage';
import SelectedRecipesPage from './pages/SelectedRecipesPage';

const App: React.FC = () => {
    return (
        <Router basename="/receipes">
            <div>
                <h1>Рецепты</h1>
                <Routes>
                    <Route path="/" element={<RecipesPage />} />
                    <Route path="/recipe/:id" element={<RecipePage />} />
                    <Route path="/selected" element={<SelectedRecipesPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
