# FSA Food Hygiene Summariser

A React/Bootstrap interface to summarise the FSA food hygiene ratings for UK local authorities.

Data is taken from the FSA API: http://api.ratings.food.gov.uk/Help

## Requirements

* Node.js
* NPM

## Installation

Install required modules with `npm install`

## Running

Run the application with `npm start`

The application will be available at `http://localhost:3000`

## Testing

Run the test suite with `npm test`

The tests are designed to test each component's contract

## Deployment

Deployable code can be built with `npm build`

## Assumptions

* The application assumes that the data returned by the FSA API is consistent with the schema specified by the FSA

## Docker

The application can be built in Docker with `docker build -t fsaapp .` and run with `docker run -it -p 3000:3000 --rm`.

