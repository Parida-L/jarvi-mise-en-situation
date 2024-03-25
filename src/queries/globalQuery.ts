import { fetchGraphQL } from "../config/graphqlClient";
import QUERY from "./queryAllTypes";

const fetchGlobalEntries = async(
    endDate: Date
): Promise<any> => {
    
    //La date reçue est la date du jour
    //console.log("🆗 date reçue - end date", endDate);

    try {
        //Date de début décidée pour 1 an avant 
        const startDate = new Date(endDate);
        startDate.setFullYear(endDate.getFullYear() - 1);
        //console.log("🚀🆗 START DATE: ", startDate);

        const variables = {
            startDate: startDate,
            endDate: endDate
        }

        const response = await fetchGraphQL(QUERY, variables)
        //console.log("🚀🆗 Global Query response ", response);
        return response

    } catch (error) {
        console.error('❌❌GraphQL query error:', error);
        throw error;
    }
}

export default fetchGlobalEntries;