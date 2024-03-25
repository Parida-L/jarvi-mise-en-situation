import React, { useEffect, useState } from "react";
import { BarData } from "../interface";
import CompaBarChart from "../../components/BarChart";
import fetchGlobalEntries from "../../queries/globalQuery";

const GlobalList: React.FC = () => {
    const [barData, setBarData] = useState<BarData[]>([]);

    useEffect(() => {
        const fetchGlobalData = async () => {
            try {
                //console.log("✅ Inside GLOBAL LIST: Fetching global data...");

                const endDate = new Date(); 
                //console.log("📅 End date:", endDate);

                const globalDataEntries = await fetchGlobalEntries(endDate);
                //console.log("🚀 ✅ globalDataEntries", globalDataEntries);
                
                // Calculate answer rates
                const emailAnswerRate = calculateAnswerRate(
                    globalDataEntries.data.emailReceivedCount.aggregate.count,
                    globalDataEntries.data.emailSentCount.aggregate.count
                );
                const msgLkdnAnswerRate = calculateAnswerRate(
                    globalDataEntries.data.msgLkdnReceivedCount.aggregate.count,
                    globalDataEntries.data.msgLkdnSentCount.aggregate.count
                );
                const inmailLkdnAnswerRate = calculateAnswerRate(
                    globalDataEntries.data.inmailLkdnReceivedCount.aggregate.count,
                    globalDataEntries.data.inmailLkdnSentCount.aggregate.count
                );

                // console.log("📧 Email Answer Rate:", emailAnswerRate);
                // console.log("📨 LinkedIn Message Answer Rate:", msgLkdnAnswerRate);
                // console.log("📥 LinkedIn InMail Answer Rate:", inmailLkdnAnswerRate);
 
                const newData: BarData[] = [{
                    name: "Email direct",
                    answerRate: emailAnswerRate,
                    totalInbound: globalDataEntries.data.emailReceivedCount.aggregate.count,
                    totalOutbound: globalDataEntries.data.emailSentCount.aggregate.count
                }, {
                    name: "Linkedin inmail",
                    answerRate: msgLkdnAnswerRate,
                    totalInbound: globalDataEntries.data.msgLkdnReceivedCount.aggregate.count,
                    totalOutbound: globalDataEntries.data.msgLkdnSentCount.aggregate.count
                }, {
                    name: "Linkedin message",
                    answerRate: inmailLkdnAnswerRate,
                    totalInbound: globalDataEntries.data.inmailLkdnReceivedCount.aggregate.count,
                    totalOutbound: globalDataEntries.data.inmailLkdnSentCount.aggregate.count
                }];

                setBarData(newData);
                //console.log("✅ BAR Chart data", newData);
            } catch (error) {
                console.error('❌Error fetching global entries:', error);
            }
        };
        fetchGlobalData();
    }, []);

    // Function to calculate answer rate
    const calculateAnswerRate = (receivedCount: number, sentCount: number): number => {
        if (sentCount === 0) return 0; // Avoid division by zero
        return receivedCount / sentCount;
    };
        
    return (
        <div>
          <h2>Comparatif Global de taux de réponses par channel</h2>
          <CompaBarChart data={barData} />
        </div>
    );
};

export default GlobalList;