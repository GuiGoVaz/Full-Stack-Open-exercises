const Header = (props) => <h2>{props.course}</h2>

const Content = ({ parts }) => (
    <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
)

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
)


const Total = (props) => <p><strong>total of {props.total} exercises </strong></p>

const Course = ({ course }) => {
    const total = course.parts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises;
    }, 0);

    return (
        < div >
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </ div >
    )
}

export default Course