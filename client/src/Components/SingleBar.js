import React, { Component } from 'react'
import { Card, CardHeader, CardText, CardActions, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import BarMap from './BarMap'
import {red600} from 'material-ui/styles/colors'
import {Link} from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const heartStyle = {
  color: 'black'
}

const styles = {
  card: {
    margin: "0 auto 20px",
    width: "80%",
    textAlign: "center",
    backgroundColor: red600
  },
  header: {
    paddingRight: "0px"
  },
  title: {
    fontSize: "1.4em"
  },
  cardText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
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
    this.addFavorite = this.addFavorite.bind(this);
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

  addFavorite = () => {
    console.log(this.props.bar_id);
    let favorite_bar = {
        bar_id: this.props.bar_id
    };
    this.props.UpdateFavorites({
      variables: { favorite_bar: favorite_bar }
    })
    .then(({ data }) => {
      console.log(data);
    })
  }

  render(){
    return(
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        style={styles.card}>
        <CardHeader
          title={this.props.name}
          textStyle={styles.header}
          titleStyle={styles.title}
        />
        <CardText
          style={styles.cardText}>
          <Link to={`/bar/${this.props.bar_id}`}>See Bar Information</Link>
          <span>{this.props.street_address}</span>
          <span>{this.props.city}, {this.props.state}</span>
          <span>{this.props.zip}</span>

        </CardText>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
        <BarMap
          position={this.props.position}
          name={this.props.name}
          expandable={true}
        />
      <i style={heartStyle} className="fa fa-heart" onClick={this.addFavorite}></i>
      {!this.state.expanded ? <CardActions>
        <FlatButton label="More" onTouchTap={this.handleExpand} />
        </CardActions> : null}
        <CardActions
          expandable={true}>
          <FlatButton label="Less"
            onTouchTap={this.handleReduce}/>
        </CardActions>
      </Card>
    );
  }
}


const UpdateUserFavorites = gql`
  mutation UpdateFavorites($favorite_bar: UserFavoriteListUpdate!) {
    UpdateFavorites(data: $favorite_bar) {
      _id
    }
  }`;

const SingleBarWithData = graphql(UpdateUserFavorites, {
  name: 'UpdateFavorites'
})(SingleBar)

export default SingleBarWithData
