const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

const Course = (props) => {
  console.log("props in course:", props);
  const { course } = props;
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = (props) => {
  console.log("props in header", props);
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};

const Content = ({ parts }) => {
  console.log("props in Content", parts);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  );
};

const Total = ({ parts }) => {
  const sum = parts.reduce((partialSum, current) => {
    return partialSum + current.exercises;
  }, 0);
  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  );
};

export default App;
