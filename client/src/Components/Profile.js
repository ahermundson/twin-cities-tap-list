import React, {Component} from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'

class Profile extends Component {

  componentDidMount() {
    let accessToken = localStorage.getItem('id_token');
    if(this.props.match.params.user_id !== 'undefined') {
      fetch(`/users/?id=${this.props.match.params.user_id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(user => {
          console.log(user);
          this.setState({
          user: user
          })
        });
    }
  }

  constructor(props){
    super(props);

    this.state = {user: {}};
  }

  render(){
    return(
      <div>
        <Card>
          <CardHeader
            title="Your Favorites"
          />
          <CardText>
            <h4>{this.state.user.first_name}</h4>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default Profile
