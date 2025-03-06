import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1);

    return (
        <div className="pagination">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>←</button>

            {pageNumbers.map((page) => (
                <button key={page} onClick={() => onPageChange(page)} disabled={page === currentPage}>
                    {page}
                </button>
            ))}

            {totalPages > 7 && <span>...</span>}
            <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
                {totalPages}
            </button>

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>→</button>
        </div>
    );
};

export default Pagination;
