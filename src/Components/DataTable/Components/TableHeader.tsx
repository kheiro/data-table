import { Column } from '../Types/Types'

interface TableHeaderProps<T> {
    columns: Column<T>[]
    sortedBy: {
        column: keyof T
        asc: boolean
    }
    handleSort: (column: keyof T) => void
}

function TableHeader<T>({
    columns,
    sortedBy,
    handleSort,
}: TableHeaderProps<T>) {
    return (
        <thead>
            <tr>
                {columns.map((column) => (
                    <th key={String(column.key)}>
                        <div onClick={() => handleSort(column.key)}>
                            <div>{column.title}</div>
                            <div>
                                {sortedBy.column === column.key && (
                                    <span>{sortedBy.asc ? '↑' : '↓'}</span>
                                )}
                            </div>
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeader
