const amqp = require("amqp-connection-manager");

const connection = amqp.connect(["amqp://localhost"]);

connection.on("connect", () => {
  console.log("woah!!! connected");
});

connection.on("disconnect", () => {
  console.log("oops! disconnected");
});

const queue = connection.createChannel({
  json: true,
  setup: function (channel) {
    return channel.assertQueue("Task_Queue", {
      durable: true,
    });
  },
});

var string = "HHH.5";

queue.sendToQueue("Task_Queue", string);
