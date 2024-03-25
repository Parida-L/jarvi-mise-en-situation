import { gql } from "graphql-request";

//A FAIRE : USER ID (uuid?) et project ID dans les variables 

const QUERY = gql`
    query GetHistoryEntriesCount (
        $startDate: timestamptz!, 
        $endDate: timestamptz!
    ){
        emailSentCount: historyentries_aggregate(where: {
          user_id: {_eq: "32ca93da-0cf6-4608-91e7-bc6a2dbedcd1"}, 
          created_at: {_gte: $startDate, _lte: $endDate},
          type: {_eq: "EMAIL_SENT"}

        }) {
          aggregate {
            count
          }
        }
        emailReceivedCount: historyentries_aggregate(where: {
            user_id: {_eq: "32ca93da-0cf6-4608-91e7-bc6a2dbedcd1" }, 
            created_at: {_gte: $startDate, _lte: $endDate},
            type: {_eq: "EMAIL_RECEIVED"}, 
          }) {
            aggregate {
              count
            }
        }

        msgLkdnSentCount: historyentries_aggregate(where: {
            user_id: {_eq: "32ca93da-0cf6-4608-91e7-bc6a2dbedcd1" }, 
            created_at: {_gte: $startDate, _lte: $endDate},
            type: {_eq: "LINKEDIN_MESSAGE_SENT"}, 
          }) {
            aggregate {
              count
            }
          }
        
          msgLkdnReceivedCount: historyentries_aggregate(where: {
            user_id: {_eq: "32ca93da-0cf6-4608-91e7-bc6a2dbedcd1" }, 
            created_at: {_gte: $startDate, _lte: $endDate},
            type: {_eq: "LINKEDIN_MESSAGE_RECEIVED"}, 
          }) {
            aggregate {
              count
            }
          }
          
          inmailLkdnSentCount: historyentries_aggregate(where: {
            user_id: {_eq: "32ca93da-0cf6-4608-91e7-bc6a2dbedcd1"}, 
            created_at: {_gte: $startDate, _lte: $endDate},
            type: {_eq: "LINKEDIN_INMAIL_SENT"}, 
          }) {
            aggregate {
              count
            }
          } 
        
          inmailLkdnReceivedCount: historyentries_aggregate(where: {
            user_id: {_eq: "32ca93da-0cf6-4608-91e7-bc6a2dbedcd1"}, 
            created_at: {_gte: $startDate, _lte: $endDate},
            type: {_eq: "LINKEDIN_INMAIL_RECEIVED"}, 
          }) {
            aggregate {
              count
            }
          }
    }
`

export default QUERY