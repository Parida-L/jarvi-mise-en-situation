import React, { useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarData } from '../resources/interface';

const CompaBarChart: React.FC<{ data: BarData[] }> = ({ data }) => {

    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleClick = (index: number) => {
        //console.log("🟢 Clicked index:", index);
        setActiveIndex(index);
    };

    const activeItem = data[activeIndex];
    //console.log("🟠 Active item:", activeItem);
    //console.log("🟠 Data:", data);
    // Custom Y-axis tick formatter to display values as percentages
    const yAxisFormatter = (tick: number) => `${tick * 100}%`;

    // Custom tooltip content
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        const answerRatePercentage = (data.answerRate * 100).toFixed(2) + '%';
        return (
          <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
            <p>{`${data.name}`}</p>
            <p>{`Taux de réponse: ${answerRatePercentage}`}</p>
            <p>{`Nb total reçu: ${data.totalInbound}`}</p>
            <p>{`Nb total envoyé : ${data.totalOutbound}`}</p>
          </div>
        );
      }
      return null;
    };

    return (
        <div style={{ width: '100%' }}>
            <p>Calcul effectué sur les 12 derniers mois</p>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={150} height={40} data={data}>
                    <Bar dataKey="answerRate" onClick={(index) => handleClick(index)}>
                        {data.map((entry, index) => (
                            <Cell cursor="pointer" fill="#82ca9d" key={`cell-${index}`} />
                        ))}
                    </Bar>
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={yAxisFormatter} />
                    <Tooltip content={<CustomTooltip/>} cursor={{ fill: 'rgba(0, 0, 0, 0.25)' }} />
                    <CartesianGrid strokeDasharray="3 3" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CompaBarChart;