import React, { Component } from 'react';
import '../App.css';
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete'
import {Link} from 'react-router-dom'
import Spinner from 'react-spinkit'
import {red600} from 'material-ui/styles/colors'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const dataSourceConfig = {
  text: "name",
  value: "_id"
}

class Home extends Component {

  componentDidMount() {
    console.log(this.props);
    // this.setState({
    //   loading: true
    // });
    // fetch('/beers')
    //   .then(res => {
    //     console.log(res);
    //     res.json()})
    //   .then(beers => {
    //     beers.forEach((beer) => {
    //       beer.name = `${beer.brewery_name.brewery_name} ${beer.beer_name}`;
    //     });
    //     this.setState({dataSource: beers, loading: false})
    //   });
  }

  constructor(props){
    super(props);

    this.state = {
      beers: [],
      dataSource: []
    };

    this.chosenRequest = this.chosenRequest.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  chosenRequest(chosen, index) {
    this.setState({
      chosenBeer: chosen._id
    });
  }

  clickButton() {
    console.log(this.props);
  }

  render(){
    const styles = {
      button: {
        margin: 12,
        fontFamily: 'Cardo'
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
        paddingLeft: '8px',
        fontFamily: 'Cardo'
      },
      hintStyle: {
        paddingLeft: '8px',
        fontFamily: 'Cardo'
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
        <RaisedButton
          label="click"
          onClick={this.clickButton}
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
        {this.props.data.loading ? loading : home}
      </div>

    );
  }
}

const BeerQuery = gql`query BeerQuery {
  Beer(id: "592f700f6c5d40a8420e0e42") {
    style
    brewery_name
    beer_name
  }
}`

const HomeWithData = graphql(BeerQuery)(Home)

export default HomeWithData;
