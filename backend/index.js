import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import mergedResolver from "./resolvers/index.js";
import mergedTypeDef from "./typeDefs/index.js";
const server = new ApolloServer({
    typeDefs: mergedTypeDef,
    resolvers: mergedResolver,
});

const { url } = await startStandaloneServer(server)