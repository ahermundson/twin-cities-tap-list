import React, {Component} from 'react'
import SingleBar from './SingleBar'
import { Tabs, Tab } from 'material-ui/Tabs'
import {red600} from 'material-ui/styles/colors'
import LeafletMap from './Map'
import Spinner from 'react-spinkit'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const styles = {
  tabStyle: {
    backgroundColor: "white",
    color: red600
  },
  inkBarStyle: {
    background: "pink"
  }
}

class Bars extends Component {

  componentWillReceiveProps(nextProps) {
    if(!nextProps.data.loading) {
      let barMarkers = nextProps.data.Beer_On_Tap.map((bar) => {
        return {
          position: [bar.latitude, bar.longitude],
          name: bar.bar_name
        }
      });
      this.setState({
        bars: nextProps.data.Beer_On_Tap,
        barMarkers: barMarkers
      });
    }
  }

  constructor(props){
    super(props);

    this.state = {
      bars: [],
      barMarkers: []
    };
  }

  render(){
    if (this.props.data.loading) {
      return (
        <div className="homeContainer">
          <Spinner name='double-bounce' color={red600} overrideSpinnerClassName="circle-wrapper"/>
        </div>
      );
    }

    const barCards = this.state.bars.map((bar) => {
      return <SingleBar
        name={bar.bar_name}
        street_address={bar.street_address}
        city={bar.city}
        state={bar.state}
        zip={bar.zip}
        position={[bar.latitude, bar.longitude]}
        key={bar._id}
        bar_id={bar._id}
      />
    });

    return(
      <div>
        <Tabs inkBarStyle={styles.inkBarStyle}>
          <Tab label="On Tap Here" style={styles.tabStyle}>
            <h1>Bars</h1>
            {barCards}
          </Tab>
          <Tab label="Bar Map" style={styles.tabStyle}>
            <LeafletMap markers={this.state.barMarkers} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const BarQuery = gql`query BarQuery($id: ID!) {
  Beer_On_Tap(id: $id) {
    _id
    bar_name
    street_address
    city
    state
    zip
    latitude
    longitude
    beers_on_tap {
      beer_name
      brewery_name {
        brewery_name
      }
    }
  }
}`

const BarsWithQuery = graphql(BarQuery, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.match.params.beer_id
    }
  })
})(Bars)

export default BarsWithQuery
