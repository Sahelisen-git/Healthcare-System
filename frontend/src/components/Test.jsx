import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Colors } from 'chart.js/auto';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Test = ({time, data,text }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const DATA_COUNT = 30;
  const labels = isMobile ? Array.from(Array(DATA_COUNT).keys()).map(String) : time;
  const datapoints = data;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: text,
        data: datapoints,
        borderColor: Colors.red,
        fill: false,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      }
    ]
  };

  const config = {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Line Chart - Cubic interpolation mode'
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Value'
          },
          suggestedMin: -10,
          suggestedMax: 200
        }
      }
    },
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Line data={chartData} options={config}></Line>
    </div>
  )
}

export default Test;
