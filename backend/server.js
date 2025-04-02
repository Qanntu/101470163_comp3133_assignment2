require('dotenv').config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require('cors');
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");


// configuration of port and URI of MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

  

//"mongodb+srv://lizzarbsch:CalidezCa30@clusterhocusfocus.jaegp.mongodb.net/assignment2?retryWrites=true&w=majority&appName=ClusterHocusFocus";



const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cors());
app.use(express.json()); // for parsing JSON 

// Function to connect MongoDB
const connectDB = async () => {
  try {
    console.log(`Attempting to connect to DB...`);
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected!`);
  } catch (error) {
    console.error(`Error while connecting to MongoDB : ${error.message}`);
    process.exit(1);
  }
};

// Start Server Apollo / Express
const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  
  app.listen(PORT, () => {
    console.log(`The server started running at http://localhost:${PORT}/graphql`);
  });
  
};

startServer();
