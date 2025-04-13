import Image from 'next/image'; 

interface Props {
    diningOption: string;
    setDiningOption: (option: string) => void;
}

export default function DiningOption({ diningOption, setDiningOption }: Props) {
    const options = ['매장식사', '포장', '배달'];

    return (
        <div className="button-container">
            {options.map((option) => (
                <button
                    key={option}
                    className={`dropdown-button ${diningOption === option ? 'set' : ''}`}
                    onClick={() => setDiningOption(option)}
                >
                    <Image
                        src={`/${option}.png`} // 아이콘 이미지 추가
                        alt={`${option} 아이콘`}
                        width={20}
                        height={20}
                        style={{ marginRight: '6px' }}
                    />
                    {option}
                </button>
            ))}
        </div>
    );
}
