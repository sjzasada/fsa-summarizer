import React, {
  Component
}
from 'react';
import {
  DropdownButton,
  MenuItem,
  ButtonGroup
}
from 'react-bootstrap'

import ReactLoading from 'react-loading';

import ScoreTable from './ScoreTable.js'

class AuthoritiesList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      selectedAuth: null,
      error: null,
      schemeType: 1,
      btnTitle: 'Select an authority'
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(evt) {
    console.log(evt)
    this.setState({
      selectedAuth: evt.id,
      btnTitle: evt.name,
      schemeType: evt.scheme
    })
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });

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
      .then(data => this.setState({
        hits: data.authorities,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));

  }

  render() {
    const {
      hits,
      isLoading,
      error,
      selectedAuth,
      btnTitle,
      schemeType
    } = this.state;

    if (error) {
      return <div className = "Loader error" > < p > {
        error.message
      } < /p> </div > ;
    }

    if (isLoading) {
      return <div className = "Loader" > < ReactLoading type = {
        'bars'
      }
      color = {
        'white'
      }

      /></div >
    }

    return ( < div > < div className = "DropDown" >
      < ButtonGroup justified >
      < DropdownButton bsSize = "large"
      block bsStyle = {
        'info'
      }
      title = {
        btnTitle
      }
      key = {
        1
      }
      id = {
        `split-button-basic-1`
      }
      onSelect = {
        this.handleSelect
      } > {
        hits.map(hit =>
          < MenuItem eventKey = {
            {
              id: hit.LocalAuthorityId,
              name: hit.Name,
              scheme: hit.SchemeType
            }
          }
          key = {
            hit.LocalAuthorityIdCode
          } > {
            hit.Name
          } < /MenuItem>)
        } < /DropdownButton>

        < /ButtonGroup> < /div >
        < div className = "ScoreTable-main" > < ScoreTable authority = {
          selectedAuth
        }
        scheme = {
          schemeType
        }
        / > < /div > < /div>

      );
    }

  }

  export default AuthoritiesList;
