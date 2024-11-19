#Installation

The microservice relies on these packages:

ZeroMQ: https://zeromq.org/download
MongoDB: https://www.mongodb.com/try
Installation of mongoose

#Implementation

The microservices uses MongoDB to store information into a database.

#Communication Contract

To call this microservice the request and reply should be bound to the same port 5555 using TCP protocol. 

Example

const socket = new zmq.Request();
    await socket.connect('tcp://127.0.0.1:5555');