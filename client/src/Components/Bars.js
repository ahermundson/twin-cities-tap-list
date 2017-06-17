import React, {Component} from 'react'
import SingleBar from './SingleBar'
import { Tabs, Tab } from 'material-ui/Tabs'
import {red600} from 'material-ui/styles/colors'
import LeafletMap from './Map'

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

  componentDidMount() {
    if (this.props.match.params.hasOwnProperty('beer_id')){
      fetch(`/bars/?id=${this.props.match.params.beer_id}`)
        .then(res => res.json())
        .then(bars => {
          let barMarkers = bars.map((bar) => {
            return {
              position: [bar.latitude, bar.longitude],
              name: bar.bar_name
            }
          });
          this.setState({
            bars: bars,
            barMarkers: barMarkers
          });
        });
    } else {
      fetch(`/bars`)
        .then(res => res.json())
        .then(bars => {
          let barMarkers = bars.map((bar) => {
            return {
              position: [bar.latitude, bar.longitude],
              name: bar.bar_name
            }
          });
          this.setState({
            bars: bars,
            barMarkers: barMarkers
          });
        });
    }

  }

  constructor(props){
    super(props);

    this.state = {
      bars: [],
      barMarkers: []};
  }

  render(){
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
            <LeafletMap
              markers={this.state.barMarkers}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Bars
