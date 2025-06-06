import { useEffect, useRef, useState } from 'react';

interface Restaurant {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

interface SearchBarProps {
    restaurants: Restaurant[];
    onSelect: (Restaurant: Restaurant) => void;
}

export default function SearchBar({ restaurants, onSelect }: SearchBarProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Restaurant[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    //자동 업데이트
    useEffect(() => {
        if(isSearchOpen && query.length > 0) {
            const searched = restaurants.filter((r) => r.name.includes(query));
            setResults(searched);
        }
        else {
            setResults([]);
        }
    }, [query, isSearchOpen, restaurants])

    // 검색바 open 및 close
    const handleClick = () => {
        if (isSearchOpen) {
            setQuery('');
            setResults([]);
        }
        setIsSearchOpen(prev => !prev);
    }

    // 배경 클릭 시, 검색바 close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
                setQuery('');
                setResults([]);
            }
        };
    
        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen]);
    

    // 검색 기능
    const handleSearch = () => {
        if((query.length < 1)) {
            setResults([]);
            return;
        }
        
        const searched = restaurants.filter((r) => r.name.includes(query));
        setResults(searched);
    }

    // 결과에 나온 음식점 클릭 시, 해당 음식점 저장
    const handleResultClick = (restaurant: Restaurant) => {
        onSelect(restaurant);
        setIsSearchOpen(false);
        setQuery('');
        setResults([]);
    }
    

    return (
        <div className={'search-container'} ref={searchRef}>
            <button 
                onClick={handleClick} 
                className='search-button'
            > 
                <img
                    className="search-icon"
                    src="/search_icon.png"
                    alt='검색'
                />
            </button>

            <div>
                <input
                    className={`search-bar${isSearchOpen ? ' open' : ''}`}
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='음식점 이름'
                />

                <div className={`search-result${isSearchOpen && query.length > 0 ? '' : 'close'}`}>
                    {results.length === 0 && query.length > 0 && <div>검색결과가 없습니다.</div>}
                    {results.map( (r) => (
                        <div 
                            key={r.id}
                            onClick={() => handleResultClick(r)}
                            style={{cursor: 'pointer'}}
                        >{r.name}</div>
                    ))}
                </div>

            </div>
        </div>
        
    )
}