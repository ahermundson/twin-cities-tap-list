import React, { Component } from 'react'
import { Card, CardHeader, CardText, CardActions, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import BarMap from './BarMap'
import {red600} from 'material-ui/styles/colors'

const styles = {
  card: {
    margin: "0 auto 20px",
    width: "80%",
    textAlign: "center",
    backgroundColor: red600
  },
  header: {
    paddingRight: "0px"
  }
}

class SingleBar extends Component {
  constructor(props){
    super(props);

    this.state = {};
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render(){
    return(
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        style={styles.card}>
        <CardHeader
          title={this.props.name}
          textStyle={styles.header}
        />
        <CardText>
          {this.props.description}
        </CardText>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
        <BarMap
          position={this.props.position}
          name={this.props.name}
          expandable={true}
        />
        <CardActions>
        <FlatButton label="Show Map" onTouchTap={this.handleExpand} />
        <FlatButton label="Hide Map" onTouchTap={this.handleReduce} />
        </CardActions>
      </Card>
    );
  }
}

export default SingleBar
