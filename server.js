const net = require('net');
const fs = require('fs');

const server = net.createServer();

server.listen(3000, () => {
    console.log("Server listening on port 3000!");
});

server.on("connection", (client) => {
    console.log("New client connected!");
    client.write("Hello there!");
    client.setEncoding("utf8");
    client.on("data", (data) => {
        const args = data.split(' ');
        console.log('client says: ' + args);

        //we might support other methods here
        //args expected [get:,filename]
        let filepath = './files/';
        let validCommand = false;
        switch (args[0]) {
            case 'get:':
                filepath += args[1];
                validCommand = true;
                break;
        }

        if (validCommand) {
            fs.readFile(filepath, (err, data) => {
                if (err) {
                    console.log('error?: ', err);

                    client.write(`Error reading ${args[1]}`)
                } else {
                    client.write(data);
                }
            });
        }

    });
});

