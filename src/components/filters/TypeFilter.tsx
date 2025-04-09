import {useState} from "react";

// props 타입 정의
interface Props {
    selectedType: string;
    setSelectedType: (type: string) => void;
}

export default function TypeFilter({selectedType, setSelectedType}: Props){
    //드롭다운 상태 확인
    const [isOpen, setIsOpen] = useState(false);

    //메뉴 선택 함수
    const menuSelect = (type: string) => {
        setSelectedType(type);
        setIsOpen(false);
    };

    return(
        <div className="type-filter-container">
            <button onClick={() => setIsOpen(!isOpen)}>
                {selectedType}
            </button>
            {/* 토글이 열려있으면 실행 */}
            {isOpen && (
                <div className="type-dropdown">
                    <div onClick={() => menuSelect('전체')}>전체</div>
                    <div onClick={() => menuSelect('이용 방법')}>이용 방법</div>
                    <div onClick={() => menuSelect('음식 카테고리')}>음식 카테고리</div>
                </div>
            )}
        </div>
    );
}