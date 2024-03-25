import { gql } from "graphql-request";

const QUERY_VARTYPE = gql`
    query GetHistoryEntriesCount (
        $startDate: timestamptz!, 
        $endDate: timestamptz!,
        $entryType: String!
    ) {
        entry: historyentries_aggregate(where: {
          user_id: {_eq: "32ca93da-0cf6-4608-91e7-bc6a2dbedcd1"}, 
          created_at: {_gte: $startDate, _lte: $endDate},
          type: {_eq: $entryType}

        }) {
          aggregate {
            count
          }
        }
    }
    `

export default QUERY_VARTYPE