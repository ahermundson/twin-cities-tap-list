import React, { Component } from 'react';
import '../App.css';
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete'
import {Link} from 'react-router-dom'
import Spinner from 'react-spinkit'
import Auth from '../Auth/Auth'
import {red600} from 'material-ui/styles/colors'

const dataSourceConfig = {
  text: "name",
  value: "_id"
}

const auth = new Auth();

class Home extends Component {

  componentDidMount() {
    // this.setState({
    //   loading: true
    // });
    fetch('/beers')
      .then(res => res.json())
      .then(beers => {
        beers.forEach((beer) => {
          beer.name = `${beer.brewery_name.brewery_name} ${beer.beer_name}`;
        });
        this.setState({dataSource: beers})
      });
      auth.handleAuthentication();
      // auth.getProfile((err, profile) => {
      //   console.log(profile);
      //   this.setState({
      //     loading: false
      //   });
      // });
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

    const loading = <Spinner name='double-bounce' color={red600} overrideSpinnerClassName="circle-wrapper"/>;

    const home = <div className="home">
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

    return(
      <div className="homeContainer">
        {this.state.loading ? loading : home}
      </div>

    );
  }
}

export default Home;
