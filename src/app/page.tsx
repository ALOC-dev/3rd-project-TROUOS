'use client'; // 클라이언트 사이드에서 DOM 조작해야함

import Script from 'next/script';
import { useState } from 'react';

export default function KakaoMapPage() {
  let map: kakao.maps.Map;

  // 마커 클릭시 모달 창 열림
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 추가: 식당 정보 배열
  const restaurants = [
    {
      id: 1,
      name: '반지하 돈부리',
      category: '일식',
      address: '서울특별시 동대문구 서울시립대로 78-6',
      lat: 37.585337,
      lng: 127.060857,
      phone: '02-3394-8111',
      openTime: '10:00 ~ 20:00',
      breakTime: '15:00 ~ 17:00',
      menu: [
        { name: '유케동', price: 11000 },
        { name: '사케동', price: 14000 }  
      ],
      delivery: false,
      forHere: true,
      takeOut: true
    }
  ];

  // 지도 초기화
  const initMap = () => {
    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(37.583840, 127.059019), // 초기 좌표. 시립대로 설정
      level: 4
    };
    map = new window.kakao.maps.Map(container, options);

    // 원 그리기
    const circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(37.583840, 127.059019),
      radius: 500,
      strokeWeight: 1,
      strokeColor: '#9BCBE8',
      strokeOpacity: 1,
      strokeStyle: 'solid',
      fillColor: '#B9D9EB',
      fillOpacity: 0.4
    });

    circle.setMap(map);

    // 마커 이미지 설정
    const imageSrc = '/irumae.jpg';
    const imageSize = new window.kakao.maps.Size(30, 40);
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커 표시
    restaurants.forEach((restaurant) => {
      const markerPosition = new window.kakao.maps.LatLng(restaurant.lat, restaurant.lng);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map,
        title: restaurant.name,
        image: markerImage
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:13px;">${restaurant.name}</div>`
      });

      window.kakao.maps.event.addListener(marker, 'click', function () {
        setSelectedRestaurant(restaurant);
        setIsModalOpen(true);
      });
    });
  };

  return (
    <div>
      {/* 스크립트 로드 */}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => {
          window.kakao.maps.load(initMap); // 🔄 기존 주석 유지
        }}
      />

      {/* 지도 표시 영역 */}
      <div className="map-container" id="map" style={{ width: '70%', height: '500px' }}></div>

      {/* 모달 창 */}
      {isModalOpen && selectedRestaurant && (
        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '400px',
              position: 'relative',
              boxShadow: '0 0 10px rgba(0,0,0,0.25)',
            }}
          >
            {/* X 버튼 */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
              aria-label="닫기"
            >
              &times;
            </button>

            <h2>{selectedRestaurant.name}</h2>
            <hr />
            <p><strong>📍 주소:</strong> {selectedRestaurant.address}</p>
            <p><strong>📞 전화번호:</strong> {selectedRestaurant.phone}</p>
            <p><strong>🕙 영업시간:</strong> {selectedRestaurant.openTime}</p>
            <p><strong>🛑 브레이크 타임:</strong> {selectedRestaurant.breakTime}</p>
            <p><strong>🍽️ 메뉴:</strong></p>
            <ul>
              {selectedRestaurant.menu.map((item, index) => (
                <li key={index}>{item.name} - {item.price}원</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/* 
기존 page.tsx에서 문기가 만들어놓은 식당 정보를 토대로, 식당 마커 표시 기능 구현.
아직 modal을 안만들었기에 마커 표시만을 위하여, 식당 좌표(lat, lng)와 이름, 그리고 이루매 이미지만 활용하여
식당 위치에 이루매 마커 뜨게하였음. (이루매 마커에 커서 가져가면 식당 이름 표시)
*/
