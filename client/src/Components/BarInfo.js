import React, { Component } from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card';

class BarInfo extends Component {
  componentDidMount() {
    fetch(`/bar/?id=${this.props.match.params.beer_id}`)
      .then(res => res.json())
      .then(bar => {
        console.log(bar);
        let beers_on_tap = [];
        bar.beers_on_tap.forEach(beer => {
          beers_on_tap.push(`${beer.brewery_name.brewery_name} ${beer.beer_name}`);
        });
        this.setState({
          bar: bar,
          beers_on_tap: beers_on_tap
        });
      });
  }
  constructor(props){
    super(props);

    this.state = {
      bar: {},
      beers_on_tap: []
    };
  }

  render(){

    const beers_on_tap = this.state.beers_on_tap.map(beer => {
      return <li>{beer}</li>
    });

    return(
      <div>
        <Card>
          <CardTitle title={this.state.bar.bar_name} subtitle={this.state.bar.website} />
          <CardText>
            <div className="single-bar-container">
              <div>
                <h5>On Tap</h5>
                <ul className="single-bar-tap-list">
                  {beers_on_tap}
                </ul>
              </div>
              <div className="single-bar-location">
                <h5>Address</h5>
                <span>{this.state.bar.street_address}</span>
                <span>{this.state.bar.city}, {this.state.bar.state}</span>
                <span>{this.state.bar.zip}</span>
              </div>
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default BarInfo
