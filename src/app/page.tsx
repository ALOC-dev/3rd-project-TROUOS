'use client'; // 

import Script from 'next/script'; // 외부 스크립트(kakao maps sdk) 불러오기 위해
import { useEffect, useState } from 'react';


// 식당 정보 담을 인터페이스 
interface Restaurant {
  id: number;
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | false;
  openDays: { [key: string]: boolean };
  openTime: string;
  breakTime: string | false;
  menu: { name: string; price: number }[];
  delivery: boolean;
  forHere: boolean;
  takeOut: boolean;
}

// 상태 변수
export default function KakaoMapPage() {
  // 음식점 리스트
  const [restaurants, setRestaurants] = useState<any[]>([]);
  // 음식점 클릭 여부
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  // 모달 open 여부
  const [isModalOpen, setIsModalOpen] = useState(false);

  // restaurants.json 불러오기
  useEffect(() => {
    const fetchRestaurants = async () => {
      // public 폴더의 json 파일 요청
      const res = await fetch('/restaurants.json');
      // json 파싱
      const data = await res.json();
      // 음식점 리스트 저장
      setRestaurants(data.restaurants);
    };
    
    // 함수 호출
    fetchRestaurants();
  }, []);

  useEffect(() => {
    // 음식점 데이터 로드 후, 지도 초기화
    if(restaurants.length > 0 && window.kakao?.maps){
      // 지도 생성 함수
      initMap();
    }
  }, [restaurants]); // 음식점 데이터 바뀔 때만

  // 지도 초기화 함수
  const initMap = () => {
    // 데이터 없으면 실행 안 함
    if(restaurants.length === 0) return;

    // 지도 담을 DOM
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.583840, 127.059019), // 초기 좌표(시립대 중심)
      level: 4 // 확대 레벨 (작을수록 확대)
    };

    // 지도 객체 생성
    const map = new window.kakao.maps.Map(container, options);

    // 원 그리기
    const circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(37.583840, 127.059019),
      radius: 500, // 반경
      strokeWeight: 1,
      strokeColor: '#9BCBE8',
      strokeOpacity: 1,
      strokeStyle: 'solid',
      fillColor: '#B9D9EB',
      fillOpacity: 0.4
    });
    circle.setMap(map); // 지도 위에 원 표시

    // 마커 이미지 설정
    const imageSrc = '/irumae.jpg';
    const imageSize = new window.kakao.maps.Size(30, 40); // 크기
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 객체 생성

    // 모든 음식점 마커 표시
    restaurants.forEach((restaurant) => {
      // 음식점 위도 및 경도
      const markerPosition = new window.kakao.maps.LatLng(restaurant.latitude, restaurant.longitude);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map,
        title: restaurant.name,
        image: markerImage
      });
      
      // 마커 클릭 시, 모달 열기
      window.kakao.maps.event.addListener(marker, 'click', function () {
        setSelectedRestaurant(restaurant); // 클릭된 음식점
        setIsModalOpen(true); // 모달 open 여부
      });
    });
  };

  return (
    <div>
      {/* kakao map sdk 불러오기 */}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => {
          // sdk 로드 후, 지도 로드
          window.kakao.maps.load(() => {
            initMap();
          }); 
        }}
      />

      {/* 지도 표시 영역 */}
      <div className="map-container" id="map"></div>

      {/* 모달 */}
      {isModalOpen && selectedRestaurant && (
        <div
          className="modal-overlay"
          // 모달 외부 클릭 시, 닫기
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal-content"
            // 모달 내부 클릭 시, 닫히지 않음
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="x"
            >
              &times;
            </button>

            {/* 모달 내용 */}
            <h2>{selectedRestaurant.name}</h2>
            <hr />
            {/* p: 문단 나누기 , strong: 강조 */}
            <p><strong>📍 주소</strong> {selectedRestaurant.address}</p>
            <p><strong>📞 전화번호</strong> {selectedRestaurant.phone}</p>
            <p><strong>📆 영업 날짜</strong></p>
            <ul>
              {Object.entries(selectedRestaurant.openDays).map(([day, isOpen]) => (
                <li key={day}>
                  {day}: {isOpen ? '영업' : '휴무'}
                </li>
              ))}
            </ul>
            <p><strong>🕙 영업 시간</strong> {selectedRestaurant.openTime}</p>
            <p><strong>⛔️ 브레이크 타임</strong> {selectedRestaurant.breakTime}</p>
            <p><strong>🍽️ 대표 메뉴</strong></p>
            <ul>
              {selectedRestaurant.menu.map((item, index) => (
                <li key={index}>{item.name} - {item.price}원</li>
              ))}
            </ul>
            <p><strong>🚗 이용 방법</strong></p>
            <ul>
              <li>배달: {selectedRestaurant.delivery ? '가능' : '불가'}</li>
              <li>포장: {selectedRestaurant.takeOut ? '가능' : '불가'}</li>
              <li>매장 이용: {selectedRestaurant.forHere ? '가능' : '불가'}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}