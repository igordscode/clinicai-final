'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];

const data = {
  labels,
  datasets: [
    {
      label: 'Leads Nuevos',
      data: [85, 92, 78, 110, 89, 94],
      backgroundColor: '#e4a800',
      borderRadius: 8,
      barPercentage: 0.6,
      categoryPercentage: 0.5,
    },
    {
      label: 'Convertidos',
      data: [24, 29, 25, 33, 28, 31],
      backgroundColor: '#00d7aa',
      borderRadius: 8,
      barPercentage: 0.6,
      categoryPercentage: 0.5,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#222',
      bodyColor: '#222',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: function(context: unknown) {
          return `${context.dataset.label}: ${context.parsed.y}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          family: 'Inter, sans-serif',
          size: 13,
        },
      },
    },
    y: {
      grid: {
        color: '#e5e7eb',
        drawBorder: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          family: 'Inter, sans-serif',
          size: 13,
        },
        stepSize: 20,
        beginAtZero: true,
      },
      min: 0,
      max: 120,
    },
  },
};

export const LeadsBarChart: React.FC = () => {
  return (
    <div className="w-full min-h-[220px] flex-1">
      <Bar data={data} options={options} />
    </div>
  );
}; 