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

    constructor(props) {
        super(props);
        this.monthSample    = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        var getmonth = new Date().getMonth();
        this.months = [];
        for(var i= getmonth+1, conta=0; conta<12; i++, conta++ ){
            this.months.push(this.monthSample[i]);
            if(i==11)i=-1;
        }
        this.state = {
            inicio: new Date(new Date().getFullYear(), 0, 1),
            fin: new Date((new Date(new Date().getFullYear(), (new Date().getMonth()+1), 1))),
            inicio2: new Date(new Date().getFullYear(), 0, 1),
            fin2: new Date((new Date(new Date().getFullYear(), (new Date().getMonth()+1), 1))),
            dato: [],
            dato2: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        //var test = new Date((new Date(new Date().getFullYear(), (new Date().getMonth()+1), 1)));

        //var test2= new Date(new Date(test.setMonth(num+1))-1);
        //console.log("test1:"+test+" test2: "+test2+" num: "+num);

        var num = ((this.state[name].getMonth()-1)+(this.months.indexOf(target.value)-this.months.indexOf(this.monthSample[this.state[name].getMonth()-1])));
        if(name.toString().startsWith("inicio")){
            var value = new Date(this.state[name].setMonth(this.state[name].getMonth()+(this.months.indexOf(target.value)-this.months.indexOf(this.monthSample[this.state[name].getMonth()]))));
            console.log("inicio1: "+this.state.inicio+" inicio2: "+this.state.inicio2+" val: "+value);
        }else{
            var value = new Date(new Date(this.state[name].setMonth(num+1))-1);
            console.log("fin1: "+this.state.fin+" fin2: "+this.state.fin2+"val: "+value);
        }
        if((name === "inicio" && this.months.indexOf(this.monthSample[value.getMonth()])<=this.months.indexOf(this.monthSample[this.state.fin.getMonth()]))
            || (name === "fin" && this.months.indexOf(this.monthSample[value.getMonth()])>=this.months.indexOf(this.monthSample[this.state.inicio.getMonth()]))){
                this.setState({
                    [name]: value
                });
                console.log("palmando: "+this.state.fin);
                this.dineroGastado();
        }else if((name === "inicio2" && this.months.indexOf(this.monthSample[value.getMonth()])<=this.months.indexOf(this.monthSample[this.state.fin2.getMonth()]))
                || (name === "fin2" && this.months.indexOf(this.monthSample[value.getMonth()])>=this.months.indexOf(this.monthSample[this.state.inicio2.getMonth()]))){
                this.setState({
                    [name]: value
                });
                this.productoMasComprado();
        }
    }

    dineroGastado(){
        axios.get('http://localhost:3000/user_spent_money?inicio="'+this.state.inicio.getFullYear()+'-'+(this.state.inicio.getMonth()+1)+'-'+this.state.inicio.getDate()+'"&fin="'+this.state.fin.getFullYear()+'-'+(this.state.fin.getMonth()+1)+'-'+this.state.fin.getDate()+'"&user_id=19')
            .then(
                res=>{
                    this.setState({
                        dato: res.data,
                        loading: false
                    });
                    // Themes begin
                    am4core.useTheme(am4themes_animated);
                    // Themes end

                    // Create chart1 instance
                    let chart = am4core.create("chartdiv", am4charts.XYChart);
                    chart.scrollbarX = new am4core.Scrollbar();

                    // Add data
                    chart.data = this.state.dato;

                    // Create axes
                    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "mes";
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
                    series.dataFields.valueY = "valor";
                    series.dataFields.categoryX = "mes";
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
                }
            )
            .catch(

            )
    }

    productoMasComprado(){
        axios.get('http://localhost:3000/most_sold_product?inicio="'+this.state.inicio2.getFullYear()+'-'+(this.state.inicio2.getMonth()+1)+'-'+this.state.inicio2.getDate()+'"&fin="'+this.state.fin2.getFullYear()+'-'+(this.state.fin2.getMonth()+1)+'-'+this.state.fin2.getDate()+'"&user_id=19')
            .then(
                res=>{
                    this.setState({
                        dato2: res.data,
                        loading: false
                    });
                    // Create chart2 instance
                    let chart2 = am4core.create("chartdiv2", am4charts.XYChart);
                    chart2.scrollbarX = new am4core.Scrollbar();

                    // Add data
                    chart2.data = this.state.dato2;

                    // Create axes
                    let categoryAxis2 = chart2.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis2.dataFields.category = "mes";
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
                    series2.dataFields.valueY = "ventas[1]";
                    series2.dataFields.categoryX = "mes";
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
                }
            )
            .catch(

            )
    }

    componentDidMount(){
        this.dineroGastado();
        this.productoMasComprado();
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
                                        <select className="form-control" name="inicio" value={this.monthSample[this.state.inicio.getMonth()]} onChange={this.handleChange}>
                                            <option>{this.months[0]}</option>
                                            <option>{this.months[1]}</option>
                                            <option>{this.months[2]}</option>
                                            <option>{this.months[3]}</option>
                                            <option>{this.months[4]}</option>
                                            <option>{this.months[5]}</option>
                                            <option>{this.months[6]}</option>
                                            <option>{this.months[7]}</option>
                                            <option>{this.months[8]}</option>
                                            <option>{this.months[9]}</option>
                                            <option>{this.months[10]}</option>
                                            <option>{this.months[11]}</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col md={7} lg={5} xl={2}>hasta:</Col>
                                <Col xs={8} sm={7} md={5} xl={3}>
                                    <div className="form-group">
                                        <select className="form-control" name="fin" value={this.monthSample[this.state.fin.getMonth()-1]} onChange={this.handleChange}>
                                            <option>{this.months[0]}</option>
                                            <option>{this.months[1]}</option>
                                            <option>{this.months[2]}</option>
                                            <option>{this.months[3]}</option>
                                            <option>{this.months[4]}</option>
                                            <option>{this.months[5]}</option>
                                            <option>{this.months[6]}</option>
                                            <option>{this.months[7]}</option>
                                            <option>{this.months[8]}</option>
                                            <option>{this.months[9]}</option>
                                            <option>{this.months[10]}</option>
                                            <option>{this.months[11]}</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={8} sm={7} md={7} lg={5} xl={4}>Productos mas comprado desde:</Col>
                                <Col xs={8} sm={7} md={5} xl={3}>
                                    <div className="form-group">
                                        <select className="form-control" name="inicio2" value={this.monthSample[this.state.inicio2.getMonth()]} onChange={this.handleChange}>
                                            <option>{this.months[0]}</option>
                                            <option>{this.months[1]}</option>
                                            <option>{this.months[2]}</option>
                                            <option>{this.months[3]}</option>
                                            <option>{this.months[4]}</option>
                                            <option>{this.months[5]}</option>
                                            <option>{this.months[6]}</option>
                                            <option>{this.months[7]}</option>
                                            <option>{this.months[8]}</option>
                                            <option>{this.months[9]}</option>
                                            <option>{this.months[10]}</option>
                                            <option>{this.months[11]}</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col md={7} lg={5} xl={2}>hasta:</Col>
                                <Col xs={8} sm={7} md={5} xl={3}>
                                    <div className="form-group">
                                        <select className="form-control" name="fin2" value={this.monthSample[this.state.fin2.getMonth()-1]} onChange={this.handleChange}>
                                            <option>{this.months[0]}</option>
                                            <option>{this.months[1]}</option>
                                            <option>{this.months[2]}</option>
                                            <option>{this.months[3]}</option>
                                            <option>{this.months[4]}</option>
                                            <option>{this.months[5]}</option>
                                            <option>{this.months[6]}</option>
                                            <option>{this.months[7]}</option>
                                            <option>{this.months[8]}</option>
                                            <option>{this.months[9]}</option>
                                            <option>{this.months[10]}</option>
                                            <option>{this.months[11]}</option>
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