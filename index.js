import React from "react";
import { AppRegistry, StyleSheet, Text, View, VrButton } from "react-360";
import { connect, changeCountry } from "./store";
import GazeButton from "react-360-gaze-button";

export class MobileButton extends React.Component {
  state = {
    gazed: false,
    hover: false
  };

  setGazed = () => {
    this.setState({ gazed: true });
  };

  clickHandler(countrylink) {
    changeCountry(countrylink);
  }

  render() {
    const { gazed } = this.state;
    return (
      <GazeButton
        duration={2000}
        // onClick={this.setGazed}
        style={this.state.hover ? styles.hover : styles.button}
        onEnter={() => this.setState({ hover: true })}
        onExit={() => this.setState({ hover: false })}
        onClick={() => {
          this.setGazed;
          this.clickHandler(this.props.country);
        }}
        render={(remainingTime, isGazed) => (
          <View>
            <Text style={{ textAlign: "center", fontSize: 30 }}>
              {this.props.country}
            </Text>
            <Text style={{ color: 'black', fontWeight: "500" }}>{isGazed ? remainingTime : ""}</Text>
          </View>
        )}
      />
    );
  }
}

class Button extends React.Component {
  state = {
    hover: false
  };

  clickHandler(countrylink) {
    changeCountry(countrylink);
  }

  render() {
    return (
      <VrButton
        style={this.state.hover ? styles.hover : styles.button}
        onEnter={() => this.setState({ hover: true })}
        onExit={() => this.setState({ hover: false })}
        onClick={() => this.clickHandler(this.props.country)}
      >
        <Text style={styles.text}>
          {this.props.country}
        </Text>
      </VrButton>
    );
  }
}

export class Buttons extends React.Component {
  createNeghbourBtn(array) {
    buttons = [];
    array.map(country => {
      buttons.push(
        <MobileButton key={`${country} - button`} country={country} />
      );
    });
    return buttons;
  }

  render() {
    return (
      <View style={styles.buttonPanel}>
        <Text style={styles.header}>Pick a destination!</Text>
        {this.createNeghbourBtn(this.props.neighbours)}
      </View>
    );
  }
}

export class Info extends React.Component {
  render() {
    return (
      <View style={styles.infoPanel}>
        <Text style={styles.infoHeader}>Destination info!</Text>
        <Text style={styles.text}>{this.props.name}</Text>
        <Text style={styles.text}>{this.props.location}</Text>
        <Text style={styles.text}>{this.props.population}</Text>
        <Text style={styles.text}>{this.props.language}</Text>
      </View>
    );
  }
}

const ConnectedButtons = connect(Buttons);
const ConnectedInfo = connect(Info);

const styles = StyleSheet.create({
  infoPanel: {
    // Fill the entire surface
    width: 350,
    height: 350,
    backgroundColor: "rgba(255, 100, 100, 0.4)",
    // borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 5,
    borderRadius: 5,
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center"
  },
  buttonPanel: {
    width: 350,
    height: 800,
    opacity: 0.8,
    backgroundColor: "rgb(255, 200, 50)",
    borderColor: "rgb(255, 255, 255)",
    borderWidth: 5,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "rgb(0,0,0)",
    borderColor: "rgb(255,255,255)",
    borderWidth: 5
  },
  hover: {
    width: 200,
    height: 50,
    backgroundColor: "#0073B7",
    borderColor: "rgb(255,255,255)",
    borderWidth: 5
  },
  header: {
    fontSize: 40,
    color: "rgb(0 ,0 ,0)",
    fontWeight: "400",
    textAlign: "center"
  },
  infoHeader: {
    fontSize: 40,
    color: "rgb(0 ,0 ,0)",
    fontWeight: "400",
    textAlign: "center",
    margin: 20
  },
  text: {
    color: "rgb(0 ,0 ,0)",
    fontSize: 30,
    fontWeight: "400"
  }
});

AppRegistry.registerComponent("ConnectedButtons", () => ConnectedButtons);
AppRegistry.registerComponent("ConnectedInfo", () => ConnectedInfo);
