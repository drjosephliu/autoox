import React, { Component } from 'react';
import Highcharts from 'highcharts';
import { HighchartsChart, withHighcharts, XAxis, YAxis, LineSeries } from 'react-jsx-highcharts';
import io from 'socket.io-client';

class App extends Component {
  constructor() {
    super();

    this.state = {
      endpoint: "http://localhost:5000",
      pulseOx: [],
      color: '#afd4ff'
    };

    this.createConnection();
  }

  createConnection = () => {
    this.socket = io(this.state.endpoint);

    this.socket.on('data', data => {
      data = parseInt(data.slice(0, -1));
      this.addData(data);
    });
  }

  addData = data => {
    let newPulseOx = this.state.pulseOx.concat(data);

    if (this.state.pulseOx.length > 30) {
      newPulseOx = newPulseOx.slice(-30);
    }

    this.setState({ pulseOx: newPulseOx });
    this.changeBackgroundColor();
  }

  changeBackgroundColor = () => {
    const { pulseOx } = this.state;

    if (pulseOx[pulseOx.length-1] < 88 || pulseOx[pulseOx.length-1] > 92) {
      this.setState({ color: '#da3749'});
    } else {
      this.setState({ color: '#afd4ff' });
    }
  }

  render() {
    const { pulseOx, color } = this.state;
    console.log(pulseOx);


    return (
      <div style={{ textAlign: 'center', background: color, height: '800px' }}>
        <h1 style={{ marginTop: '10px', fontSize: '80px', color: '#fff' }}>AutoOx: {pulseOx.length === 0 ? 0 : pulseOx[pulseOx.length-1]}%</h1>
        <div style={config}>
          <HighchartsChart>
            <XAxis type="datetime">
              <XAxis.Title>Time</XAxis.Title>
            </XAxis>

            <YAxis>
              <YAxis.Title>Oxygen Saturation</YAxis.Title>
              <LineSeries data={pulseOx} />
            </YAxis>
          </HighchartsChart>
        </div>
      </div>
    );
  }
}

const config = {
  border: '2px solid #afaeaf',
  boxShadow: '0px 5px 20px 0px #868387',
  margin: '30px',
};

export default withHighcharts(App, Highcharts);
