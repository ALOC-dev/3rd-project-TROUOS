import Header from "./components/header"; 
import Filter from "./components/filter";
import Map from "./components/map";
import Irumae from "./components/irumae"; //작성한 모든 components를 불러옴.
import { useState } from "react";

const dummyRestaurants = [
  { id: 1, name: "마루한", lat: 37.5839, lng: 127.0586 },
  { id: 2, name: "정육정", lat: 37.5839, lng: 127.0586 },
  { id: 3, name: "반지하돈부리", lat: 37.5839, lng: 127.0586 },
] //여기는 지도api로 가져올 부분, 현재는 그냥 예시로 채워넣음!(사이트에 나타나지 않음)
//위도 경도 좌표도 시립대로 그냥 똑같이 설정해놓음.

function App() {
  const [filter, setFilter] = useState("all");

  return (
    <div>
      <Header />  {/* 상단바 추가 */}
      <Filter setFilter={setFilter}/> {/*필터 추가*/}
      <h2>맛집 지도</h2>

      <p>지도 위에 이루매</p>
      <div style={{width: "100%", height: "500px", position: "relative"}}>
        <Map />
        {/* ✅ 이루매 마커 추가 (음식점 리스트 기반) */}
        {dummyRestaurants.map((restaurant) => (
          <Irumae 
            key={restaurant.id} 
            name={restaurant.name} 
            lat={restaurant.lat} 
            lng={restaurant.lng} 
          />
        ))}
      </div>
    </div>
  );
}


export default App;   
