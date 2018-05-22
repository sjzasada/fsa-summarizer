import React, {Component} from "react";
import {Table} from "react-bootstrap";
import ReactLoading from "react-loading";
import ScoreTableBodyFHRS from "./ScoreTableBodyFHRS.js";
import ScoreTableBodyFHIS from "./ScoreTableBodyFHIS.js";

//Component to fetch data for selected authority and display results table
class ScoreTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      establishments: {},
      isLoading: false,
      selectedAuth: null,
      error: null
    };
  }

  //load new data when component is passed a new authority
  componentWillReceiveProps(nextProps) {
    if (nextProps.authority !== this.props.authority) {
      this.setState({
        selectedAuth: nextProps.authority,
        isLoading: true, //set the state to loading, so that a wait widget is displayed
        error: null
      });

      let url =
        "http://api.ratings.food.gov.uk/Establishments?pageSize=0&localAuthorityId=" +
        nextProps.authority;
      console.log(url);
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-api-version": "2"
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong ..."); //throw error for everything except HTTP 200
          }
        })
        .then(data =>
          this.setState({
            establishments: data.establishments,
            isLoading: false
          })
        )
        .catch(error =>
          this.setState({
            error,
            isLoading: false
          })
        );
    }
  }

  //rednder the score table
  render() {
    const {establishments, isLoading, error, selectedAuth} = this.state;

    //if no authority is selected, display nothing
    if (!selectedAuth) {
      return <p />;
    }

    console.log("Displaying data for authority: " + selectedAuth);

    //if error not null, log and display message
    if (error) {
      console.log(error);
      return (
        <div className="error">
          <p> {error.message} </p>
        </div>
      );
    }

    //show a loading bar while data is being fetched
    if (isLoading) {
      return (
        <div className="Loader">
          <ReactLoading
            type={"spin"}
            color={"white"}
            width={100}
            height={100}
          />
        </div>
      );
    }

    //render a table to display the data
    return (
      <div>
        <Table striped bordered condensed>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <ScoreTableBody
            establishments={establishments}
            scheme={this.props.scheme}
          />
        </Table>
      </div>
    );
  }
}

//format table based on whether Scottish scheme is in use or not
class ScoreTableBody extends Component {
  render() {
    if (this.props.scheme === 1) {
      return <ScoreTableBodyFHRS establishments={this.props.establishments} />;
    } else {
      return <ScoreTableBodyFHIS establishments={this.props.establishments} />;
    }
  }
}

export default ScoreTable;
