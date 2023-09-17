import React from 'react'

interface PaginationControlsProps {
    currentPage: number
    totalPages: number
    handlePageChange: (newPage: number) => void
    rowsPerPage: number
    rowsPerPageOptions: number[]
    handleRowsPerPageChange: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void
}

function PaginationControls({
    currentPage,
    totalPages,
    handlePageChange,
    rowsPerPageOptions,
    rowsPerPage,
    handleRowsPerPageChange,
}: PaginationControlsProps) {
    return (
        <div className="pagination">
            <label>
                Rows per page:
                <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                    {rowsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &larr;
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &rarr;
                </button>
            </div>
        </div>
    )
}

export default PaginationControls
