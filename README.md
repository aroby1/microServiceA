CS361_MicroService_A

#About

This microservice allows for account sign up and log in using MongoDB. The data that can be passed in is email and password. It is essential to also include the data type either ‘signup’ or ‘login’. 

#Installation

The microservice relies on these packages:

ZeroMQ: https://zeromq.org/download
MongoDB: https://www.mongodb.com/try
Installation of mongoose

#Implementation

The microservices uses MongoDB to store information into a database.

#Communication Contract

To call this microservice the request and reply should be bound to the same port 5555 using TCP protocol. 

#Example 

Request

```
const socket = new zmq.Request();
await socket.connect('tcp://127.0.0.1:5555');

Reply

```
const socket = new zmq.Reply();
await socket.bind('tcp://127.0.0.1:5555');


Sending a request:

To request information, first you must have a schema you want to represent using a type, email, and password which should all be represented as strings. The schema outline must be created using mongoose to tell mongoDB what variables it should be reading. The schema will then be sent in json format to the microservice through the port 5555 which is done by await socket.send(JSON.stringify(“NAME OF SCHEMA”));. 

const signupData = {
        type: 'signup',
        schemaData: {
            email: 'testuser@example.com',
            password: 'password123'
        }
    };
   
    await socket.send(JSON.stringify(signupData));

MongoDB Schema Representation


const account = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
})


Receiving response:

Once the microservice has parsed the schema sent from the client and determined if the data type is ‘signin’ or ‘login’, the microservice will send a response success message either ‘true’ or ‘false’. To receive the response, you will need to use await socket.receive() which will hold the message given by the microservice. Below is an example of the request and response working together. 

const loginDataSuccess = {
        type: 'login',
        schemaData: {
            email: 'testuser@example.com',
            password: 'password123'
        }
    };


await socket.send(JSON.stringify(loginDataSuccess)); // Send the login request
const [loginResponseSuccess] = await socket.receive(); // Receive the response
console.log("Successful Login Response:",loginResponseSuccess.toString()); //Print the response to the console
