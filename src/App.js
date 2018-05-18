import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class DropDown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      err: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

  fetch('http://api.ratings.food.gov.uk/Authorities/basic', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-api-version': '2',
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong ...');
    }
  })
    .then(data => this.setState({ hits: data.authorities, isLoading: false }))
    .catch(error => this.setState({ error, isLoading: false }));

}

render() {
    const { hits, isLoading } = this.state;

//    if (error) {
  //    return <p>{error.message}</p>;
  //  }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
      <select name="cars">
        {hits.map(hit =>
          <option value="{hit.LocalAuthorityId}">{hit.Name}</option>
        )}
        </select>
      </div>
    );
  }

}

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <DropDown />
      </div>
    );
  }
}

export default App;
