const fs = require('fs');
const mqtt = require('mqtt');
const dayjs = require('dayjs');

const client = mqtt.connect('mqtt://192.168.178.3');

client.on('connect', function () {
  client.subscribe('#', function (err) {
    if (err) console.log(err);
  });
});

client.on('message', function (topic, message, packet) {
  if (packet.retain === false) {
    const msg = `${dayjs().format('YY-MM-DD HH:mm:ss')} | ${topic.toString()} | ${message.toString()}`;
    fs.appendFileSync('db.txt', msg + '\n');
  }
});
