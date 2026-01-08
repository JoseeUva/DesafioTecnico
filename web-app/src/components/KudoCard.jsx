import React from 'react';
import './KudoCard.css';

const KudoCard = ({ kudo }) => {
    const { message, sender, recipient, category, createdAt } = kudo;

    const date = createdAt ? new Date(createdAt).toLocaleDateString() : '';

    return (
        <div className="kudo-card">
            <div className="kudo-header">
                <span className="kudo-category">{category?.name || category || 'General'}</span>
                <span className="kudo-date">{date}</span>
            </div>
            <p className="kudo-message">"{message}"</p>
            <div className="kudo-footer">
                <div className="kudo-meta">
                    <div className="sender-info">
                        <div className="sender-avatar">
                            {sender?.displayName?.[0] || 'A'}
                        </div>
                        <span className="sender-name">De: {sender?.displayName || 'Anónimo'}</span>
                    </div>
                    {recipient?.displayName && (
                        <div className="recipient-info">
                            <span className="recipient-name">Para: {recipient.displayName}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KudoCard;
