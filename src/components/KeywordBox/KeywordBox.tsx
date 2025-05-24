import React from 'react';

interface KeywordBoxProps {
    isOpen: boolean;
}

const KeywordBox: React.FC<KeywordBoxProps> = ({ isOpen }) => {
    return (
    <div
        style={{
        position: 'absolute',
        top: '200px',
        left: 0,
        width: '280px',
        height: 'calc(100vh - 200px)',
        backgroundColor: '#ffffff',
        borderRadius: '0 16px 16px 0',
        borderRight: '1px solid #ccc',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 999,
        overflowY: 'auto',
        padding: '16px',
        }}
    >
        <p>여기에 식당 리스트가 들어갈 예정입니다.</p>
    </div>
    );
};

export default KeywordBox;
