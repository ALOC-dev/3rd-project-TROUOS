import Image from 'next/image'; 

interface Props {
    diningOption: string;
    setDiningOption: (option: string) => void;
    // '이전'을 누르면 setFilterSelector을 '전체'로 변경하기 위해 props 추가
    setFilterSelector: (filter: string) => void;
}

export default function DiningOption({ diningOption, setDiningOption, setFilterSelector }: Props) {
    const options = ['이전', '매장식사', '포장', '배달'];

    return (
        <div className="button-container">
            {options.map((option) => (
                <button
                    key={option}
                    className={`filter-button ${diningOption === option ? 'selected' : ''}`}
                    // '이전'을 누르면 돌아가도록 함
                    onClick={() => {
                        if(option === '이전') {
                            setFilterSelector('전체');
                        }
                        else {
                            setDiningOption(option);
                        }
                    }}
                >
                    {/* '이전'은 아이콘 없이 텍스트만 표시 */}
                    {option !== '이전' && (
                        <Image
                        src={`/${option}.png`} // 아이콘 이미지 추가
                        alt={`${option} 아이콘`}
                        width={20}
                        height={20}
                        style={{ marginRight: '6px' }}
                    />
                    )}
                    
                    {option}
                </button>
            ))}
        </div>
    );
}
