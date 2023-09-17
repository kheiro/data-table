export interface Column<T> {
    key: keyof T
    title: string
    render?: (value: T[keyof T]) => React.ReactNode
}
