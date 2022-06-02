const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return <Course courses={courses} />;
};

const Course = ({ courses }) => {
  console.log("ok", courses);
  return (
    <>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />

          <Content coursekey={course.id} parts={course.parts} />

          <Total coursekey={course.id} parts={course.parts} />
        </div>
      ))}
    </>
  );
};

const Header = (props) => {
  console.log("props in header", props);
  return (
    <>
      <h2>{props.course.name}</h2>
    </>
  );
};

const Content = ({ parts, coursekey }) => {
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

const Total = ({ parts, coursekey }) => {
  const sum = parts.reduce((partialSum, current) => {
    return partialSum + current.exercises;
  }, 0);
  return (
    <>
      <p>
        <b>total of {sum} exercises</b>
      </p>
    </>
  );
};

export default App;
