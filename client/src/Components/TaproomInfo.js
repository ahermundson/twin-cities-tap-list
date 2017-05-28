import React, { Component } from 'react'

class TaproomInfo extends Component {

  componentWillReceiveProps() {
    console.log(true)
  }

  render(){
    return(
      <div>
        <h3>{this.props.name}</h3>
        <h4>{this.props.distance} miles away</h4>
      </div>
    );
  }
}

export default TaproomInfo
