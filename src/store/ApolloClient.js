import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import data from './data.json'

function createMockApolloClient(){
    return {
        query : () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({data : data.data})
                }, 250);
            })
        }
    }
}
export const client = createMockApolloClient()