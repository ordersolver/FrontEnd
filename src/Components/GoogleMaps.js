import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";
import {Container, Row,Col} from "react-bootstrap";
import './All.css';

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
        /*const triangleCoords = [
            {lat: 25.774, lng: -80.190},
            {lat: 18.466, lng: -66.118},
            {lat: 32.321, lng: -64.757},
            {lat: 25.774, lng: -80.190}
        ];*/
        const coords = { lat: 4.758376, lng: -74.036279 };
        return (
            <div>
                <Container>
                    <Row >
                        <Col xs={10} md={9}>
                            <Map
                                google={this.props.google}
                                style={{
                                    minWidth: "20vh",
                                    minHeight: "85vh",
                                    width: '100%',
                                    height: '100%',
                                    top: "30%",
                                    right: "50%",
                                    position: "relative"
                                }}
                                initialCenter={coords}
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
                        </Col>
                        <Col xs={10} md={3}>
                            Datos
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyBY3_5_wY0wDdIr5o8g_9yAWn4zF0DrGPU"),
})(GoogleMaps);