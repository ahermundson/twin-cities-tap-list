import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class LeafletMap extends Component {

  componentWillReceiveProps(nextProps) {
    console.log("PROPS: ", nextProps);
    this.setState({
      markers: nextProps.markers,
      position: nextProps.markers[0].position
    })
  }

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
    this.getLocation = this.getLocation.bind(this)
    this.distance = this.distance.bind(this)
    this.getDistance = this.getDistance.bind(this)

    this.state = {
      position: [44.909444, -93.263566],
      markers: []
    }
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
    });

    return(
      <div className="info">
          <Map center={this.state.position} zoom={12}>
            <TileLayer
              url='http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
            />
            {markerElements}
          </Map>
        </div>
    );
  }
}

export default LeafletMap
