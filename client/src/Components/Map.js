import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Places from './Places'

class LeafletMap extends Component {

  getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((currentLocation) => {
          this.setState({
            position: [currentLocation.coords.latitude, currentLocation.coords.longitude]
          }, this.getDistance);
        })
    }
  }

  getDistance() {
    var newMarkerObject = [...this.state.markers]

    newMarkerObject.forEach((marker) => {
      marker.distanceTo = this.distance(this.state.position[0], this.state.position[1], marker.position[0], marker.position[1]).toFixed(2)
    })
    this.setState({
      markers: newMarkerObject.sort((a, b) => {
        return a.distanceTo - b.distanceTo
      }),
      showTaprooms: true
    })
  }

  distance(lat1, lon1, lat2, lon2) {
  	var radlat1 = Math.PI * lat1/180
  	var radlat2 = Math.PI * lat2/180
  	var theta = lon1-lon2
  	var radtheta = Math.PI * theta/180
  	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  	dist = Math.acos(dist)
  	dist = dist * 180/Math.PI
  	dist = dist * 60 * 1.1515
  	return dist
  }

  constructor(props){
    super(props);

    this.state = {
      position: [45.003774, -93.245499],
      markers: [
        { position: [44.915762, -93.262925], name: "Town Hall Tap" },
        { position: [44.984930, -93.279203], name: "Fulton" },
        { position: [44.973223, -93.288925], name: "Sisyphus Brewing" },
        { position: [44.948676, -93.260741], name: "Eastlake Craft Brewing" },
        { position: [44.999905, 93.281516], name: "Boom Island Brewing Company" },
        { position: [44.999076, -93.246570], name: "612Brew" },
        { position: [44.998341, -93.221150], name: "NorthGate Brewing" },
        { position: [45.013557, -93.247759], name: "Fair State Brewing Cooperative" },
        { position: [45.001084, -93.245778], name: "Bauhaus Brew Labs" },
        { position: [45.003774, -93.245499], name: "Sociable Cider Werks" },
      ],
      showTaprooms: false
    };
    this.getLocation = this.getLocation.bind(this)
    this.distance = this.distance.bind(this)
    this.getDistance = this.getDistance.bind(this)
  }

  render(){

    const markerElements = this.state.markers.map((marker, index) => {
      return <Marker
        position={marker.position}
        key={index}
      >
        <Popup>
          <span>{marker.name}</span>
        </Popup>
      </Marker>
    })

    return(
      <div>
        <button onClick={this.getLocation} className="find-brewery-button">Find A Brewery Near Me</button>
        <br/>
        <div className="info">
          <Map center={this.state.position} zoom={14}>
            <TileLayer
              url='http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png'
            />
            {markerElements}
          </Map>
          <Places
            markers={this.state.markers}
            showTaprooms={this.state.showTaprooms}
          />
        </div>
      </div>
    );
  }
}

export default LeafletMap
