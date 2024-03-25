import React, { useEffect, useState } from 'react';
import fetchMonthlyData from '../../queries/monthQuery';
import CompaLineChart from '../../components/LineChart';

const DataList: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMonthlyDataAndUpdateState = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 11, 1); // Start from 11 months ago
        console.log("🟢 Start Date:", startDate);
        console.log("🟢 End Date:", endDate);
        const data = await fetchMonthlyData(startDate, endDate);
        console.log("🟢 Monthly Data:", data);
        // Ensure data is an array before setting it
        if (Array.isArray(data)) {
          setMonthlyData(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching monthly data:', error);
      }
    };

    fetchMonthlyDataAndUpdateState();
  }, []);

  return (
    <div>
      <h2>Monthly Data List</h2>
      <CompaLineChart data={monthlyData} />
    </div>
  );
};

export default DataList;

