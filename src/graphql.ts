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
    resolvers
});

export const hello = server.createHandler();

export const helloFoo: Handler = (
    event: APIGatewayEvent,
    context: Context,
    cb: Callback
) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message:
                'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
            input: event,
        }),
    };

    cb(null, response);
};
