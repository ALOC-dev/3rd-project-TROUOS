'use client';

import React from 'react';

interface Restaurant {
    id: number;
    name: string;
    address: string;
    openTime: string;
    closedDays: string[];
    imageUrl: string;
}

interface KeywordBoxProps {
    isOpen: boolean;
    restaurants: Restaurant[];
    onRestaurantClick: (restaurant: Restaurant) => void; //모달 뜨게끔 추가
}

const getClosedDays = (closedDays: any): string[] => {
    if (Array.isArray(closedDays)) return closedDays;
    try {
        const parsed = JSON.parse(closedDays);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const KeywordBox: React.FC<KeywordBoxProps> = ({ isOpen, restaurants, onRestaurantClick }) => {
    return (
        <div
            className={`keyword-box ${isOpen ? 'open' : ''}`}
        >
        {restaurants.map((r) => (
            <div
                key={r.id}
                onClick={() => onRestaurantClick(r)}
                style={{
                    width: '100%',
                    borderBottom: '1px solid #eee',
                    paddingBottom: '12px',
                }}
            >
                <img
                    src={r.imageUrl}
                    alt={r.name}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/default.png';
                    }}
                    style={{
                        width: '100%',
                        height: '140px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                    }}
                />
                <h4 style={{ margin: '8px 0 4px' }}>{r.name}</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{r.address}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#777' }}>
                ⏰ {r.openTime} / ❌ {getClosedDays(r.closedDays).join(', ') || '없음'}
                </p>
            </div>
        ))}
        </div>
    );
};

export default KeywordBox;

//식당 이름, 주소, 영업시간, 휴무일 표시되도록 박스 구현
