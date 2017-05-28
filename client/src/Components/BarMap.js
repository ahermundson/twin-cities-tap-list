import React, {Component} from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class BarMap extends Component {
  render(){
    return(
      <div className="map">
        <Map center={this.props.position} zoom={14} dragging={false}>
          <TileLayer
            url='http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png'
          />
          <Marker
            position={this.props.position}
          >
            <Popup>
              <span>{this.props.name}</span>
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default BarMap
