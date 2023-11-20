import React from "react";

const Persons = ({ allPersons, persons, handleDelete }) => {
    return(
        <ul>
                { allPersons !== undefined ?
                    allPersons.map((person, i) =>
                    <li key={i}>{person.name} {person.number}   
                        <button 
                            onClick={ () => handleDelete(person.id, person.name) }>Delete</button>
                    </li>)
                    :
                    persons.map((person, i) => 
                    <li key={i}>{person.name} {person.number}
                        <button 
                            onClick={ () => handleDelete(person.id, person.name)}>Delete</button>
                    </li>)
                }
            </ul>
    )
}

export default Persons