import React, {Component} from 'react';
import {getJWT} from "../Helpers/JWT";
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import 'bulma/css/bulma.css';
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import User from "./User";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
class Summary extends Component{
    componentDidMount(){
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart1 instance
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.scrollbarX = new am4core.Scrollbar();

        // Add data
        chart.data =[{
            "country": "USA",
            "visits": 3025
        }, {
            "country": "China",
            "visits": 1882
        }, {
            "country": "Japan",
            "visits": 1809
        }, {
            "country": "Germany",
            "visits": 1322
        }, {
            "country": "UK",
            "visits": 1122
        }, {
            "country": "France",
            "visits": 1114
        }, {
            "country": "India",
            "visits": 984
        }, {
            "country": "Spain",
            "visits": 711
        }, {
            "country": "Netherlands",
            "visits": 665
        }, {
            "country": "Russia",
            "visits": 580
        }, {
            "country": "South Korea",
            "visits": 443
        }, {
            "country": "Canada",
            "visits": 441
        }];

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minHeight = 110;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minWidth = 50;

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.sequencedInterpolation = true;
        series.dataFields.valueY = "visits";
        series.dataFields.categoryX = "country";
        series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
        series.columns.template.strokeWidth = 0;

        series.tooltip.pointerOrientation = "vertical";

        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.fillOpacity = 0.8;

        // on hover, make corner radiuses bigger
        let hoverState = series.columns.template.column.states.create("hover");
        hoverState.properties.cornerRadiusTopLeft = 0;
        hoverState.properties.cornerRadiusTopRight = 0;
        hoverState.properties.fillOpacity = 1;

        series.columns.template.adapter.add("fill", function(fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });

        // Cursor
        chart.cursor = new am4charts.XYCursor();

        ////////////////////////////CHART2////////////////////////
        // Create chart1 instance
        let chart2 = am4core.create("chartdiv2", am4charts.XYChart);
        chart2.scrollbarX = new am4core.Scrollbar();

        // Add data
        chart2.data =[{
            "country": "USA",
            "visits": 3025
        }, {
            "country": "China",
            "visits": 1882
        }, {
            "country": "Japan",
            "visits": 1809
        }, {
            "country": "Germany",
            "visits": 1322
        }, {
            "country": "UK",
            "visits": 1122
        }, {
            "country": "France",
            "visits": 1114
        }, {
            "country": "India",
            "visits": 984
        }, {
            "country": "Spain",
            "visits": 711
        }, {
            "country": "Netherlands",
            "visits": 665
        }, {
            "country": "Russia",
            "visits": 580
        }, {
            "country": "South Korea",
            "visits": 443
        }, {
            "country": "Canada",
            "visits": 441
        }];

        // Create axes
        let categoryAxis2 = chart2.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis2.dataFields.category = "country";
        categoryAxis2.renderer.grid.template.location = 0;
        categoryAxis2.renderer.minGridDistance = 30;
        categoryAxis2.renderer.labels.template.horizontalCenter = "right";
        categoryAxis2.renderer.labels.template.verticalCenter = "middle";
        categoryAxis2.renderer.labels.template.rotation = 270;
        categoryAxis2.tooltip.disabled = true;
        categoryAxis2.renderer.minHeight = 110;

        let valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
        valueAxis2.renderer.minWidth = 50;

        // Create series
        let series2 = chart2.series.push(new am4charts.ColumnSeries());
        series2.sequencedInterpolation = true;
        series2.dataFields.valueY = "visits";
        series2.dataFields.categoryX = "country";
        series2.tooltipText = "[{categoryX}: bold]{valueY}[/]";
        series2.columns.template.strokeWidth = 0;

        series2.tooltip.pointerOrientation = "vertical";

        series2.columns.template.column.cornerRadiusTopLeft = 10;
        series2.columns.template.column.cornerRadiusTopRight = 10;
        series2.columns.template.column.fillOpacity = 0.8;

        // on hover, make corner radiuses bigger
        let hoverState2 = series2.columns.template.column.states.create("hover");
        hoverState2.properties.cornerRadiusTopLeft = 0;
        hoverState2.properties.cornerRadiusTopRight = 0;
        hoverState2.properties.fillOpacity = 1;

        series2.columns.template.adapter.add("fill", function(fill, target) {
            return chart2.colors.getIndex(target.dataItem.index);
        });

        // Cursor
        chart2.cursor = new am4charts.XYCursor();

        ////////////////////////////CHART3////////////////////////
        // Create chart1 instance
        let chart3 = am4core.create("chartdiv3", am4charts.XYChart);
        chart3.scrollbarX = new am4core.Scrollbar();

        // Add data
        chart3.data =[{
            "country": "USA",
            "visits": 3025
        }, {
            "country": "China",
            "visits": 1882
        }, {
            "country": "Japan",
            "visits": 1809
        }, {
            "country": "Germany",
            "visits": 1322
        }, {
            "country": "UK",
            "visits": 1122
        }, {
            "country": "France",
            "visits": 1114
        }, {
            "country": "India",
            "visits": 984
        }, {
            "country": "Spain",
            "visits": 711
        }, {
            "country": "Netherlands",
            "visits": 665
        }, {
            "country": "Russia",
            "visits": 580
        }, {
            "country": "South Korea",
            "visits": 443
        }, {
            "country": "Canada",
            "visits": 441
        }];

        // Create axes
        let categoryAxis3 = chart3.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis3.dataFields.category = "country";
        categoryAxis3.renderer.grid.template.location = 0;
        categoryAxis3.renderer.minGridDistance = 30;
        categoryAxis3.renderer.labels.template.horizontalCenter = "right";
        categoryAxis3.renderer.labels.template.verticalCenter = "middle";
        categoryAxis3.renderer.labels.template.rotation = 270;
        categoryAxis3.tooltip.disabled = true;
        categoryAxis3.renderer.minHeight = 110;

        let valueAxis3 = chart3.yAxes.push(new am4charts.ValueAxis());
        valueAxis3.renderer.minWidth = 50;

        // Create series
        let series3 = chart3.series.push(new am4charts.ColumnSeries());
        series3.sequencedInterpolation = true;
        series3.dataFields.valueY = "visits";
        series3.dataFields.categoryX = "country";
        series3.tooltipText = "[{categoryX}: bold]{valueY}[/]";
        series3.columns.template.strokeWidth = 0;

        series3.tooltip.pointerOrientation = "vertical";

        series3.columns.template.column.cornerRadiusTopLeft = 10;
        series3.columns.template.column.cornerRadiusTopRight = 10;
        series3.columns.template.column.fillOpacity = 0.8;

        // on hover, make corner radiuses bigger
        let hoverState3 = series3.columns.template.column.states.create("hover");
        hoverState3.properties.cornerRadiusTopLeft = 0;
        hoverState3.properties.cornerRadiusTopRight = 0;
        hoverState3.properties.fillOpacity = 1;

        series3.columns.template.adapter.add("fill", function(fill, target) {
            return chart3.colors.getIndex(target.dataItem.index);
        });

        // Cursor
        chart3.cursor = new am4charts.XYCursor();
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <h1>Resumen</h1>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col xs={8} sm={7} md={7} lg={5} xl={4}>Dinero gastado desde:</Col>
                                <Col xs={8} sm={7} md={5} xl={3}>
                                    <div className="form-group">
                                        <select className="form-control" id="exampleFormControlSelect1">
                                            <option>Enero</option>
                                            <option>Febrero</option>
                                            <option>Marzo</option>
                                            <option>Abril</option>
                                            <option>Mayo</option>
                                            <option>Junio</option>
                                            <option>Julio</option>
                                            <option>Agosto</option>
                                            <option>Septiembre</option>
                                            <option>Octubre</option>
                                            <option>Noviembre</option>
                                            <option>Diciembre</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col md={7} lg={5} xl={2}>hasta:</Col>
                                <Col xs={8} sm={7} md={5} xl={3}>
                                    <div className="form-group">
                                        <select className="form-control" id="exampleFormControlSelect1">
                                            <option>Enero</option>
                                            <option>Febrero</option>
                                            <option>Marzo</option>
                                            <option>Abril</option>
                                            <option>Mayo</option>
                                            <option>Junio</option>
                                            <option>Julio</option>
                                            <option>Agosto</option>
                                            <option>Septiembre</option>
                                            <option>Octubre</option>
                                            <option>Noviembre</option>
                                            <option>Diciembre</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col>Productos mas comprados durante:</Col>
                                <Col>
                                    <div className="form-group">
                                        <select className="form-control" id="exampleFormControlSelect1">
                                            <option>Enero</option>
                                            <option>Febrero</option>
                                            <option>Marzo</option>
                                            <option>Abril</option>
                                            <option>Mayo</option>
                                            <option>Junio</option>
                                            <option>Julio</option>
                                            <option>Agosto</option>
                                            <option>Septiembre</option>
                                            <option>Octubre</option>
                                            <option>Noviembre</option>
                                            <option>Diciembre</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
                        </Col>
                        <Col>
                            <div id="chartdiv2" style={{ width: "100%", height: "500px" }}></div>
                        </Col>
                    </Row>
                <Row>
                    <Col className="text-center">
                        <Button href="#">Exportar como PDF</Button>
                    </Col>
                    <Col className="text-center">
                        <Button href="#">Exportar como PDF</Button>
                    </Col>
                </Row>
                &nbsp;
                <Row>
                    <Col xs={8} sm={7} md={7} lg={5} xl={4}>Numero de pedidos realizados desde:</Col>
                    <Col xs={8} sm={7} md={5} xl={3}>
                        <div className="form-group">
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>Enero</option>
                                <option>Febrero</option>
                                <option>Marzo</option>
                                <option>Abril</option>
                                <option>Mayo</option>
                                <option>Junio</option>
                                <option>Julio</option>
                                <option>Agosto</option>
                                <option>Septiembre</option>
                                <option>Octubre</option>
                                <option>Noviembre</option>
                                <option>Diciembre</option>
                            </select>
                        </div>
                    </Col>
                    <Col md={7} lg={5} xl={2}>hasta:</Col>
                    <Col xs={8} sm={7} md={5} xl={3}>
                        <div className="form-group">
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>Enero</option>
                                <option>Febrero</option>
                                <option>Marzo</option>
                                <option>Abril</option>
                                <option>Mayo</option>
                                <option>Junio</option>
                                <option>Julio</option>
                                <option>Agosto</option>
                                <option>Septiembre</option>
                                <option>Octubre</option>
                                <option>Noviembre</option>
                                <option>Diciembre</option>
                            </select>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div id="chartdiv3" style={{ width: "100%", height: "500px" }}></div>
                </Row>
                <Row>
                    <Col className="text-center">
                        <Button href="#">Exportar como PDF</Button>
                    </Col>
                </Row>
                </Container>
            </div>
        )
    }
}

export default Summary;