import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Tabs, Tab} from 'material-ui/Tabs'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {red600} from 'material-ui/styles/colors'

const dataSourceConfig = {
  text: "bar_name",
  value: "_id"
}
const dataSourceConfigBrewery = {
  text: "brewery_name",
  value: "_id"
}

const styles = {
  autocomplete: {
    backgroundColor: 'white',
    marginTop: '20px',
    border: '5px solid grey',
    maxWidth: '80%'
  },
  textFieldStyle: {
    color: 'black',
    paddingLeft: '8px'
  },
  hintStyle: {
    paddingLeft: '8px'
  },
  raisedButton: {
    marginTop: '12px'
  },
  headline: {
    fontSize: 24,
    fontWeight: 400,
    color: "white"
  },
  tabStyle: {
    backgroundColor: "white",
    color: red600,
    fontSize: "1.2rem"
  }
}

class TapListEntry extends Component {

  componentDidMount() {
    fetch('/beers')
      .then(res => res.json())
      .then(beers => {
        beers.forEach((beer) => {
          beer.name = `${beer.brewery_name.brewery_name} ${beer.beer_name}`;
        });
        this.setState({beers: beers})
      });

    fetch('/bars')
      .then(res => res.json())
      .then(bars => {
        this.setState({dataSource: bars})
      });

    fetch('/breweries')
      .then(res => res.json())
      .then(breweries => {
        this.setState({dataSourceBrewery: breweries});
      })
  }

  constructor(props){
    super(props);

    this.state = {
      beers: [],
      dataSource: [],
      selected: [],
      breweries: [],
      dataSourceBrewery: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.chosenRequest = this.chosenRequest.bind(this);
    this.chosenRequestBrewery = this.chosenRequestBrewery.bind(this);
    this.onBeerSubmit = this.onBeerSubmit.bind(this);
  }

  onSubmit() {
    let updateTapList = {
        bar_id: this.state.chosenBar,
        beers_on_tap: this.state.selected
    };

    fetch('bars', {
      method: 'PUT',
      body: JSON.stringify(updateTapList),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
      console.log(`Response from tap list update ${JSON.stringify(response)}`);
    });
  }

  onBeerSubmit() {
    let beerToAdd = {
      brewery: this.state.chosenBrewery,
      beer_name: this.state.beer_name,
      beer_style: this.state.beer_style
    };

    fetch('/beers', {
      method: 'POST',
      body: JSON.stringify(beerToAdd),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
      console.log(response);
    })
  }

  onRowSelect({_id}, isSelected) {
    if(isSelected) {
      this.setState({selected: [...this.state.selected, _id]})
    } else {
      this.setState({selected: this.state.selected.filter(beerId => beerId !== _id)})
    }
  }

  chosenRequest(chosen, index) {
    this.setState({
      chosenBar: chosen._id,
      selected: chosen.beers_on_tap
    });
  }

  chosenRequestBrewery(chosen, index) {
    this.setState({chosenBrewery: chosen._id})
  }

  handleStyleChange = (event) => {
    this.setState({
      beer_style: event.target.value,
    });
  };

  handleBeerNameChange = (event) => {
    this.setState({
      beer_name: event.target.value,
    });
  };

  render(){

    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: this.onRowSelect,
      selected: this.state.selected
    }

    return(
      <div>
        <Tabs>
          <Tab label="Update a Tap List" style={styles.tabStyle}>
            <div className="beer-input">
              <h2 style={styles.headline}>Update a Tap List</h2>
              <AutoComplete
                hintText="Select Bar"
                dataSource={this.state.dataSource}
                dataSourceConfig={dataSourceConfig}
                style={styles.autocomplete}
                inputStyle={styles.textFieldStyle}
                hintStyle={styles.hintStyle}
                onNewRequest={this.chosenRequest}
              />
              <BootstrapTable
                data={this.state.beers}
                selectRow={ selectRowProp }
                bodyStyle={ { background: 'white' } }
                headerStyle={ { background: 'white' } }
                tableStyle={ { width: '80%', margin: '0 auto', marginTop: '25px', border: '5px solid grey' } }
                striped hover>
                  <TableHeaderColumn isKey dataField='_id' hidden={true}>ID</TableHeaderColumn>
                  <TableHeaderColumn dataField='name' filter={ { type: 'TextFilter', delay: 1000 } }>Beer Name</TableHeaderColumn>
              </BootstrapTable>
              <RaisedButton
                label="Submit"
                backgroundColor={red600}
                style={styles.raisedButton}
                onClick={this.onSubmit}
              />
            </div>
          </Tab>
          <Tab label="Add New Beer/Brewery" style={styles.tabStyle}>
            <div>
              <div className="beer-input">
                <h2 style={styles.headline}>Add New Beer/Brewery</h2>
                <AutoComplete
                  hintText="Select Brewery"
                  dataSource={this.state.dataSourceBrewery}
                  dataSourceConfig={dataSourceConfigBrewery}
                  style={styles.autocomplete}
                  inputStyle={styles.textFieldStyle}
                  hintStyle={styles.hintStyle}
                  onNewRequest={this.chosenRequestBrewery}
                />
                <TextField
                  id="text-field-controlled"
                  onChange={this.handleBeerNameChange}
                />
                <TextField
                  id="text-field-controlled"
                  onChange={this.handleStyleChange}
                />
                <RaisedButton
                  label="Submit"
                  backgroundColor={red600}
                  style={styles.raisedButton}
                  onClick={this.onBeerSubmit}
                />
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default TapListEntry
