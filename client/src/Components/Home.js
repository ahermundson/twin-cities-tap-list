import React, { Component } from 'react';
import '../App.css';
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete'
import {Link} from 'react-router-dom'

const dataSourceConfig = {
  text: "name",
  value: "_id"
}

class Home extends Component {

  componentDidMount() {
    fetch('/beers')
      .then(res => res.json())
      .then(beers => {
        beers.forEach((beer) => {
          beer.name = `${beer.brewery_name.brewery_name} ${beer.beer_name}`;
        });
        this.setState({dataSource: beers})
      });
  }

  constructor(props){
    super(props);

    this.state = {
      beers: [],
      dataSource: []
    };

    this.chosenRequest = this.chosenRequest.bind(this);
  }


  chosenRequest(chosen, index) {
    this.setState({
      chosenBeer: chosen._id
    });
  }

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
      },
      autocomplete: {
        backgroundColor: 'white',
        marginTop: '20px',
        border: '5px solid grey',
        maxWidth: '80%'
      },
      textFieldStyle: {
        color: 'black',
        paddingLeft: '8px'
      },
      hintStyle: {
        paddingLeft: '8px'
      }
    };

    return(
      <div className="home">
        <h1 className="header">What do you want to drink tonight?</h1>
          <AutoComplete
            hintText="Search..."
            dataSource={this.state.dataSource}
            dataSourceConfig={dataSourceConfig}
            style={styles.autocomplete}
            inputStyle={styles.textFieldStyle}
            hintStyle={styles.hintStyle}
            onNewRequest={this.chosenRequest}
          />
        <Link to={`/bars/${this.state.chosenBeer}`}>
          <RaisedButton
            label="Search"
            style={styles.button}
          />
        </Link>
      </div>
    );
  }
}

export default Home;
