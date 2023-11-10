import React from 'react';
import ReactDOM from 'react-dom/client';

const Header = ({course}) =>{
  return <h1>{course}</h1>
}

function Part ({part, exercises}) {
  return (
    <p>{part} {exercises}</p>
  )
}

const Content = ({course}) => {
  return(
    <>
      <Part part={course.parts[0].name} exercises={course.parts[0].exercises} />
      <Part part={course.parts[1].name} exercises={course.parts[1].exercises} />
      <Part part={course.parts[2].name} exercises={course.parts[2].exercises} />
    </>
  )
}

const Total = ({course}) =>{
  return <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} </p>
}
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
      name: "Fundamentals of React",
      exercises: 10
      },
      {
      name:"Using props to pass data",
      exercises: 7
      },
      {
      name: "State of a component",
      exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<App/>)