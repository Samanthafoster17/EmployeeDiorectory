import React from "react";
import API from "../../utils/API";
import compare from "../../utils/compare";
import SearchBar from "../SearchBar";
import "./style.css";








export default class Table extends React.Component {
    state = {
        employees: [],
        term: "",
        original: [],
        direction: 1
    };

    onChange = async (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
        console.log(value)
        const newEmployees = this.state.original.filter(employee => {
            return (employee.name.first.toLowerCase().includes(value.toLowerCase())
                || employee.name.last.toLowerCase().includes(value.toLowerCase())
            )
        })
        console.log(newEmployees)

        this.setState({
            employees: newEmployees
        });
    };


    onSortClick = async () => {
        console.log("CLICK")




        this.setState({ original: this.state.original.sort(compare(this.state.direction)) });
        this.setState({ employees: this.state.employees.sort(compare(this.state.direction)) });
        this.setState({ direction: (this.state.direction *= -1) });

        console.log(this.state.direction)
    };




    componentDidMount() {


        API.search().then((response) => {
            (
                this.setState({ employees: response.data.results, original: response.data.results })

            )
        })


    };


    render() {

        return (

            <div className="container">
                <SearchBar onChange={this.onChange} />


                <table className="employeeTable">
                    <thead className="thead-dark">
                        <tr className="col">
                            <th scope="col">Profile Picture</th>
                            <th scope="col"> Name
                            <button className="sort" onClick={this.onSortClick}>
                                    Sort by name  {
                                     this.state.direction === 1 ? ("⬆") : (this.state.direction === -1 ? "⬇" : "")
                                    }</button>
                                    </th>
                            <th scope="col">Phone</th>
                            <th scope="col">E-mail</th>


                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map(response => {
                            // console.log(response)
                            return (
                                <tr key={response.login.uuid}>
                                    <td><img alt="Employee Profile" src={response.picture.medium}></img></td>
                                    <td>{response.name.first} {response.name.last}</td>
                                    <td ><a href="tel:">{response.cell}</a></td>
                                    <td><a href="mailto:">{response.email}</a></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}





