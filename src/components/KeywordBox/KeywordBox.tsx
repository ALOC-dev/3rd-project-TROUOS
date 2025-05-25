'use client';

import React from 'react';

interface Restaurant {
    id: number;
    name: string;
    address: string;
    openTime: string;
    closedDays: string[];
}

interface KeywordBoxProps {
    isOpen: boolean;
    restaurants: Restaurant[];
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


const getRestaurantImage = (restaurantName: string) => {
    const fileName = restaurantName.replace(/\s/g, '');
    return `/${fileName}.png`;
};

const KeywordBox: React.FC<KeywordBoxProps> = ({ isOpen, restaurants }) => {
    return (
        <div
            className={`keyword-box ${isOpen ? 'open' : ''}`}
    style={{
        position: 'absolute',
        left: 0,
        width: '280px',
        height: 'calc(100vh - 200px)',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #ccc',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 999,
        padding: '16px',
        borderRadius: '0 8px 8px 0',

    //스크롤 가능 + 세로 정렬
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    }}
    >
    {restaurants.map((r) => (
        <div
        key={r.id}
        style={{
            width: '100%',
            borderBottom: '1px solid #eee',
            paddingBottom: '12px',
        }}
>
        <img
            src={getRestaurantImage(r.name)}
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
