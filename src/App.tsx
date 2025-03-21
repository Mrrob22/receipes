import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RecipePage from './pages/RecipePage';
import SelectedRecipesPage from './pages/SelectedRecipesPage';
import AllRecipesPage from "./pages/AllRecipesPage";

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div>
                    <h1>Рецепты</h1>
                    <Routes>
                        <Route path="/" element={<AllRecipesPage />} />
                        <Route path="/recipe/:id" element={<RecipePage />} />
                        <Route path="/selected" element={<SelectedRecipesPage />} />
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    );
};

export default App;
