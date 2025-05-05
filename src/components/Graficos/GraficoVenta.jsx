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

const Venta = () => {
    const [priceData, setPriceData] = useState({});
    const [salesData, setSalesData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBitcoinData = async () => {
            const apiUrl =
                "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily";

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Procesar datos para el gráfico de precios
                const labels = data.prices.map((price) => {
                    const date = new Date(price[0]);
                    return date.toLocaleDateString();
                });

                const prices = data.prices.map((price) => price[1]);

                setPriceData({
                    labels,
                    datasets: [
                        {
                            label: "Precio de Bitcoin (USD)",
                            data: prices,
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderWidth: 2,
                            tension: 0.4,
                        },
                    ],
                });

                // Procesar datos para el gráfico de ventas
                const volumes = data.total_volumes.map((volume) => volume[1]);

                setSalesData({
                    labels,
                    datasets: [
                        {
                            label: "Volumen de venta ",
                            data: volumes,
                            borderColor: "rgba(255, 99, 132, 1)",
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
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
                <p>Cargando datos de los gráficos...</p>
            ) : (

                <div>
                    <h2 className="text-center text-xl font-semibold mb-2">
                        Gráfico de Ventas 
                    </h2>
                    <Line
                        data={salesData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: true,
                                },
                            },
                        }}
                    />
                </div>

            )}
        </div>
    );
};

export default Venta;
