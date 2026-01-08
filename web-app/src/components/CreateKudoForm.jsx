import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useCensorship } from '../hooks/useCensorship';

const CreateKudoForm = () => {
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('Trabajo en equipo');
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState('');
    const { censorText, wasCensored, censoredCount, resetCensorshipStats } = useCensorship();

    useEffect(() => {
        if (message.trim()) {
            setPreview(censorText(message));
        } else {
            setPreview('');
        }
    }, [message, censorText]);

    const resetForm = () => {
        setMessage('');
        setSender('');
        setRecipient('');
        resetCensorshipStats();
    };

    const handleSendToFirestore = async () => {
        if (!message.trim() || !sender.trim() || !recipient.trim()) return;
        setLoading(true);
        const censoredMessage = censorText(message);
        try {
            await addDoc(collection(db, "KUDOS"), {
                sender: { displayName: sender },
                recipient: { displayName: recipient },
                message: censoredMessage,
                category,
                createdAt: serverTimestamp(),
                isHidden: false,
                source: "Firestore Direct"
            });

            alert(`¡Kudo enviado a Firestore!`);
            resetForm();
        } catch (error) {
            console.error("Error adding to Firestore: ", error);
            alert("Error al enviar a Firestore");
        } finally {
            setLoading(false);
        }
    };

    const handleSendViaFunction = async () => {
        if (!message.trim() || !sender.trim() || !recipient.trim()) return;
        setLoading(true);
        const censoredMessage = censorText(message);
        try {
            const response = await fetch('http://127.0.0.1:5001/the-kudos-wall/us-central1/addKudoViaFunction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender,
                    recipient,
                    message: censoredMessage,
                    category
                }),
            });

            if (response.ok) {
                alert(`¡Kudo enviado vía Cloud Function!`);
                resetForm();
            } else {
                throw new Error('Error en la respuesta de la función');
            }
        } catch (error) {
            console.error("Error via Function: ", error);
            alert("Error al enviar vía Cloud Function");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-kudo-card">
            <h3 className="form-title">Enviar un Kudo</h3>
            <div className="kudo-form">
                <div className="form-group">
                    <input
                        type="text"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        placeholder="De parte de..."
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Para..."
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-input"
                    >
                        <option>General</option>
                        <option>Trabajo en equipo</option>
                        <option>Innovación</option>
                        <option>Otro</option>
                    </select>
                </div>

                <div className="form-group">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escribe algo positivo..."
                        rows="4"
                        className="form-input"
                        required
                    />
                </div>

                {wasCensored && (
                    <div className="censorship-notice" style={{ color: '#d32f2f', fontSize: '0.85rem', marginBottom: '10px', fontWeight: 'bold' }}>
                        Tu mensaje contiene palabras no permitidas.
                    </div>
                )}

                {preview && (
                    <div className="live-preview" style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px', borderLeft: '4px solid #ff9a02' }}>
                        <span style={{ fontSize: '0.75rem', color: '#666', display: 'block', marginBottom: '5px' }}>Vista previa censurada:</span>
                        <p style={{ margin: 0, fontStyle: 'italic', wordBreak: 'break-word' }}>{preview}</p>
                    </div>
                )}

                <div className="button-group" style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={handleSendToFirestore}
                        className="submit-btn firestore-btn"
                        disabled={loading || !message.trim() || !sender.trim() || !recipient.trim()}
                        style={{ backgroundColor: '#ff9a02ff', color: '#000' }}
                    >
                        {loading ? 'Enviando...' : 'Firestore DB'}
                    </button>
                    <button
                        onClick={handleSendViaFunction}
                        className="submit-btn func-btn"
                        disabled={loading || !message.trim() || !sender.trim() || !recipient.trim()}
                        style={{ backgroundColor: '#ff9a02ff', color: '#000' }}
                    >
                        {loading ? 'Enviando...' : 'Cloud Function'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateKudoForm;