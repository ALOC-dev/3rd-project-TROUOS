interface Props {
    filterSelector: string;
    setFilterSelector: (filter: string) => void;
}

export default function FilterSelector({ filterSelector, setFilterSelector }: Props) {
    const filters = ['이용 방법', '음식 카테고리'];

    return (
        <div className="button-container">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className="filter-button"
                    onClick={() => setFilterSelector(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}
