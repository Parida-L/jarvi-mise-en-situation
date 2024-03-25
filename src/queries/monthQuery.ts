import { fetchGraphQL } from "../config/graphqlClient";
import QUERY from "./queryAllTypes";

const fetchMonthlyData = async(
    startDate: Date,
    endDate: Date
): Promise<any> => {
    
    try {
        //Date de début décidée pour 1 an avant 
        // const startDate = new Date(endDate);
        // startDate.setFullYear(endDate.getFullYear() - 1);
        //console.log("🚀🆗 START DATE: ", startDate);

        const variables = {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        }

        const response = await fetchGraphQL(QUERY, variables)
        console.log("🚀🆗 Global Query response ", response);
        return response

    } catch (error) {
        console.error('❌❌GraphQL query error:', error);
        throw error;
    }
}

export default fetchMonthlyData;