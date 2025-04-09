// props 타입 정의
interface Props {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

export default function CategoryFilter({selectedCategory, setSelectedCategory}: Props){
    //카테고리 종류
    const categories = ['전체', '한식', '중식', '일식', '카페', '기타'];

    return(
        <div className="button-container">
            {categories.map((category) => (
                <button
                    className="filter-button"
                    key={category}
                    //클릭 시 setSelectedCategory에 선택한 값 전달
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}