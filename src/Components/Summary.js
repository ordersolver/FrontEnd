import React, {Component} from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import 'bulma/css/bulma.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {connect} from "react-redux";

class Summary extends Component{

    constructor(props) {
        super(props);
        this.monthSample    = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        var getmonth = new Date().getMonth();
        this.months = [];
        for(var i= getmonth+1, conta=0; conta<12; i++, conta++ ){
            this.months.push(this.monthSample[i]);
            if(i===11)i=-1;
        }
        this.state = {
            inicio: new Date(new Date().getFullYear(), 0, 1),
            inicio2: new Date(new Date().getFullYear(), 0, 1),
            inicio3: new Date(new Date().getFullYear(), 0, 1),
            fin: new Date((new Date(new Date().getFullYear(), (new Date().getMonth()+1), 1))),
            fin2: new Date((new Date(new Date().getFullYear(), (new Date().getMonth()+1), 1))),
            fin3: new Date((new Date(new Date().getFullYear(), (new Date().getMonth()+1), 1))),
            finaux: new Date((new Date(new Date().getFullYear(), (new Date().getMonth()+1), 1))-1),
            finaux2: new Date((new Date(new Date().getFullYear(), (new Date().getMonth()+1), 1))-1),
            finaux3: new Date((new Date(new Date().getFullYear(), (new Date().getMonth()+1), 1))-1),
            dato: [],
            dato2: [],
            dato3: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        var num = ((this.state[name].getMonth()-1)+(this.months.indexOf(target.value)-this.months.indexOf(this.monthSample[this.state[name].getMonth()-1])));
        var copyname = new Date(this.state[name]);
        var value;
        if(name.toString().startsWith("inicio")){
            value = new Date(copyname.setMonth(this.state[name].getMonth()+(this.months.indexOf(target.value)-this.months.indexOf(this.monthSample[this.state[name].getMonth()]))));
        }else{
            value = new Date(new Date(copyname.setMonth(num+1)));
            var value2 = new Date(value-1);
        }
        if(name === "inicio" && this.months.indexOf(this.monthSample[value.getMonth()])<=this.months.indexOf(this.monthSample[this.state.fin.getMonth()-1])){
            this.setState({[name]:value}, function () {
                this.dineroGastado();
            });
        }else if(name === "fin" && this.months.indexOf(this.monthSample[value2.getMonth()])>=this.months.indexOf(this.monthSample[this.state.inicio.getMonth()])){
            this.setState({[name]:value,finaux:value2}, function () {
                this.dineroGastado();
            });
        }else if(name === "inicio2" && this.months.indexOf(this.monthSample[value.getMonth()])<=this.months.indexOf(this.monthSample[this.state.fin2.getMonth()-1])){
            this.setState({[name]:value}, function () {
                this.productoMasComprado();
            });
        }else if(name === "fin2" && this.months.indexOf(this.monthSample[value2.getMonth()])>=this.months.indexOf(this.monthSample[this.state.inicio2.getMonth()])){
            this.setState({[name]:value,finaux2:value2}, function () {
                this.productoMasComprado();
            });
        }
        else if(name === "inicio3" && this.months.indexOf(this.monthSample[value.getMonth()])<=this.months.indexOf(this.monthSample[this.state.fin3.getMonth()-1])){
            this.setState({[name]:value}, function () {
                this.pedidosRealizados();
            });
        }else if(name === "fin3" && this.months.indexOf(this.monthSample[value2.getMonth()])>=this.months.indexOf(this.monthSample[this.state.inicio3.getMonth()])){
            this.setState({[name]:value,finaux3:value2}, function () {
                this.pedidosRealizados();
            });
        }
    }

    dineroGastado(){
        //axios.get('http://localhost:3000/user_spent_money?inicio="'+this.state.inicio.getFullYear()+'-'+(this.state.inicio.getMonth()+1)+'-'+this.state.inicio.getDate()+'"&fin="'+this.state.finaux.getFullYear()+'-'+(this.state.finaux.getMonth()+1)+'-'+this.state.finaux.getDate()+'"&user_id=19')
        axios.get('http://ordersolverdevelop.herokuapp.com/user_spent_money?inicio="'+this.state.inicio.getFullYear()+'-'+(this.state.inicio.getMonth()+1)+'-'+this.state.inicio.getDate()+'"&fin="'+this.state.finaux.getFullYear()+'-'+(this.state.finaux.getMonth()+1)+'-'+this.state.finaux.getDate()+'"&user_id='+this.props.user.id)
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
                    valueAxis.min = 0;
                    valueAxis.strictMinMax = true;

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
        //axios.get('http://localhost:3000/user_most_sold?inicio="'+this.state.inicio2.getFullYear()+'-'+(this.state.inicio2.getMonth()+1)+'-'+this.state.inicio2.getDate()+'"&fin="'+this.state.finaux2.getFullYear()+'-'+(this.state.finaux2.getMonth()+1)+'-'+this.state.finaux2.getDate()+'"&user_id=19')
        axios.get('http://ordersolverdevelop.herokuapp.com/user_most_sold?inicio="'+this.state.inicio2.getFullYear()+'-'+(this.state.inicio2.getMonth()+1)+'-'+this.state.inicio2.getDate()+'"&fin="'+this.state.finaux2.getFullYear()+'-'+(this.state.finaux2.getMonth()+1)+'-'+this.state.finaux2.getDate()+'"&user_id='+this.props.user.id)
            .then(
                res=>{
                    this.setState({
                        dato2: res.data,
                        loading: false
                    });
                    var dato2refactor = [];
                    for(var i=0;i<this.state.dato2.length;i++){
                        if(this.state.dato2[i].ventas!=null){
                            dato2refactor.push({mes:this.state.dato2[i].mes,valor:this.state.dato2[i].ventas[1],producto:this.state.dato2[i].ventas[0]})
                        }else{
                            dato2refactor.push({mes:this.state.dato2[i].mes,valor:0,producto:null})
                        }

                    }
                    // Create chart2 instance
                    let chart2 = am4core.create("chartdiv2", am4charts.XYChart);
                    chart2.scrollbarX = new am4core.Scrollbar();

                    // Add data
                    chart2.data = dato2refactor;

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
                    valueAxis2.min = 0;
                    valueAxis2.strictMinMax = true;

                    // Create series
                    let series2 = chart2.series.push(new am4charts.ColumnSeries());
                    series2.sequencedInterpolation = true;
                    series2.dataFields.valueY = "valor";
                    series2.dataFields.categoryX = "mes";
                    series2.dataFields.categoryZ = "producto";
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

                    //label
                    let bullet = series2.bullets.push(new am4charts.LabelBullet());
                    bullet.label.text = "{producto}";
                    bullet.label.rotation = 270;
                    bullet.label.truncate = false;
                    bullet.label.horizontalCenter = "left";
                    bullet.locationY = 1;
                    bullet.dy = -5;
                }
            )
            .catch(

            )
    }

    pedidosRealizados(){
        //axios.get('http://localhost:3000/user_total_orders?inicio="'+this.state.inicio3.getFullYear()+'-'+(this.state.inicio3.getMonth()+1)+'-'+this.state.inicio3.getDate()+'"&fin="'+this.state.finaux3.getFullYear()+'-'+(this.state.finaux3.getMonth()+1)+'-'+this.state.finaux3.getDate()+'"&user_id=19')
        axios.get('http://ordersolverdevelop.herokuapp.com/user_total_orders?inicio="'+this.state.inicio3.getFullYear()+'-'+(this.state.inicio3.getMonth()+1)+'-'+this.state.inicio3.getDate()+'"&fin="'+this.state.finaux3.getFullYear()+'-'+(this.state.finaux3.getMonth()+1)+'-'+this.state.finaux3.getDate()+'"&user_id='+this.props.user.id)
            .then(
                res=>{
                    this.setState({
                        dato3: res.data,
                        loading: false
                    });
                    // Create chart3 instance
                    let chart3 = am4core.create("chartdiv3", am4charts.XYChart);
                    chart3.scrollbarX = new am4core.Scrollbar();

                    // Add data
                    chart3.data = this.state.dato3;

                    // Create axes
                    let categoryAxis3 = chart3.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis3.dataFields.category = "mes";
                    categoryAxis3.renderer.grid.template.location = 0;
                    categoryAxis3.renderer.minGridDistance = 30;
                    categoryAxis3.renderer.labels.template.horizontalCenter = "right";
                    categoryAxis3.renderer.labels.template.verticalCenter = "middle";
                    categoryAxis3.renderer.labels.template.rotation = 270;
                    categoryAxis3.tooltip.disabled = true;
                    categoryAxis3.renderer.minHeight = 110;

                    let valueAxis3 = chart3.yAxes.push(new am4charts.ValueAxis());
                    valueAxis3.renderer.minWidth = 50;
                    valueAxis3.min = 0;
                    valueAxis3.strictMinMax = true;

                    // Create series
                    let series3 = chart3.series.push(new am4charts.ColumnSeries());
                    series3.sequencedInterpolation = true;
                    series3.dataFields.valueY = "compras";
                    series3.dataFields.categoryX = "mes";
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
            )
            .catch(

            )
    }

    componentDidMount(){
        this.dineroGastado();
        this.productoMasComprado();
        this.pedidosRealizados();
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
                                <select className="form-control" name="inicio3" value={this.monthSample[this.state.inicio3.getMonth()]} onChange={this.handleChange}>
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
                                <select className="form-control" name="fin3" value={this.monthSample[this.state.fin3.getMonth()-1]} onChange={this.handleChange}>
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

const mapStateToProps = state =>{
    return{
        user: state.user,
        jwt: state.jwt
    };
};

const mapDispatchToProps = () => {
    return {

    };
};


export default connect(mapStateToProps,mapDispatchToProps) (Summary);