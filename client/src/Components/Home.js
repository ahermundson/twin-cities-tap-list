import React, { Component } from 'react';
import '../App.css';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Home extends Component {
  render(){
    const styles = {
      button: {
        margin: 12
      },
      underlineStyle: {
        borderColor: 'black'
      },
      floatingLabelText: {
        color: 'white'
      }
    }
    return(
      <div className="home">
        <h1 className="header">What do you want to drink tonight?</h1>
        <TextField
          hintText="Surly Furious"
          floatingLabelText="Search..."
          underlineFocusStyle={styles.underlineStyle}
          floatingLabelFocusStyle={styles.floatingLabelText}
        />
        <RaisedButton
          label="Search"
          style={styles.button}
        />
      </div>
    );
  }
}

export default Home;
