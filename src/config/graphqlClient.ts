import { GraphQLClient } from "graphql-request";

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT;
const adminSecret = decodeURIComponent(import.meta.env.VITE_HEADER_ADMIN_SECRET)
console.log('✅.ENV: graphql URL', GRAPHQL_ENDPOINT);

export const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT);

export async function fetchGraphQL(query: string, variables:  Record<string, unknown>) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_GRAPHQL_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': adminSecret
                },
                body: JSON.stringify({
                    query,
                    variables,
                }),
            }
        );
        const responseData = await response.json();
        //console.log('📞GRAPHQL  response:', responseData);
        return responseData;
    } catch (error) {
        console.error('❌GRAPHQL Fetch error:', error);
        throw error;
    }
}