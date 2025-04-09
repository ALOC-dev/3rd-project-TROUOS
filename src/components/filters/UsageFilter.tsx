//props 타입 정의
interface Props {
    selectedUsage: string;
    setSelectedUsage: (usage: string) => void;
}

export default function UsageFilter({selectedUsage, setSelectedUsage}: Props){
    //이용 방법 종류
    const usages = ['배달', '매장식사', '포장'];

    return(
        <div className="button-container">
            {usages.map((usage) => (
                <button
                    className="filter-button"
                    key={usage}
                    //클릭 시 setSelectedUsage에 선택한 값 전달
                    onClick={() => setSelectedUsage(usage)}
                >
                    {usage}
                </button>
            ))}
        </div>
    );
}