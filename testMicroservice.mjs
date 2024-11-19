import zmq from 'zeromq';


const testMicroservice = async () => {
    const socket = new zmq.Request();
    await socket.connect('tcp://127.0.0.1:5555'); // Connect to the microservice
    console.log("Connected to the microservice on port 5555");


    // Test 1: Signup Request
    const signupData = {
        type: 'signup',
        schemaData: {
            email: 'testuser@example.com',
            password: 'password123'
        }
    };


    console.log("Sending signup request:", signupData);
    await socket.send(JSON.stringify(signupData)); // Send the signup request
    const [signupResponse] = await socket.receive(); // Receive the response
    console.log("Signup Response:", signupResponse.toString());


    // Test 2: Login Request (successful)
    const loginDataSuccess = {
        type: 'login',
        schemaData: {
            email: 'testuser@example.com',
            password: 'password123'
        }
    };


    console.log("Sending successful login request:", loginDataSuccess);
    await socket.send(JSON.stringify(loginDataSuccess)); // Send the login request
    const [loginResponseSuccess] = await socket.receive(); // Receive the response
    console.log("Successful Login Response:", loginResponseSuccess.toString());


    // Test 3: Login Request (failure)
    const loginDataFailure = {
        type: 'login',
        schemaData: {
            email: 'test@example.com',
            password: 'wrongpassword'
        }
    };


    console.log("Sending failed login request:", loginDataFailure);
    await socket.send(JSON.stringify(loginDataFailure)); // Send the login request
    const [loginResponseFailure] = await socket.receive(); // Receive the response
    console.log("Failed Login Response:", loginResponseFailure.toString());
};


testMicroservice()
