import React, { useState, useMemo, ReactNode } from 'react'

interface Column<T> {
    key: keyof T
    title: string
    render?: (value: T[keyof T]) => ReactNode
}

interface DataTableProps<T> {
    dataSource: T[]
    columns: Column<T>[]
    rowsPerPageOptions?: number[]
}

function DataTable<T>({
    dataSource = [],
    columns,
    rowsPerPageOptions = [15, 30, 50],
}: DataTableProps<T>) {
    const [sortedBy, setSortedBy] = useState<{
        column: keyof T
        asc: boolean
    }>({
        column: columns[0].key,
        asc: true,
    })

    const [query, setQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0])

    const sortedAndFilteredData = useMemo(() => {
        const filteredData = dataSource.filter((row) =>
            columns.some((column) =>
                String(row[column.key])
                    .toLowerCase()
                    .includes(query.toLowerCase())
            )
        )

        const sortedData = [...filteredData].sort((a, b) => {
            const columnA = String(a[sortedBy.column]).toLowerCase()
            const columnB = String(b[sortedBy.column]).toLowerCase()

            if (columnA < columnB) return sortedBy.asc ? -1 : 1
            if (columnA > columnB) return sortedBy.asc ? 1 : -1
            return 0
        })

        return sortedData
    }, [dataSource, columns, query, sortedBy])

    const totalPages = Math.ceil(sortedAndFilteredData.length / rowsPerPage)

    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage

    const currentData = sortedAndFilteredData.slice(startIndex, endIndex)

    const handleSort = (column: keyof T) => {
        setSortedBy((prev) => ({
            column,
            asc: prev.column === column ? !prev.asc : true,
        }))
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setCurrentPage(1)
    }

    return (
        <div className="data-table">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={String(column.key)}>
                                <div onClick={() => handleSort(column.key)}>
                                    <div>{column.title}</div>
                                    <div>
                                        {sortedBy.column === column.key && (
                                            <span>
                                                {sortedBy.asc ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row) => (
                        <tr key={String(row[columns[0].key])}>
                            {columns.map((column) =>
                                column.render ? (
                                    <td key={String(column.key)}>
                                        {column.render(row[column.key])}
                                    </td>
                                ) : (
                                    <td key={String(column.key)}>
                                        {row[column.key] as ReactNode}
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous Page
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next Page
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <label>
                    Rows per page:
                    <select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                    >
                        {rowsPerPageOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    )
}

export default DataTable
