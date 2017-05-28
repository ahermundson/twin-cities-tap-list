import React, { Component } from 'react'
import TaproomInfo from './TaproomInfo'

class Places extends Component {

  componentDidMount() {
    fetch('/bars')
      .then(res => res.json())
      .then(bars => {
        this.setState({ bars });
        console.log(this.state);
      });
  }
  index(index) {
    console.log(index)
  }

  constructor(props){
    super(props);

    this.state = { bars: []};
    this.index = this.index.bind(this)
  }

  render(){

    const taprooms = this.props.markers.map((marker, index) => {
      return <TaproomInfo
        name={marker.name}
        distance={marker.distanceTo}
        key={index}
        onClick={(e) => this.index(e)}
      />
    });

    return(
      <div>
        <h4>Taprooms Near You</h4>
        {this.props.showTaprooms ? taprooms : null}
      </div>
    );
  }
}

export default Places
