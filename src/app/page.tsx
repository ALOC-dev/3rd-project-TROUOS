'use client'; // 클라이언트 사이드에서 DOM 조작해야함

import Script from 'next/script';
import { useState } from 'react';

export default function KakaoMapPage() {
  let map: kakao.maps.Map;

  // 마커 클릭시 모달 창 열림
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
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
      center: new window.kakao.maps.LatLng(37.583840, 127.059019), // 초기 좌표. 시립대로 설정. 좌표는 https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/ 여기서 얻었습니다.
      level: 4 // 확대 레벨 (숫자가 작을수록 확대됨)
    };
    map = new window.kakao.maps.Map(container, options);

    // 원 그리기
    const circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(37.583840, 127.059019),
      radius: 500,
      strokeWeight: 1, // 선 두께
      strokeColor: '#9BCBE8', // 선의 색상
      strokeOpacity: 1, // 선의 불투명도 (0~1)
      strokeStyle: 'solid', // 선 스타일
      fillColor: '#B9D9EB', // 채우기 색상
      fillOpacity: 0.4 // 채우기 불투명도 (0~1)
    });

    // 원 표시하기
    circle.setMap(map);

    // 추가: 마커 이미지 설정
    const imageSrc = '/irumae.jpg'; // public 폴더 기준 상대 경로
    const imageSize = new window.kakao.maps.Size(30, 40); // 마커 크기
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    // 추가: 식당 마커 표시
    restaurants.forEach((restaurant) => {
      const markerPosition = new window.kakao.maps.LatLng(restaurant.lat, restaurant.lng);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map,
        title: restaurant.name,
        image: markerImage
      });

      // 추가: 마커 클릭 시 정보창 열기
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:13px;">${restaurant.name}</div>`
      });

      // 마커 클릭시 식당이름 표시
      window.kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
        setSelectedRestaurant(restaurant);
        setIsModalOpen(true);
      });
    });
  };

  return (
    <div>
      {/*스크립트 로드*/}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false`} // api키는 보안을 위해 환경 변수로 관리
        strategy="afterInteractive"
        onLoad={() => {
          {/*onload 이벤트에서 API 초기화 함수 실행*/}
          window.kakao.maps.load(initMap); // 🔄 기존 주석 유지
        }}
      />
      {/*지도 표시 영역*/}
      <div className="map-container" id="map" style={{ width: '70%', height: '500px' }}></div>
      {/*모달 창*/}
      {isModalOpen && selectedRestaurant && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
            <button onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* 기존 page.tsx에서 문기가 만들어놓은 식당 정보를 토대로, 식당 마커 표시 기능 구현.
아직 modal을 안만들었기에 마커 표시만을 위하여, 식당 좌표(lat, lng)와 이름, 그리고 이루매 이미지만 활용하여
식당 위치에 이루매 마커 뜨게하였음.(이루매 마커에 커서 가져가면 식당 이름 표시) */
