import zmq from 'zeromq';
import collection from './mongodb.js'; // Import your MongoDB connection

const startService = async () => {
    const socket = new zmq.Reply();
    await socket.bind('tcp://127.0.0.1:5555');
    console.log('Account Service running on port 5555');


    for await (const [message] of socket) {
        const data = JSON.parse(message.toString());
        console.log("Received message:", data);


        if (data.type === 'signup') {
            try {
                const { email, password } = data.schemaData;
                console.log("Creating account for email:", email);


                await collection.insertMany([{ email, password }]);
                await socket.send(JSON.stringify({ success: true, message: 'Account created successfully' }));
            } catch (error) {
                console.error("Error creating account:", error);
                await socket.send(JSON.stringify({ success: false, message: 'Error creating account' }));
            }
        } else if (data.type === 'login') {
            try {
                const { email, password } = data.schemaData;
                console.log("Attempting login for email:", email);


                const user = await collection.findOne({ email });
                if (user && user.password === password) {
                    await socket.send(JSON.stringify({ success: true, message: 'Login successful' }));
                    console.log('Login successful')
                } else {
                    await socket.send(JSON.stringify({ success: false, message: 'Invalid email or password' }));
                    console.log('Login unsuccessful: Invalid email or password')
                }
            } catch (error) {
                console.error("Error during login:", error);
                await socket.send(JSON.stringify({ success: false, message: 'Error during login' }));
            }
        }
    }
};


startService();