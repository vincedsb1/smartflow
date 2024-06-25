/* eslint-disable import/no-anonymous-default-export */
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
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ data }) => {
    // Configuration des options du graphique
    const options = {
        maintainAspectRatio: false, // Pour ignorer le ratio d'aspect par défaut et utiliser la hauteur et largeur définies
        plugins: {
            legend: {
                position: 'top' as const, // Position de la légende
            },
            tooltip: {
                enabled: true, // Activer les infobulles
            },
        },
    };

    return (
<div className="hidden sm:block sm:w-[100px] sm:h-[100px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] bg-neutral-50 rounded-xl">
    <Pie data={data} options={options} />
</div>
    );
};

// Données fictives pour le test
const fakeData = {
    labels: ['Catégorie 1', 'Catégorie 2', 'Catégorie 3'],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: ['red', 'blue', 'green'],
        hoverBackgroundColor: ['darkred', 'darkblue', 'darkgreen']
    }]
};

// eslint-disable-next-line react/display-name
export default () => <CategoryDistribution data={fakeData} />;
