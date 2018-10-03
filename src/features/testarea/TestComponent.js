import React, { Component } from 'react';
import { connect } from 'react-redux';
import {incrementAsync, decrementAsync} from './testActions';
import { Button, Icon } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import GoogleMapReact from 'google-map-react';
import { openModal } from '../modals/modalActions'


const mapStateToProps = (state) => ({
  data: state.test.data,
  loading: state.test.loading
})

const mapDispatchToProps = {
  incrementAsync,
  decrementAsync,
  openModal
}

// const Marker = () => <Icon name="marker" size="big" color="red"/>

class TestComponent extends Component {
  static defaultProps = {
   center: {
     lat: 59.95,
     lng: 30.33
   },
   zoom: 11
 };

  state = {
    address: '',
    scriptLoaded: false,
  }

  handleScriptLoad = () => {
    this.setState({
      scriptLoaded: true,
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  onChange=(address)=> {
    this.setState({
      address: address
    })
  }

  render() {
    const inputProps = {
    value: this.state.address,
    onChange: this.onChange,
  }
    return(
      <div>
        <Script
           url='https://maps.googleapis.com/maps/api/js?key=AIzaSyCYWAssBGwmlkXP6332klYS_-HLk_QtQlo&libraries=places'
           onLoad={this.handleScriptLoad}
         />
        <h1>Test Area!</h1>
        <h3>The data is: {this.props.data}</h3>
        <Button loading={this.props.loading} onClick={this.props.incrementAsync} color='green' content="UP!!!"/>
        <Button loading={this.props.loading} onClick={this.props.decrementAsync} color='red' content="DOWN!!!"/>
        <Button onClick={() => this.props.openModal('TestModal', {data: 43})} color='teal' content="OPEN MODAL!!!"/>
        <br></br>
        <br></br>
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded &&
            <PlacesAutocomplete inputProps={inputProps} />}

        <button type="submit">Submit</button>
      </form>

      {/* // Important! Always set the container height explicitly */}
      {/* <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCYWAssBGwmlkXP6332klYS_-HLk_QtQlo'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div> */}

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
