import React, { Component } from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card';

class BarInfo extends Component {
  componentDidMount() {
    fetch(`/bar/?id=${this.props.match.params.beer_id}`)
      .then(res => res.json())
      .then(bar => this.setState({
        bar: bar[0]
      }));
  }
  constructor(props){
    super(props);

    this.state = {bar: {}};
  }

  render(){
    return(
      <div>
        <Card>
          <CardTitle title={this.state.bar.bar_name} subtitle="Card subtitle" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      </div>
    );
  }
}

export default BarInfo
