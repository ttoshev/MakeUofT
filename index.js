module.exports = function (context, IoTHubMessages) {
    context.log('Node.js queue trigger function processed work item', IoTHubMessages);

    var count = 0;
    var totalTemperature = 0.0;
    var deviceId = "";

    IoTHubMessages.forEach(message => {
        count++;
        totalTemperature += parseFloat(message.Temperature);
        deviceId = message.ObjectName;
    });

    var averageTemperature = parseInt(totalTemperature/count, 10);

    var msg = null;
    if (averageTemperature > 24){
        msg = `WARNING: Vehicle temperature has reached ${averageTemperature} Celsius-CHILD IN DANGER\n\nSent from ${deviceId}`
    }


    context.bindings.message = {};

    if (msg){
        context.bindings.message = {
            body : msg,
            to: "+16477187637"
        };
    }
    context.log('message sent!');

    context.done();
};