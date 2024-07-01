import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

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
  data: PieChartComponentProps["data"];
  categoryColors: { [key: string]: string };
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({
  data,
  categoryColors,
}) => {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const updatedData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: data.labels.map(
        (label) => categoryColors[label] || "grey"
      ),
      hoverBackgroundColor: data.labels.map(
        (label) => categoryColors[label] || "grey"
      ),
    })),
  };

  return (
    <div
      id="pieContainer"
      className=" hidden md:block sm:w-[346px] sm:h-[346px] md:w-[346px] md:h-[346px] lg:w-[346px] lg:h-[346px] bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4"
    >
      <Pie data={data} options={options} />
    </div>
  );
};

export default CategoryDistribution;
