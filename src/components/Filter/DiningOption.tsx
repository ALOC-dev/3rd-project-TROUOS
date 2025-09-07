import Image from 'next/image'; 

interface Props {
    diningOption: string[];   //중복 선택을 위해 배열로 설정
    setDiningOption: (option: string) => void;
    // '이전'을 누르면 setFilterSelector을 '전체'로 변경하기 위해 props 추가
    setFilterSelector: (filter: string) => void;
}

export default function DiningOption({ diningOption, setDiningOption, setFilterSelector }: Props) {
    const options = ['이전', '매장식사', '포장', '배달'];
    return (
        <div className="button-container">
            {options.map((option, idx) => {
                const isFirst = idx === 0;
    
                return (
                    <button
                        key={option}
                        className={`filter-button ${diningOption.includes(option) ? 'selected' : ''}`}
                        style={{
                            width: isFirst && option === '이전' ? '70px' : undefined,
                            transition: 'width 0.2s'
                        }}
                        onClick={() => {
                            if(option === '이전') {
                                setFilterSelector('all');
                            } else {
                                setDiningOption(option);
                            }
                        }}
                    >
                        {option !== '이전' && (
                        <Image
                            src={`/${option}.png`}
                            alt={`${option} 아이콘`}
                            width={20}
                            height={20}
                            style={{ marginRight: '6px' }}
                        />
                        )}
                        {option}
                    </button>
                );
            })}
        </div>
    );
}
