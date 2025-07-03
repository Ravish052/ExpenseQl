import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";;
import { ApolloServer } from "@apollo/server";

import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {connectDB} from "./db/connectDB.js";


import mergedResolver from "./resolvers/index.js";
import mergedTypeDef from "./typeDefs/index.js";

import { buildContext } from "graphql-passport";
import { configurePassport } from "./passport/passport.config.js";

dotenv.config();
configurePassport();

const app = express();
const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions",
});

store.on("error", (error) => {
    console.error("Session store error:", error);
});

app.use(session(
    {
        secret : process.env.SESSION_SECRET,
        resave : false, // Do not save session if unmodified
        saveUninitialized : false,
        cookie : {
            maxAge : 7* 24 * 60 * 60 * 1000, // 7 days
            httpOnly : true, // Prevent client-side JavaScript from accessing the cookie
        },
        store : store
    }
))

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
    typeDefs: mergedTypeDef,
    resolvers: mergedResolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());

app.use("/", expressMiddleware(server, {
    context: async ({ req , res}) => buildContext({ req , res}),
}));


// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);

