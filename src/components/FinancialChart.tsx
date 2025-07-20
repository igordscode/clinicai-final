'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const labels = ["Feb", "Mar", "Abr", "May", "Jun", "Jul"];

const data = {
  labels,
  datasets: [
    {
      label: 'Facturación',
      data: [120, 180, 160, 220, 200, 240],
      borderColor: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)', // será sobrescrito via plugin
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#fff',
      pointRadius: 5,
      pointHoverRadius: 7,
      borderWidth: 3,
      order: 1,
    },
    {
      label: 'Gastos',
      data: [140, 130, 120, 110, 100, 90],
      borderColor: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)', // será sobrescrito via plugin
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0.05)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#ef4444',
      pointBorderColor: '#fff',
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2.5,
      borderDash: [8, 4],
      order: 2,
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
        label: function(context: any) {
          return `${context.dataset.label}: Gs. ${context.parsed.y}M`;
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
        stepSize: 40,
        beginAtZero: true,
        callback: function(value: any) {
          return `Gs. ${value}M`;
        },
      },
      min: 0,
      max: 300,
    },
  },
};

export const FinancialChart: React.FC = () => {
  return (
    <div className="w-full h-80 flex-1">
      <Line data={data} options={options} />
      <div className="flex gap-8 mt-6 justify-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8]"></div>
            <span className="text-sm font-medium text-[#333333]">Facturación</span>
          </div>
          <span className="text-xs text-gray-500">Gs. 582.000.000</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded-full bg-gradient-to-r from-[#ef4444] to-[#dc2626] border-dashed border-[#ef4444]"></div>
            <span className="text-sm font-medium text-[#333333]">Gastos</span>
          </div>
          <span className="text-xs text-gray-500">Gs. 378.000.000</span>
        </div>
      </div>
    </div>
  );
}; 