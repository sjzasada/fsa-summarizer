import React, {Component} from "react";

import {Grid, Row, Col} from "react-bootstrap";

import AuthoritiesList from "./AuthoritiesList.js";

import "./App.css";

//Render the main app component
class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col lgOffset={2} lg={8} mdOffset={1} md={10} sm={12}>
              <header className="App-header">
                <h1 className="App-title"> FSA Food Hygiene Summariser </h1>
              </header>
              <p className="App-intro">
                Select a local authority from the list below to see how food
                hygiene ratings are distributed{" "}
              </p>
            </Col>
          </Row>
          <Row>
            <Col lgOffset={2} lg={8} mdOffset={1} md={10} sm={12}>
              <div className="App-main">
                <AuthoritiesList />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
