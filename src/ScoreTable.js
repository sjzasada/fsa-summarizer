import React, {Component} from "react";
import {Table} from "react-bootstrap";
import ReactLoading from "react-loading";
import ScoreTableBodyFHRS from "./ScoreTableBodyFHRS.js";
import ScoreTableBodyFHIS from "./ScoreTableBodyFHIS.js";

//Component to fetch data for selected authority and display results table
class ScoreTable extends Component {
  _mounted = false;

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
    if (nextProps.authority !== this.state.selectedAuth) {
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
            //a user selecting an authority while the app is in the process of downloading data for a previous authority introduces a race condition that makes it uncertain which data will be displayed. check if this is the last request by seeing if the latest authority id is in the response url
            if (response.url.includes(this.state.selectedAuth)) {
              console.log("Returning JSON for " + this.state.selectedAuth);
              return response.json();
            }
          } else {
            throw new Error("Something went wrong ..."); //throw error for everything except HTTP 200
          }
        })
        .then(data => {
          if (this._mounted && data !== undefined) {
            //check if this is the latest request
            this.setState({
              establishments: data.establishments,
              isLoading: false
            });
          }
        })
        .catch(error => {
          if (this._mounted) {
            this.setState({
              error,
              isLoading: false
            });
          }
        });
    }
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  //rednder the score table
  render() {
    const {establishments, isLoading, error, selectedAuth} = this.state;

    //if no authority is selected, display nothing
    if (!selectedAuth) {
      return <p />;
    }

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

    console.log("Displaying data for authority: " + selectedAuth);

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
export class ScoreTableBody extends Component {
  render() {
    if (this.props.scheme === 1) {
      return <ScoreTableBodyFHRS establishments={this.props.establishments} />;
    } else {
      return <ScoreTableBodyFHIS establishments={this.props.establishments} />;
    }
  }
}

export default ScoreTable;
