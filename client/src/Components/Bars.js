import React, {Component} from 'react'
import SingleBar from './SingleBar'

class Bars extends Component {

  componentDidMount() {
    fetch('/bars')
      .then(res => res.json())
      .then(bars => {
        console.log(bars);
        this.setState({bars: bars})
      });
  }

  constructor(props){
    super(props);

    this.state = {bars: []};
  }

  render(){
    const barCards = this.state.bars.map((bar) => {
      return <SingleBar
        name={bar.bar_name}
        description={bar.website}
        position={[bar.latitude, bar.longitude]}
        key={bar.id}
      />
    });

    return(
      <div>
        <h1>Bars</h1>
        {barCards}
      </div>
    );
  }
}

export default Bars
