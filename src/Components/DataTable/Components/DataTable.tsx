import useDataTable from '../Hooks/useDataTable'
import FilterInput from './FilterInput'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import PaginationControls from './PaginationControls'

import { Column } from '../Types/Types'
import '../Styles/DataTable.scss'

export interface DataTableProps<T> {
    dataSource: T[]
    columns: Column<T>[]
    rowsPerPageOptions?: number[]
    darkMode: Boolean
}

function DataTable<T>({
    dataSource = [],
    columns,
    rowsPerPageOptions = [15, 30, 50],
    darkMode = false,
}: DataTableProps<T>) {
    const {
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
    } = useDataTable<T>({
        dataSource,
        columns,
        rowsPerPageOptions,
    })

    return (
        <div className={`data-table ${darkMode && 'dark-mode'}`}>
            <FilterInput query={query} setQuery={setQuery} />
            <table>
                <TableHeader
                    columns={columns}
                    sortedBy={sortedBy}
                    handleSort={handleSort}
                />
                <TableBody data={currentData} columns={columns} />
            </table>
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                handleRowsPerPageChange={handleRowsPerPageChange}
            />
        </div>
    )
}

export default DataTable
