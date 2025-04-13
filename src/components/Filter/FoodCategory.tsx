import Image from 'next/image';

interface Props {
    foodCategory: string;
    setFoodCategory: (category: string) => void;
}

export default function CategoryFilter({ foodCategory, setFoodCategory }: Props) {
    const categories = ['전체', '한식', '중식', '일식', '카페', '기타'];

    return (
        <div className="button-container">
            {categories.map((category) => (
                <button
                    className={`dropdown-button ${foodCategory === category ? 'set' : ''}`}
                    key={category}
                    onClick={() => setFoodCategory(category)}
                >
                    {/* '전체'와 '기타'는 아이콘 없이 텍스트만 표시 */}
                    {category !== '전체' && category !== '기타' && (
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
