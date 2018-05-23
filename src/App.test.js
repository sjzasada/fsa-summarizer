import React from "react";
import ReactDOM from "react-dom";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});

import App from "./App";
import ScoreTableRow from "./ScoreTableRow";
import AuthoritiesList from "./AuthoritiesList";
import ScoreTable, {ScoreTableBody} from "./ScoreTable";
import ScoreTableBodyFHIS from "./ScoreTableBodyFHIS";
import ScoreTableBodyFHRS from "./ScoreTableBodyFHRS";

//load test data
var authorities = require("../testData/authorities.json");
var establishments = require("../testData/establishments.json");
var establishments_scot = require("../testData/establishments-scot.json");

//Check app renders without crashing
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//test ScoreTableRow renders correclty
describe("ScoreTableRow", () => {
  it("Returns a valid table row", () => {
    let mountedScoreTableRow = Enzyme.shallow(
      <ScoreTableRow title="test" val={1} />
    );
    //check we contain one row
    const trs = mountedScoreTableRow.find("tr");
    expect(trs.length).toEqual(1);

    //check row contains to tds
    const tds = trs.find("td");
    expect(tds.length).toEqual(2);
  });
});

//Test AuthoritiesList contract
describe("AuthoritiesList", () => {
  const authoritiesList = Enzyme.shallow(<AuthoritiesList />, {
    disableLifecycleMethods: true
  });

  //test the component without running the fetch/lifecycle method
  it("Check returns a loading timer", () => {
    authoritiesList.setState({isLoading: true});

    const timer = authoritiesList.find("Loading");
    expect(timer.length).toEqual(1);
  });

  it("Check returns an error", () => {
    authoritiesList.setState({error: true, isLoading: false});

    const error = authoritiesList.find(".error");
    expect(error.length).toEqual(1);
  });

  //test menu returned
  it("Check returns a Dropdown menu", () => {
    authoritiesList.setState({
      error: null,
      isLoading: false,
      authorities: authorities.authorities
    });

    const dropdown = authoritiesList.find("DropdownButton");
    expect(dropdown.length).toEqual(1);
  });

  it("Check menu snapshot", () => {
    authoritiesList.setState({
      error: null,
      isLoading: false,
      authorities: authorities.authorities
    });

    expect(authoritiesList).toMatchSnapshot();
  });

  //test event handler sets state
  it("Check handleSelect event sets state", () => {
    authoritiesList.instance().handleSelect({id: 100, name: "name", scheme: 1});

    expect(authoritiesList.state().selectedAuth).toEqual(100);
    expect(authoritiesList.state().btnTitle).toEqual("name");
  });
});

//Test ScoreTable contract
describe("ScoreTable", () => {
  const scoreTable = Enzyme.shallow(<ScoreTable />, {
    disableLifecycleMethods: true
  });

  it("Check no table is returned if selectedAuth is not set", () => {
    const p = scoreTable.find("p");
    expect(p.length).toEqual(1);
  });

  it("Check returns a loading timer", () => {
    scoreTable.setState({isLoading: true, selectedAuth: 1});

    const timer = scoreTable.find("Loading");
    expect(timer.length).toEqual(1);
  });

  it("Check returns an error", () => {
    scoreTable.setState({error: true, isLoading: false, selectedAuth: 1});

    const error = scoreTable.find(".error");
    expect(error.length).toEqual(1);
  });

  it("Check returns table", () => {
    scoreTable.setState({error: null, isLoading: false, selectedAuth: 1});

    const table = scoreTable.find("Table");
    expect(table.length).toEqual(1);

    const tableBody = table.find("ScoreTableBody");
    expect(tableBody.length).toEqual(1);
  });
});

//Test ScoreTableBody contract
describe("ScoreTableBody", () => {
  const scoreTableBody = Enzyme.shallow(<ScoreTableBody />, {
    disableLifecycleMethods: true
  });

  it("Check returns FHRS table for scheme 1", () => {
    scoreTableBody.setProps({scheme: 1});

    const tableFHRS = scoreTableBody.find("ScoreTableBodyFHRS");
    expect(tableFHRS.length).toEqual(1);
  });

  it("Check returns FHIS table for scheme 2", () => {
    scoreTableBody.setProps({scheme: 2});

    const tableFHIS = scoreTableBody.find("ScoreTableBodyFHIS");
    expect(tableFHIS.length).toEqual(1);
  });
});

//Test ScoreTableBodyFHRS contract
describe("ScoreTableBodyFHRS", () => {
  const scoreTableBodyFHRS = Enzyme.shallow(<ScoreTableBodyFHRS />, {
    disableLifecycleMethods: true
  });

  it("Check FHRS scores calculated correctly", () => {
    const scores = scoreTableBodyFHRS
      .instance()
      .calculateScores(establishments.establishments);

    expect(scores.five).toEqual(72.98969072164948);
    expect(scores.exempt).toEqual(4.43298969072165);
  });

  it("Check table is generated", () => {
    scoreTableBodyFHRS.setProps({
      establishments: establishments.establishments
    });

    const tableBodyFHRS = scoreTableBodyFHRS.find("tbody");
    expect(tableBodyFHRS.length).toEqual(1);
  });

  it("Check table snapshot", () => {
    scoreTableBodyFHRS.setProps({
      establishments: establishments.establishments
    });

    expect(scoreTableBodyFHRS).toMatchSnapshot();
  });
});

//Test ScoreTableBodyFHIS contract
describe("ScoreTableBodyFHIS", () => {
  const scoreTableBodyFHIS = Enzyme.shallow(<ScoreTableBodyFHIS />, {
    disableLifecycleMethods: true
  });

  it("Check FHIS scores calculated correctly", () => {
    const scores = scoreTableBodyFHIS
      .instance()
      .calculateScores(establishments_scot.establishments);

    expect(scores.pass).toEqual(75.10917030567686);
    expect(scores.exempt).toEqual(18.995633187772924);
  });

  it("Check table is generated", () => {
    scoreTableBodyFHIS.setProps({
      establishments: establishments_scot.establishments
    });

    const tableBodyFHIS = scoreTableBodyFHIS.find("tbody");
    expect(tableBodyFHIS.length).toEqual(1);
  });

  it("Check table snapshot", () => {
    scoreTableBodyFHIS.setProps({
      establishments: establishments_scot.establishments
    });

    expect(scoreTableBodyFHIS).toMatchSnapshot();
  });
});
