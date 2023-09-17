import { users } from './api/users'

import './App.scss'

interface User {
    id: string
    name: string
    phone: string
    email: string
}

interface Column<T> {
    key: keyof T
    title: string
    render?: (value: T[keyof T]) => React.ReactNode
}

const usersColumns: Column<User>[] = [
    {
        key: 'id',
        title: 'ID',
    },
    {
        key: 'name',
        title: 'Name',
    },
    {
        key: 'phone',
        title: 'Phone',
    },
    {
        key: 'email',
        title: 'Email',
        render: (value) => <a href={`mailto:${value}`}>{value}</a>,
    },
]

function App() {
    return (
        <div className="app">
            <div className="container">
                <DataTable<User> dataSource={users} columns={usersColumns} />
            </div>
        </div>
    )
}

export default App
