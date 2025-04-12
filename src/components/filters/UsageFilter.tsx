import Image from 'next/image'; 

interface Props {
    selectedUsage: string;
    setSelectedUsage: (usage: string) => void;
}

export default function UsageFilter({ selectedUsage, setSelectedUsage }: Props) {
    const usages = ['배달', '매장식사', '포장'];

    return (
        <div className="button-container">
            {usages.map((usage) => (
                <button
                    key={usage}
                    className={`filter-button ${selectedUsage === usage ? 'selected' : ''}`}
                    onClick={() => setSelectedUsage(usage)}
                >
                    <Image
                        src={`/${usage}.png`} // 아이콘 이미지 추가
                        alt={`${usage} 아이콘`}
                        width={20}
                        height={20}
                        style={{ marginRight: '6px' }}
                    />
                    {usage}
                </button>
            ))}
        </div>
    );
}
