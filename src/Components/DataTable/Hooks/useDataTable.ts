import { useState, useMemo } from 'react'

import { Column } from '../Types/Types'

interface DataTableHook<T> {
    sortedBy: {
        column: keyof T
        asc: boolean
    }
    query: string
    currentPage: number
    rowsPerPage: number
    totalPages: number
    currentData: T[]
    setQuery: React.Dispatch<React.SetStateAction<string>>
    handleSort: (column: keyof T) => void
    handlePageChange: (newPage: number) => void
    handleRowsPerPageChange: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void
}

function useDataTable<T>({
    dataSource,
    columns,
    rowsPerPageOptions = [15, 30, 50],
}: {
    dataSource: T[]
    columns: Column<T>[]
    rowsPerPageOptions?: number[]
}): DataTableHook<T> {
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

    return {
        sortedBy,
        query,
        currentPage,
        rowsPerPage,
        totalPages,
        currentData,
        setQuery,
        handleSort,
        handlePageChange,
        handleRowsPerPageChange,
    }
}

export default useDataTable
