import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartComponentProps {
    data: {
        labels: string[];
        datasets: Array<{
            data: number[];
            backgroundColor?: string[];
            borderColor?: string[];
            borderWidth?: number;
            hoverBackgroundColor?: string[];
        }>;
    };
}

interface CategoryDistributionProps {
    data: PieChartComponentProps['data'];
    categoryColors: { [key: string]: string };
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ data, categoryColors }) => {
    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        tooltip: {
          enabled: true,
        },
      },
    };
  
    const updatedData = {
        ...data,
        datasets: data.datasets.map(dataset => ({
            ...dataset,
            backgroundColor: data.labels.map(label => categoryColors[label] || 'grey'),
            hoverBackgroundColor: data.labels.map(label => categoryColors[label] || 'grey'),
        })),
    };

  
    return (
      <div className="hidden md:block sm:w-[100px] sm:h-[100px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] bg-neutral-50 rounded-xl">
        <Pie data={data} options={options} />
      </div>
    );
  };
  
  

export default CategoryDistribution;
