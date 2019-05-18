import React from 'react'
import data from './data/pototour'
import { asset, Environment } from 'react-360'
// import { listeners } from 'cluster';

const State = {
  name: 'Bill',
  location: 'North-West Europe',
  population: '60,000,000',
  language: 'English',
  economy: 'Pork Pies, Gin, Beer, Cider',
  neighbours: ["Alaska", "Russia", "Hawaii"]
}

const listeners = new Set()

function updateComponents() {
  for (const callback of listeners.values()){
    callback()
  }
}

export function changeCountry(countrySelection){

  State.name = countrySelection
  State.location = data[`${countrySelection}`].location,
  State.population = data[`${countrySelection}`].population,
  State.language = data[`${countrySelection}`].language,
  State.economy = data[`${countrySelection}`].economy,
  State.neighbours = ["Alaska", "Russia", "Hawaii"]

  Environment.setBackgroundImage(asset(`${countrySelection}.jpg`))

  updateComponents()

}

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      name: State.name,
      location: State.location,
      population: State.population,
      language: State.language,
      economy: State.economy,
      neighbours: State.neighbours
    }

    _listener = () => {
      this.setState({
        name: State.name,
        location: State.location,
        population: State.population,
        language: State.language,
        economy: State.economy,
        neighbours: State.neighbours
      })
    }

    componentDidMount(){
      listeners.add(this._listener)
    }

    render() {
      return(
        <Component
          {...this.props}
          name={this.state.name}
          location={this.state.location}
          population={this.state.population}
          language={this.state.language}
          economy={this.state.economy}
          neighbours={this.state.neighbours}
        />     
      )
    }
  }
}