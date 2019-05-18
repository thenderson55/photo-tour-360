import React from 'react';
import data from './data/pototour'
import {
  asset,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
} from 'react-360';

export default class HelloworldVR extends React.Component {
  
  state = {
    name: 'Bill',
    location: 'North-West Europe',
    population: '60,000,000',
    language: 'English',
    economy: 'Pork Pies, Gin, Beer, Cider',
    neighbours: ["Alaska", "Russia", "Japan"]
    //  data.country.name
  }

  clickHandler(countrylink){
    this.setState({
      name: data[`${countrylink}`].name,
      location: data[`${countrylink}`].location,
      population: data[`${countrylink}`].population,
      language: data[`${countrylink}`].language,
      economy: data[`${countrylink}`].economy,
      neighbours: ["Alaska", "Russia", "Japan"]
    })

    

  }

  createNeghbourBtn(array){
    buttons = []
    array.map(neighbour => {
      buttons.push(
      <VrButton key={`${neighbour} - button`} onClick={() => this.clickHandler(neighbour)}>
        <Text style={{backgroundColor: 'green'}}> { neighbour }</Text>
      </VrButton>
      )
    })
    return buttons
  }

  render() {
    return (
      <View style={styles.panel}>

        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Pick a destination!
          </Text>
          {this.createNeghbourBtn(this.state.neighbours)}
        </View>

        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Destination info!
          </Text>
          <Text>
            {this.state.name}
          </Text>
          <Text>
            {this.state.location}
          </Text>
          <Text>
            {this.state.population}
          </Text>
          <Text>
            {this.state.language}
          </Text>
          
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('HelloworldVR', () => HelloworldVR);
