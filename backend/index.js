require('dotenv-defaults').config();
import { GraphQLServer, PubSub } from 'graphql-yoga';
import * as db from './db.js';

import Mutation from './resolvers/Mutation.js';
import Subscription from './resolvers/Subscription.js';


import Query from './resolvers/Query.js';

import  { mongo } from "./mongo/mongo.js"


let onLineUserArray = [];
const setonLineUserArray = (newOnLineUserArray)=>{
  onLineUserArray = [...newOnLineUserArray];
}
export {onLineUserArray, setonLineUserArray};

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Mutation,
    Query,
    Subscription,
  },
  context: {
    db,
    pubsub,
  },
});
console.log("before call mono.connect() in backend/index process.env.MONGO_URL: ", process.env.MONGO_URL )
mongo.connect();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
