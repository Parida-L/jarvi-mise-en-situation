import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartData } from '../resources/interface';

const CompaLineChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  console.log("🚀  file: LineChart.tsx:7  data:", data);

  const currentDate = new Date();
  console.log("🚀 LINECHART currentDate:", currentDate);

  currentDate.setMonth(currentDate.getMonth() - 3);

  const yAxisFormatter = (tick: number) => `${tick * 100}%`;
  // Initialize an array to hold aggregated data for each month
  const monthlyData: ChartData[] = [];

  while (currentDate <= new Date()) {
    let totalEmail = 0;
    let totalInMail = 0;
    let totalInbox = 0;

    // Iterate over the data and sum up the values for each month
    data.forEach(entry => {
      const entryDate = new Date(entry.date);
      if (
        entryDate.getMonth() === currentDate.getMonth() && 
        entryDate.getFullYear() === currentDate.getFullYear()
        ) {
        totalEmail += entry.EMAIL;
        totalInMail += entry.INMAIL;
        totalInbox += entry.INBOX;
      }
    });

    // Push the aggregated data for the month to the monthlyData array
    monthlyData.push({
      date: currentDate.toLocaleString('default', { month: 'short' }), // Format the month as short name (e.g., Jan, Feb, etc.)
      EMAIL: totalEmail,
      INMAIL: totalInMail,
      INBOX: totalInbox,
    });

    // Move to the next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  console.log("➡️ TABLEAU monthlyData LINECHART", monthlyData);

  return (
    <LineChart width={700} height={300} data={monthlyData}>
      <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis tickFormatter={yAxisFormatter} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="EMAIL" stroke="#8884d8" />
      <Line type="monotone" dataKey="INMAIL" stroke="#82ca9d" />
      <Line type="monotone" dataKey="INBOX" stroke="#ffc658" />
    </LineChart>
  );
};

export default CompaLineChart;