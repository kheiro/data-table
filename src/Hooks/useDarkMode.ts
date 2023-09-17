import { useState } from 'react'

function useDarkMode() {
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode)
    }

    return { darkMode, toggleDarkMode }
}

export default useDarkMode
