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
import { connect, changeCountry } from './store'



export class Buttons extends React.Component {
    
  clickHandler(countrylink){
    console.log(countrylink)
    console.log(changeCountry)
    changeCountry(countrylink)
  }

  createNeghbourBtn(array){
    buttons = []
    console.log(array)
    array.map(neighbour => {
      console.log(neighbour)
      buttons.push(
      <VrButton key={`${neighbour} - button`} onClick={() => this.clickHandler(neighbour)}>
        <Text style={{backgroundColor: 'green'}}> { neighbour }</Text>
      </VrButton>
      )
    })
    return buttons
  }

  render() {
    // console.log(this.props.neighbours)
    return (
      <View style={styles.panel}>

        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Pick a destination!
          </Text>
          {this.createNeghbourBtn(this.props.neighbours)}
        </View>
      </View>
    );
  }
};



export class Info extends React.Component {
  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Destination info!
          </Text>
          <Text>
            {this.props.name}
          </Text>
          <Text>
            {this.props.location}
          </Text>
          <Text>
            {this.props.population}
          </Text>
          <Text>
            {this.props.language}
          </Text>        
        </View>
      </View>
    );
  }
};

const ConnectedButtons = connect(Buttons)
const ConnectedInfo = connect(Info)

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    // width: 1000,
    // height: 600,
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

AppRegistry.registerComponent('ConnectedButtons', () => ConnectedButtons);
AppRegistry.registerComponent('ConnectedInfo', () => ConnectedInfo);
