import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center mt-8">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`mx-1 px-3 py-1 rounded-[5px] ${currentPage === page ? 'bg-primary text-background' : 'bg-background'}`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default Pagination;
