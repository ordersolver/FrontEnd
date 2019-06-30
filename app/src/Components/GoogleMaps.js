import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon, Circle } from "google-maps-react";
import {Container, FormControl, FormGroup, Row} from "react-bootstrap";

export class GoogleMaps extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };
    render() {

        if (!this.props.google) {
            return <div>Mmm...</div>;
        }
        const triangleCoords = [
            {lat: 25.774, lng: -80.190},
            {lat: 18.466, lng: -66.118},
            {lat: 32.321, lng: -64.757},
            {lat: 25.774, lng: -80.190}
        ];
        const coords = { lat: 4.758376, lng: -74.036279 };
        return (
            <div>
                <Container>
                    <Row>
                        <Map
                            google={this.props.google}
                            style={{
                                minWidth: "100px",
                                minHeight: "800px",
                                width: '100%',
                                height: '100%',
                                position: 'relative'
                            }}
                            initialCenter={{
                                lat: 4.758376,
                                lng: -74.036279
                            }}
                            zoom={17}
                            onClick={this.onMapClicked}
                        >
                            <Marker
                                onClick={this.onMarkerClick}
                                name={"Casa"}
                            />
                            <Marker
                                name="Parque"
                                onClick={this.onMarkerClick}
                                position={{ lat: 4.758870, lng: -74.036469 }}
                            />
                            <InfoWindow
                                marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}
                            >
                                <div>
                                    <h1>{this.state.selectedPlace.name}</h1>
                                </div>
                            </InfoWindow>
                        </Map>
                    </Row>

                </Container>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: (""),
})(GoogleMaps);