import React from "react";

const Filter = ({ filterName, handleFilterChange }) => {
    return (
        <>
            <p>filter shown a</p>
            <input type="text" value={filterName} onChange={handleFilterChange} />
        </>
    )
}

export default Filter