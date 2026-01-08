import React, { useState, useEffect } from 'react';
import './Stats.css';

const Stats = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5001/the-kudos-wall/us-central1/getKudosStats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error loading stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="stats-card">Cargando estadísticas</div>;

    return (
        <div className="stats-card">
            <h3 className="stats-title">Estadísticas</h3>
            <ul className="stats-list">
                {Object.entries(stats).length > 0 ? (
                    Object.entries(stats).map(([category, count]) => (
                        <li key={category} className="stat-item">
                            <span className="stat-label">{category}</span>
                            <span className="stat-value">{count}</span>
                        </li>
                    ))
                ) : (
                    <li className="stat-item">No hay datos aún</li>
                )}
            </ul>
        </div>
    );
};

export default Stats;
