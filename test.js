var UartBLE = require('./index');

console.log('Test running!');

function onUartBLEData(data) {
    console.log('dataRecvd: ' + data)
}

function onDiscover(UartBLE) {
  console.log('Discovered: ' + UartBLE);

  UartBLE.on('disconnect', function() {
    console.log('Disconnected!');
  });

  UartBLE.connectAndSetUp(function(error) {
    console.log('Connected! ' + error);
    UartBLE.on('dataRecvd', onUartBLEData);
    UartBLE.start(function(error) {
      console.log('Started! ' + error);
    });

    UartBLE.send(new Buffer('Hei på deg verden!'), function(){
      console.log('Sent!');
    });
  });
}

UartBLE.discover(onDiscover);
