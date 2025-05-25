import React from 'react';

interface KeywordBoxProps {
    isOpen: boolean;
}

const KeywordBox: React.FC<KeywordBoxProps> = ({ isOpen }) => {
    return (
    <div className={`keyword-box ${isOpen ? 'open' : ''}`}>
        <p>여기에 식당 리스트가 들어갈 예정입니다.</p>
    </div>
    );
};

export default KeywordBox;
