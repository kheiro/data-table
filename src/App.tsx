import { users } from './api/users'

import DataTable from './Components/DataTable'
import useDarkMode from './Hooks/useDarkMode'
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
    const { darkMode, toggleDarkMode } = useDarkMode()

    return (
        <div className="app">
            <div className="container">
                <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
                <DataTable<User>
                    dataSource={users}
                    columns={usersColumns}
                    darkMode={darkMode}
                />
            </div>
        </div>
    )
}

export default App
