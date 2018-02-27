import React, { Component } from 'react';
import './App.css';
import Flat from './components/flat';
import GoogleMapReact from 'google-map-react';
import Marker from './components/marker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      selectedFlat: null,
      search: "",
      flatsToDisplay: []
    };
  }

  componentDidMount() {
    const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        flats: data,
        flatsToDisplay: data
      });
    })
  }

  selectFlat = (flat) => {
    this.setState({
      selectedFlat: flat
    })
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      flatsToDisplay: this.state.flats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))
    });
  }

  render() {
    let center ={
      lat:48.845,
      lng:2.40
    }

    if (this.state.selectedFlat) {
      center = {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng
      }
    }

    return (
      <div className="app">
        <div className="main">
          <div className="search">
            <input
              type="text"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.handleSearch}/>
          </div>
          <div className="flats">
            {this.state.flatsToDisplay.map((flat) => {
              return <Flat
              flat={flat}
              key={flat.name}
              selectFlat={this.selectFlat}/>
            })}
          </div>
        </div>
        <div className="map">
          <GoogleMapReact
          center={center}
          zoom={14}
          >
          {this.state.flatsToDisplay.map((flat => {
            return <Marker
              lat={flat.lat}
              lng={flat.lng}
              key={flat.name}
              text={flat.price}
              selected={flat === this.state.selectedFlat}>
              </Marker>
          }))}

          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
