import React from "react"

const Header = ({ name }) => {
    return <h1>{name}</h1>
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(
                (part, index) =>
                    <Part
                        key={index}
                        part={part.name}
                        exercises={part.exercises} />
            )
            }
        </>
    )
}

const Part = ({ part, exercises }) => {
    return (
        <p>{part} {exercises}</p>
    )
}

const Total = ({ parts }) => {
    return <p><strong>Number of exercises {parts.reduce((acc, cur) => acc + cur.exercises, 0)}</strong></p>
}

const Item = ({ name, parts }) => {
    return (
        <>
            <Header name={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </>
    )
}

const Course = ({ courses }) => {
    return (
        <>
            {courses.map((el) => <Item key={el.id} name={el.name} parts={el.parts} />
            )}
        </>
    )
}

export default Course