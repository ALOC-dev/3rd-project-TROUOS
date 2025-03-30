export default function filter({setFilter}) {
    return (
        <div style={{padding: "10px"}}>
            <label>카테고리 선택: </label>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value = "all">전체</option>
                <option value = "한식">한식</option>
                <option value = "일식">일식</option>
                <option value = "중식">중식</option>
                <option value = "양식">양식</option>
            </select>

            <label> 정렬: </label>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="default">기본순</option>
                <option value="rating">별점 높은 순</option>
            </select>
        </div>
    );
}

/* 이 filter.jsx를 통해, 헤더 밑에 식당의 카테고리&정렬을 만들어 이용자의 선택에 따라
맛집이 표시될 수 있도록 필터를 만들었습니다. 

-코드 설명-
label태그를 통해 선택 시 드랍하여 나오는 메뉴 구현
select onChange -> 이용자가 특정 카테고리 선택 시, setFilter함수를 통해 선택된 카테고리를 전달하여 표시.
*/