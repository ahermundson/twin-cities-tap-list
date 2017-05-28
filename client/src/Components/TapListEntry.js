import React, {Component} from 'react'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  checkbox: {
    marginBottom: '15px'
  }
}

class TapListEntry extends Component {

  componentDidMount() {
    fetch('/beers')
      .then(res => res.json())
      .then(beers => {
        console.log(beers);
        this.setState({beers: beers})
      });
  }

  constructor(props){
    super(props);

    this.state = {beers: []};
  }

  render(){

    const beerOptions = this.state.beers.map(beer => {
      return <Checkbox
        label={`${beer.brewery_name} ${beer.name}`}
        key={beer.id}
        style={styles.checkbox}
      />
    })

    return(
      <div>
        {beerOptions}
        <RaisedButton
          label={"Submit"}
        />
      </div>
    );
  }
}

export default TapListEntry
