import React from 'react'

interface FilterInputProps {
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

function FilterInput({ query, setQuery }: FilterInputProps) {
    return (
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
        />
    )
}

export default FilterInput
