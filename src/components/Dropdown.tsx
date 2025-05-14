import {useState} from "react";

// props 타입 정의
interface Props {
    dropdown: string;
    selectedDropdown: (type: string) => void;
}

export default function Dropdown({dropdown, selectedDropdown
}: Props){
    //드롭다운 상태 확인
    const [isOpen, setIsOpen] = useState(false);

    //메뉴 선택 함수
    const dropdownSelect = (type: string) => {
        selectedDropdown(type);
        setIsOpen(false);
    };

    return(
        <div className="dropdown-container">
            <button
                className="dropdown-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {dropdown} {/*왼쪽 타입버튼도 디자인 동일하게 적용*/}
            </button>
            {/* 토글이 열려있으면 실행 */}
            {isOpen && (
                <div className="dropdown-list">
                    <div onClick={() => dropdownSelect('전체')}>전체</div>
                    <div onClick={() => dropdownSelect('이용 방법')}>이용 방법</div>
                    <div onClick={() => dropdownSelect('음식 카테고리')}>음식 카테고리</div>
                </div>
            )}
        </div>
    );
}