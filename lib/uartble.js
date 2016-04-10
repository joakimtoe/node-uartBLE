var NobleDevice = require('noble-device');

var UART_BLE_SERVICE_UUID = '6e400001b5a3f393e0a9e50e24dcca9e';
var UART_BLE_TX_CHAR_UUID = '6e400002b5a3f393e0a9e50e24dcca9e';
var UART_BLE_RX_CHAR_UUID = '6e400003b5a3f393e0a9e50e24dcca9e';

var UartBLE = function(peripheral) {
  NobleDevice.call(this, peripheral);

  this.onDataRecvBinded = this.onDataRecv.bind(this);
};

UartBLE.SCAN_UUIDS = [UART_BLE_SERVICE_UUID];

NobleDevice.Util.inherits(UartBLE, NobleDevice);

UartBLE.prototype.onDataRecv = function(data) {
  this.emit('dataRecvd', data);
};

UartBLE.prototype.start = function(error) {
  this.notifyCharacteristic(UART_BLE_SERVICE_UUID, UART_BLE_RX_CHAR_UUID, true, this.onDataRecvBinded, error);
};

UartBLE.prototype.stop = function(error) {
  this.notifyCharacteristic(UART_BLE_SERVICE_UUID, UART_BLE_RX_CHAR_UUID, false, this.onDataRecvBinded, error);
};

UartBLE.prototype.send = function(data, done) {
  this.writeDataCharacteristic(UART_BLE_SERVICE_UUID, UART_BLE_TX_CHAR_UUID, data, done);
};

module.exports = UartBLE;
