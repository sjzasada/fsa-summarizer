import React, {Component} from "react";

import {Table} from "react-bootstrap";

import ReactLoading from "react-loading";
import ScoreTableBodyFHRS from "./ScoreTableBodyFHRS.js";
import ScoreTableBodyFHIS from "./ScoreTableBodyFHIS.js";

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.authority !== this.props.authority) {
      this.setState({selectedAuth: nextProps.authority, isLoading: true});

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
            throw new Error("Something went wrong ...");
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

  render() {
    const {establishments, isLoading, error, selectedAuth} = this.state;

    console.log("Authority: " + selectedAuth);
    console.log("Establishments: " + establishments);
    if (!selectedAuth) {
      return <p />;
    }

    if (error) {
      return <p> {error.message} </p>;
    }

    if (isLoading) {
      return (
        <div className="Loader">
          {" "}
          <ReactLoading
            type={"spin"}
            color={"white"}
            width={100}
            height={100}
          />
        </div>
      );
    }

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
