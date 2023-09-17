import { useState, ReactNode } from 'react'

interface Column<T> {
    key: keyof T
    title: string
    render?: (value: T[keyof T]) => ReactNode
}

interface DataTableProps<T> {
    dataSource: T[]
    columns: Column<T>[]
}

function DataTable<T>({ dataSource = [], columns }: DataTableProps<T>) {
    const [sortedBy, setSortedBy] = useState<{
        column: keyof T
        asc: boolean
    }>({
        column: columns[0].key,
        asc: true,
    })

    const [query, setQuery] = useState('')

    const sortedAndFilteredData = () => {
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
    }

    const currentData = sortedAndFilteredData()

    const handleSort = (column: keyof T) => {
        setSortedBy((prev) => ({
            column,
            asc: prev.column === column ? !prev.asc : true,
        }))
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
        </div>
    )
}

export default DataTable
