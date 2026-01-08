import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase';
import KudoCard from './KudoCard';
import './KudoList.css';

const KudoList = () => {
    const [kudos, setKudos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, "KUDOS"),
            where("isHidden", "==", false)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const kudosData = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                kudosData.push({
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString()
                });
            });
            kudosData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setKudos(kudosData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching kudos:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div className="loading-state">Cargando Kudos...</div>;
    }

    if (kudos.length === 0) {
        return <div className="empty-state">No hay kudos aún. ¡Sé el primero en enviar uno!</div>;
    }

    return (
        <div className="kudo-list-container">
            <h2 className="section-title">Muro de Kudos</h2>
            <div className="kudo-grid">
                {kudos.map(kudo => (
                    <KudoCard key={kudo.id} kudo={kudo} />
                ))}
            </div>
        </div>
    );
};

export default KudoList;
