const express = require('express');
const bodyParser = require('body-parser');
const SerialPort = require('serialport');
const fs = require('fs');
const Tail = require('tail').Tail;

// App setup
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(bodyParser.json());

// Port setup
const serialPort = new SerialPort('/dev/cu.usbmodem1411', {
  baudRate: 9600
});

// File input setup
const tail = new Tail('data.txt');

// Routes
io.on('connection', socket => {
  console.log('user has connected');

  tail.on('line', data => {
    console.log('writing:', data);
    io.emit('data', data);
    serialPort.write(data, err => {
      if (err) {
        return console.log(`Error on write: `, err.message);
      }
      console.log('message written:', data);
    });
  });;

  tail.on('error', error => {
    console.log('ERROR: ', error);
  });

  socket.on('disconnect', () => {
    console.log('user has disconnected');
  });
});



// Server setup
const PORT = process.env.PORT || 5000;
http.listen(PORT, console.log(`Listening on port ${PORT}`));
