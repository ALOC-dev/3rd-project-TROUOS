import { useState } from "react";
import Header from "./components/header";
import Filter from "./components/filter";
import Map from "./components/map";
import Irumae from "./components/irumae";
import Modal from "./components/modal";
import LoginModal from "./components/LoginModal";
import CurrentLocation from "./components/CurrentLocation";


interface Review {
  comment: string;
  rating: number;
}

interface Restaurant {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  rating: number;
  tags: string[];
  reviews: Review[];
}


interface Location {
  lat: number;
  lng: number;
}

// 더미 데이터
const dummyRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "마루한",
    category: "한식",
    lat: 240,
    lng: 390,
    rating: 4.2,
    tags: ["혼밥", "소개팅"],
    reviews: [],  // ← 초기엔 비어있게
  },
  {
    id: 2,
    name: "정육정",
    category: "한식",
    lat: 270,
    lng: 450,
    rating: 4.8,
    tags: ["단체", "축하"],
    reviews: [],
  },
  {
    id: 3,
    name: "반지하돈부리",
    category: "일식",
    lat: 330,
    lng: 510,
    rating: 4.5,
    tags: ["혼밥"],
    reviews: [],
  },
];

// 거리 계산 함수
function getDistance(a: Location, b: Location): number {
  const dx = a.lat - b.lat;
  const dy = a.lng - b.lng;
  return Math.sqrt(dx * dx + dy * dy);
}

function App() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortFilter, setSortFilter] = useState<string>("default");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [listSort, setListSort] = useState<"rating" | "distance">("rating");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const userLocation: Location = { lat: 250, lng: 400 };

  const filteredRestaurants = dummyRestaurants
    .filter(
      (r) =>
        (categoryFilter === "all" || r.category === categoryFilter) &&
        (tagFilter === "all" || r.tags.includes(tagFilter))
    )
    .sort((a, b) => {
      if (sortFilter === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (viewMode === "list") {
      if (listSort === "rating") return b.rating - a.rating;
      if (listSort === "distance") {
        return getDistance(userLocation, a) - getDistance(userLocation, b);
      }
    }
    return 0;
  });

  return (
    <div style={{
      width: "100vw",
      minHeight: "100vh",
      padding: "2rem",
      fontSize: "1.2rem",
      lineHeight: "1.6",
      fontFamily: "'Noto Sans KR', sans-serif",
      boxSizing: "border-box",
    }}>
      <Header onLoginClick={() => setIsLoginOpen(true)} />
      <Filter 
        setCategoryFilter={setCategoryFilter}
        setSortFilter={setSortFilter}
      />

      {/* 지도 + 우측 버튼을 나란히 배치 */}
<div style={{
  display: "flex",
  gap: "2rem",
  marginBottom: "2rem",
  alignItems: "flex-start"
}}>
  {/* 지도 영역 */}
  <div style={{ 
    width: "66%",  
    height: "65vh", 
    position: "relative", 
    borderRadius: "10px", 
    overflow: "hidden", 
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    backgroundColor: "#e0e0e0"
  }}>
    {/* 리스트 전환 버튼 */}
    <button 
      onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 10,
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        cursor: "pointer"
      }}
    >
      {viewMode === "map" ? "리스트로 보기" : "지도로 보기"}
    </button>

    {/* 해시태그 */}
    <div style={{
      position: "absolute",
      top: "60px",
      right: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      zIndex: 10,
    }}>
      {["혼밥", "단체", "소개팅", "축하"].map((tag) => (
        <button
          key={tag}
          onClick={() => setTagFilter(tagFilter === tag ? "all" : tag)}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "25px",
            border: tagFilter === tag ? "2px solid #007aff" : "1px solid #ccc",
            backgroundColor: tagFilter === tag ? "#e6f0ff" : "#f9f9f9",
            cursor: "pointer"
          }}
        >
          #{tag}
        </button>
      ))}
    </div>

    {viewMode === "map" ? (
      <>
        <Map />
        <CurrentLocation lat={userLocation.lat} lng={userLocation.lng} />
        <div style={{
          position: "absolute",
          top: `${userLocation.lat}px`,
          left: `${userLocation.lng}px`,
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          border: "2px solid #007bff",
          transform: "translate(-50%, -50%)"
        }} />
        <div style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          fontSize: "0.9rem",
          color: "#333",
          backgroundColor: "white",
          padding: "0.3rem 0.6rem",
          borderRadius: "5px",
          boxShadow: "0 0 5px rgba(0,0,0,0.1)"
        }}>반경 500m</div>

        {filteredRestaurants.map((restaurant) => (
          <Irumae 
            key={restaurant.id}
            name={restaurant.name}
            lat={restaurant.lat}
            lng={restaurant.lng}
            onClick={() => setSelectedRestaurant(restaurant)}
          />
        ))}
      </>
    ) : (
      // 리스트 모드
      <>
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem" }}>
          <select
            value={listSort}
            onChange={(e) => setListSort(e.target.value as "rating" | "distance")}
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              cursor: "pointer"
            }}
          >
            <option value="rating">평점순</option>
            <option value="distance">거리순</option>
          </select>
        </div>

        <div style={{ padding: "1rem", overflowY: "auto", height: "calc(100% - 4rem)" }}>
          {sortedRestaurants.map((r) => (
            <div key={r.id} onClick={() => setSelectedRestaurant(r)} style={{
              cursor: "pointer",
              borderBottom: "1px solid #ddd",
              padding: "0.5rem 0"
            }}>
              <strong>{r.name}</strong> ({r.category}) - ⭐ {r.rating}
              <div style={{ marginTop: "0.3rem", fontSize: "0.85rem", color: "#555" }}>
                {r.tags.map(tag => `#${tag} `)}
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>

  {/* ▶︎ 오른쪽에 랜덤 추천 버튼 */}
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "65vh"
  }}>
    <button 
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        border: "1px solid #999",
        backgroundColor: "#ffe066",
        fontSize: "0.9rem",
        whiteSpace: "pre-line",
        textAlign: "center",
        lineHeight: "1.2",
        cursor: "pointer"
      }}
      onClick={() => {
        const random = filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)];
        alert(`오늘의 추천 맛집은...\n\n${random.name}(${random.category}) !!!`);
      }}
    >
      랜덤{"\n"}맛집{"\n"}추천!
    </button>
  </div>
</div>


      <Modal 
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        userLocation={userLocation}
      />

      {isLoginOpen && (
        <LoginModal onClose={() => setIsLoginOpen(false)} />
      )}
    </div>
  );
}

export default App;
