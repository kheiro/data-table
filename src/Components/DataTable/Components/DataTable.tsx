import useDataTable from '../Hooks/useDataTable'
import FilterInput from './FilterInput'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import PaginationControls from './PaginationControls'
import { DataTableProps } from '../Types/Types'
import '../Styles/DataTable.scss'

function DataTable<T>({
    dataSource = [],
    columns,
    rowsPerPageOptions = [15, 30, 50],
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
        <div className="data-table">
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
