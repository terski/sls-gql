import { ApolloServer, gql } from 'apollo-server-lambda';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world',
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export const graphqlHandler: Handler = (
    event: APIGatewayEvent,
    context: Context,
    cb: Callback
) => {
    const handler = server.createHandler({
        cors: {
            origin: '*',
            credentials: true,
        },
    });
    return handler(event, context, cb);
};
