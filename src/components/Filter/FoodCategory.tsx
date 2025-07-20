import Image from 'next/image';

interface Props {
    foodCategory: string[];   //중복 선택을 위해 배열로 설정
    setFoodCategory: (category: string) => void;
    // '이전'을 누르면 setFilterSelector을 '전체'로 변경하기 위해 props 추가
    setFilterSelector: (filter: string) => void;
}

export default function CategoryFilter({ foodCategory, setFoodCategory, setFilterSelector }: Props) {
    const categories = ['이전', '한식', '중식', '일식', '디저트', '주점', '기타'];

    return (
        <div className="button-container">
            {categories.map((category) => (
                <button
                    className={`filter-button ${foodCategory.includes(category) ? 'selected' : ''}`}
                    key={category}
                    // '이전'을 누르면 돌아가도록 함
                    onClick={() => {
                        if(category === '이전') {
                            setFilterSelector('all');
                        }
                        else {
                            setFoodCategory(category);
                        }
                    }}
                >
                    {/* '이전'와 '기타'는 아이콘 없이 텍스트만 표시 */}
                    {category !== '이전' && category !== '기타' && (
                        <Image
                            src={`/${category}.png`}
                            alt={`${category} 아이콘`}
                            width={20}
                            height={20}
                            style={{ marginRight: '6px' }}
                        />
                    )}
                    {category}
                </button>
            ))}
        </div>
    );
}
