import { Component } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
    constructor(props) {
        super(props);

        Chart.register(...registerables)

        this.data = {
            labels: [ '2022/04', '2022/05', '2022/06', '2022/07', '2022/08' ],
            datasets: {
                label: '',
                data: [60, 100, 50, 40, 20],
                borderColor: 'rgb(75, 192, 192)'
            }
        };

        this.options = {
            maintainAspectRatio: false,
            responsive: true
        };

        this.height = 300;
        this.width = 400;

    }

    render() {
        return (
            <Line height={this.height} width={this.width} data={this.data} options={this.options} />
        );
    }
}

export default LineChart;