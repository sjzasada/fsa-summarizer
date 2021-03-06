import React, {Component} from "react";
import {DropdownButton, MenuItem, ButtonGroup} from "react-bootstrap";
import ReactLoading from "react-loading";
import ScoreTable from "./ScoreTable.js";

//This components fetches and displays a dropdown list of authorities
class AuthoritiesList extends Component {
  _mounted = false; //considered an antipattern by FB, but easier than using Redux for a simple app

  constructor(props) {
    super(props);

    //the state of the component
    this.state = {
      authorities: [],
      isLoading: false,
      selectedAuth: null,
      error: null,
      schemeType: 1,
      btnTitle: "Select an authority" //we change the button title when we handle a state change based on a list selection
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  //handle selections from the drop-down list
  //when a selection is made, set the button title, scheme type and authority id
  handleSelect(evt) {
    console.log(evt);

    this.setState({
      selectedAuth: evt.id,
      btnTitle: evt.name,
      schemeType: evt.scheme
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  //fetch data when component loaded
  //fire state changes on events to re-render component
  componentDidMount() {
    this._mounted = true;
    this.setState({
      isLoading: true, //set the state to loading, so that a wait widget is displayed
      error: null
    });

    fetch("http://api.ratings.food.gov.uk/Authorities/basic", {
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
      .then(data => {
        if (this._mounted) {
          this.setState({
            authorities: data.authorities,
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

  //render the component
  render() {
    const {
      authorities,
      isLoading,
      error,
      selectedAuth,
      btnTitle,
      schemeType
    } = this.state;

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
          <ReactLoading type={"bars"} color={"white"} />
        </div>
      );
    }

    //render dropdown menu when data is loaded
    return (
      <div>
        <div className="DropDown">
          <ButtonGroup justified>
            <DropdownButton
              bsSize="large"
              block
              bsStyle={"info"}
              title={btnTitle}
              key={1}
              id={`split-button-basic-1`}
              onSelect={this.handleSelect}
            >
              {authorities.map(authority => (
                <MenuItem
                  eventKey={{
                    id: authority.LocalAuthorityId,
                    name: authority.Name,
                    scheme: authority.SchemeType
                  }} //store each authority name, id and scheme in eventkey object
                  key={authority.LocalAuthorityIdCode}
                >
                  {authority.Name}
                </MenuItem>
              ))}
            </DropdownButton>
          </ButtonGroup>
        </div>
        <div className="ScoreTable-main">
          <ScoreTable authority={selectedAuth} scheme={schemeType} />
        </div>
      </div>
    );
  }
}

export default AuthoritiesList;
