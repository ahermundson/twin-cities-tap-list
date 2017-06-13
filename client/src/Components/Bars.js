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
    fetch(`/bars/?id=${this.props.match.params.beer_id}`)
      .then(res => res.json())
      .then(bars => {
        let barMarkers = bars.map((bar) => {
          return {
            position: [bar.longitude, bar.latitude],
            name: bar.bar_name
          }
        });
        console.log("MARKERS: ", barMarkers);
        this.setState({
          bars: bars,
          barMarkers: barMarkers
        });
      });
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
        description={bar.website}
        position={[bar.latitude, bar.longitude]}
        key={bar._id}
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
