import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Tabs, Tab} from 'material-ui/Tabs'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
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
  textHintStyle: {
    color: 'white'
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
    this.getBeers();
    this.getBars();
    this.getBreweries();
  }

  constructor(props){
    super(props);

    this.state = {
      beers: [],
      dataSource: [],
      selected: [],
      breweries: [],
      dataSourceBrewery: [],
      open: false,
      noBreweryOpen: false
    };


    //FUNCTION BINDINGS
    this.onSubmit = this.onSubmit.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.chosenRequest = this.chosenRequest.bind(this);
    this.chosenRequestBrewery = this.chosenRequestBrewery.bind(this);
    this.onBeerSubmit = this.onBeerSubmit.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.fetchBars = this.fetchBars.bind(this);
    this.getBars = this.getBars.bind(this);
    this.fetchBreweries = this.fetchBreweries.bind(this);
    this.getBreweries = this.getBreweries.bind(this);
    this.fetchBeers = this.fetchBeers.bind(this);
    this.getBeers = this.getBeers.bind(this);
  }

  fetchBars() {
    return fetch('/bars');
  }
  fetchBreweries() {
    return fetch('/breweries');
  }
  fetchBeers() {
    return fetch('/beers');
  }

  async getBars() {
    const barsResponse = await this.fetchBars();
    const bars = await barsResponse.json();
    this.setState({
      dataSource: bars
    });
  }

  async getBreweries() {
    const breweriesResponse = await this.fetchBreweries();
    const breweries = await breweriesResponse.json();
    this.setState({
      dataSourceBrewery: breweries
    });
  }

  async getBeers() {
    const beerResponse = await this.fetchBeers();
    const beers = await beerResponse.json();
    beers.forEach((beer) => {
      beer.name = `${beer.brewery_name.brewery_name} ${beer.beer_name}`;
    });
    this.setState({beers: beers})
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
    if(this.state.chosenBrewery) {
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
      .then(res => {
        console.log(res.json());
        res.json()
      })
      .then(beer => {
        var brewery = this.state.dataSourceBrewery.filter(brewery => brewery._id === beer.brewery_name);
        var addedBeer = {
          _id: beer._id,
          name: `${brewery[0].brewery_name} ${beer.beer_name}`
        };
        this.setState({
          open: true,
          beer_name: '',
          beer_style: '',
          beers: [...this.state.beers, addedBeer]
        });
      });
    } else {
      this.setState({
        noBreweryOpen: true
      });
    }

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

  handleRequestClose() {
    this.setState({
      open: false,
      noBreweryOpen: false
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
                  value={this.state.chosenBrewery}
                />
                <TextField
                  id="text-field-controlled"
                  hintText="Enter Beer Name"
                  onChange={this.handleBeerNameChange}
                  hintStyle={styles.textHintStyle}
                  value={this.state.beer_name}
                />
                <TextField
                  id="text-field-controlled"
                  hintText="Enter Beer Style"
                  onChange={this.handleStyleChange}
                  hintStyle={styles.textHintStyle}
                  value={this.state.beer_style}
                />
                <RaisedButton
                  label="Submit"
                  backgroundColor={red600}
                  style={styles.raisedButton}
                  onClick={this.onBeerSubmit}
                />
              </div>
              <Snackbar
                open={this.state.open}
                message="Beer added successfully."
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
            <Snackbar
              open={this.state.noBreweryOpen}
              message="You have not selected a brewery."
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose}
            />
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default TapListEntry
