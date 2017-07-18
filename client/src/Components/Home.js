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
  value: "id"
}

class Home extends Component {

  componentWillReceiveProps(nextProps) {
    if(!nextProps.data.loading) {
      let tempBeerArray = nextProps.data.Beers.map(beer => {
        return {
          name: `${beer.brewery_name.brewery_name} ${beer.beer_name}`,
          id: beer._id
        }
      });
      this.setState({
        dataSource: tempBeerArray
      });
    }
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
      chosenBeer: chosen.id
    });
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

    if (this.props.data.loading) {
      return (
        <div className="homeContainer">
          <Spinner name='double-bounce' color={red600} overrideSpinnerClassName="circle-wrapper"/>
        </div>
      );
    }

    return(
      <div className="homeContainer">
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
      </div>

    );
  }
}

const BeerQuery = gql`query BeerQuery {
  Beers {
    _id
    beer_name
    brewery_name {
      brewery_name
    }
  }
}`

const HomeWithData = graphql(BeerQuery)(Home)

export default HomeWithData;
