import React, {useState, useEffect} from "react"
import './index.css'
import Filter from './Components/Filter'
import Form from './Components/Form'
import Persons from './Components/Persons'
import Notification from "./Components/Notification.js"
import bookService from './Services/services.js'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ allPersons, setAllPersons ] = useState()
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filterName, setFilterName ] = useState('')
    const [ messege, setMessege ] = useState( null )
    const [ error, setError ] =useState( false )

    useEffect( ( ) => {
        bookService
            .getAll()
            .then( all => setPersons(all))
    }, [] )

    const handleFormSub = (event) => {
        event.preventDefault()
        const exist = persons.some( el => el.name === newName )

        if ( exist && window.confirm( `${newName} if already added to phonebook, replace the old number with a new one` )) {
            
            const person = persons.find( p => 
                p.name === newName)
            
            const newObj = {
                ...person,
                number: newNumber
            }
            
            bookService
                .numUpdate( person.id, newObj)
                .then( response => {
                    setPersons( persons.map( p =>
                        p.id !== response.id? p : newObj 
                        ))
                    })
                    .catch( error =>{
                        setError(true)
                        setMessege( `Information of ${newName} has already been removed from server` )
                        setTimeout( () => {
                            setMessege(null)
                            setError(false)
                        }, 6000)
                        setNewName('')
                        setNewNumber('')
                        return
                    })
            setMessege( `The number of ${newName} has been changed` )
            setTimeout( () => {
                setMessege(null)
            }, 6000)
            setNewName('')
            setNewNumber('')
            return   
        }
        const newObj = { 
            name: newName,
            number: newNumber
        }
        bookService
            .create(newObj)
            .then( newPerson => setPersons(persons.concat(newPerson)))
        setMessege( `Added ${newName}` )
        setTimeout( () => {
            setMessege(null)
        }, 6000)
        setNewNumber('')
        setNewName('')
        setAllPersons()
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleDelete = ( id, name ) => {
        if (window.confirm( `Delete ${name}` )){
                bookService
                .elimine( id )
                .then( response => response )
            setPersons( persons.filter( p => p.id !== id ) )
        }
        
    }

    const handleFilterChange = (event) => {
        const value = event.target.value
        setFilterName(value)
        const filtrate = []
        for (let per of persons) {
            const name = per.name.toLocaleLowerCase()
            if (name.includes(value)) {
                filtrate.push(per)
            }
        }
        setAllPersons(filtrate)
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification messege={messege} error={error} />
            <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
            <h2>Add a new</h2>
            <Form
                newName={newName}
                newNumber={newNumber}
                handleFormSub={handleFormSub}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons 
                allPersons={allPersons}
                persons={persons}
                handleDelete={handleDelete}
                />
        </div>
    )
}

export default App