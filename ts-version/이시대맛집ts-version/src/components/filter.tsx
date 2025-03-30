import React from "react";

interface FilterProps {
  setCategoryFilter: (value: string) => void;
  setSortFilter: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ setCategoryFilter, setSortFilter }) => {
  return (
    <div style={{ padding: "10px" }}>
      <label>카테고리 선택: </label>
      <select onChange={(e) => setCategoryFilter(e.target.value)}>
        <option value="all">전체</option>
        <option value="한식">한식</option>
        <option value="일식">일식</option>
        <option value="중식">중식</option>
        <option value="양식">양식</option>
      </select>

      <label style={{ marginLeft: "10px" }}>정렬: </label>
      <select onChange={(e) => setSortFilter(e.target.value)}>
        <option value="default">기본순</option>
        <option value="rating">별점 높은 순</option>
      </select>
    </div>
  );
};

export default Filter;
