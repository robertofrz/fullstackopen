function Course({ course }) {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}
export default Course;

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
