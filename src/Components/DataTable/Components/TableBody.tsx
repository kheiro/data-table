import { ReactNode } from 'react'
import { Column } from '../Types/Types'

interface TableBodyProps<T> {
    data: T[]
    columns: Column<T>[]
}

function TableBody<T>({ data, columns }: TableBodyProps<T>) {
    return (
        <tbody>
            {data.map((row) => (
                <tr key={String(row[columns[0].key])}>
                    {columns.map((column) => (
                        <td key={String(column.key)}>
                            {column.render
                                ? column.render(row[column.key])
                                : (row[column.key] as ReactNode)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

export default TableBody
