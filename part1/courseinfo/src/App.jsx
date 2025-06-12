const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;

export const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

export const Header = (props) => {
  return <h1>{props.course}</h1>;
};

export const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part key={index} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts.reduce((sum, part) => sum + part.exercises, 0)}
    </p>
  );
};
