import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
} from "chart.js";

// Registra los componentes de Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

const BitcoinChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Función para obtener los datos de la API
        const fetchBitcoinData = async () => {
            const apiUrl =
                "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily";

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Procesar datos para el gráfico
                const labels = data.prices.map((price) => {
                    const date = new Date(price[0]);
                    return date.toLocaleDateString();
                });

                const prices = data.prices.map((price) => price[1]);

                // Configurar los datos para el gráfico
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Precio en  (USD)",
                            data: prices,
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderWidth: 2,
                            tension: 0.4,
                        },
                    ],
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Bitcoin data:", error);
            }
        };

        fetchBitcoinData();
    }, []);

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {loading ? (
                <p className="text-center text-xl font-semibold mb-2">Cargando datos del gráfico...</p>
            ) : (
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default BitcoinChart;
