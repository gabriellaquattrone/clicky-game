// Credit given to https://github.com/philiptd5000/clicky-game-REACT/tree/master/public for majority of help.
import React, { Component } from 'react';
import Grid from "./components/Grid";
import Paper from "./components/Paper";
import CharacterCard from "./components/CharacterCard";
import Score from "./components/Score";
import Alert from "./components/Alert";
import NavBar from "./components/NavBar";
import characters from "./characters.json";

class App extends Component {

  state = {
    characters: characters,
    pickedChars: [],
    topScore: 0,
    alertMessage: ""
  }

  // This function handles the item that the user picked. 
  // It runs shuffleCharacters to shuffle the characters again and checkGuess to check if the user
  // picked a Pokemon that wasn't picked before.
  handlePicked = event => {
    const name = event.target.attributes.getNamedItem("name").value;
    this.shuffleCharacters()
    this.checkGuess(name, this.updateTopScore)
  }

  // This activates the shuffle array function and shuffles the Pokemon characters.
  shuffleCharacters = () => {
    this.setState((state, props) => {
      return {characters: this.shuffleArray(state.characters)}
    });
  }

  // This picks a random number in order to shuffle the array.
  shuffleArray = (a) => {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  checkGuess = (name, cb) => {
    const newState = { ...this.state };
    if (newState.pickedChars.includes(name)) {
      newState.alertMessage = `You already picked "${name}"!`
      newState.pickedChars = []
      this.setState(() => {
        return newState;
      });
    } else {
      newState.pickedChars.push(name)
      newState.alertMessage = `You made it!`
      this.setState(() => {
        return newState;
      });
    }
    cb(newState, this.alertWinner)
  }

  updateTopScore = (newState, cb) => {
    if (newState.pickedChars.length > newState.topScore) {
      newState.topScore++
      this.setState(() => {
        return newState;
      });
    }
    cb(newState)
  }

  alertWinner = (newState) => {
    if (newState.pickedChars.length === 12) {
      newState.alertMessage = "You did it! You caught them all!";
      newState.pickedChars = [];
      this.setState(() => {
        return newState;
      });
    }
  }

  render() {
    return (
      <div>
        <NavBar style={{ background: "#313133", marginBottom: "5px" }} />

        <Grid container direction="column" style={{ margin: "0 auto", maxWidth: 945 }}>

          <Grid item lg={12}>
            <Paper>
              {this.state.alertMessage === "You made it!" ? (
                <Alert message={this.state.alertMessage} style={{ color: "green" }} />
              ) : (
                  <Alert message={this.state.alertMessage} style={{ color: "red" }} />
                )}
            </Paper>
          </Grid>

          <Grid container justify="space-between">

            <Grid item lg={6} md={6}>
              <Paper>
                <Score type="Score" score={this.state.pickedChars.length} />
              </Paper>
            </Grid>

            <Grid item lg={6} md={6}>
              <Paper>
                <Score type="Top Score" score={this.state.topScore} />
              </Paper>
            </Grid>

          </Grid>

        </Grid>

        <Grid container spacing={24} justify="center" style={{ maxWidth: 945, margin: "0 auto" }}>
          {this.state.characters.map(char => (
            <Grid item lg={3} md={3} sm={4} xs={6}>
            <CharacterCard
              id={char.id}
              name={char.name}
              image={char.image}
              key={char.id}
              handlePicked={this.handlePicked}
            />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}

export default App;