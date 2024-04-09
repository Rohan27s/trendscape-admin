import React from 'react';
import { AgChartsReact } from 'ag-charts-react';

const MonthlyEarningGraph = ({ data }) => {
  const options = {
    data: data,
    series: [{
      type: 'line',
      xKey: 'month',
      yKey: 'revenue',
      marker: {
        fill: '#06a1e1',
        size: 6,
        strokeWidth: 2,
      },
      stroke: '#06a1e1',
      tooltip: {
        enabled: true,
        renderer: function (params) {
          const formattedValue = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
          }).format(params.datum.revenue);
          return `
            <div style="background-color: #f4f4f4; border: 1px solid #ccc; padding: 10px;">
              <div style="font-weight: bold;">${params.datum.month}</div>
              <div style="color: #06a1e1;">Revenue: ${formattedValue}</div>
            </div>
          `;
        }
      }
    }],
    legend: {
      enabled: false
    },
    title: {
      text: 'Earnings Over Months',
      fontStyle: 'bold',
      fontSize: 18,
      color: '#484848', // Slate color
    },
    subtitle: {
      text: 'Monthly Revenue Trend',
      fontSize: 14,
      color: '#484848', // Slate color
    },
    xAxis: {
      label: {
        color: '#484848', // Slate color
      },
    },
    yAxis: {
      label: {
        color: '#484848', // Slate color
      },
    },
  };

  return (
    <div style={{ height: '400px' }} className="mt-6">
      <AgChartsReact options={options} />
    </div>
  );
};

export default MonthlyEarningGraph;
