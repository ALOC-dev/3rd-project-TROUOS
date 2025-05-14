'use client'; // 

import Script from 'next/script'; // 외부 스크립트(kakao maps sdk) 불러오기 위해
import { useEffect, useState } from 'react';
import FilterSelector from '@/components/Filter/FilterSelector';
import DiningOption from '@/components/Filter/DiningOption';
import FoodCategory from '@/components/Filter/FoodCategory';

// 식당 정보 담을 인터페이스 
interface Restaurant {
  id: number;
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | false;
  closedDays: string[];
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
  // 필터 선택
  const [filterSelector, setFilterSelector] = useState('전체');
  //이용 방법
  const [diningOption, setDiningOption] = useState('전체');
  // 카테고리
  const [foodCategory, setFoodCategory] = useState('전체');


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
  }, [restaurants, foodCategory, diningOption]); // 음식점 데이터 바뀔 때만 -> 카테고리, 이용 방법 선택할 때도


  // 지도 초기화 함수
  const initMap = () => {
    // 데이터 없으면 실행 안 함
    if(restaurants.length === 0) return;

    // 지도 담을 DOM
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.583840, 127.059019), // 초기 좌표 (시립대 중심)
      level: 4 // 확대 레벨 (작을수록 확대)
    };

    // 지도 객체 생성
    const map = new window.kakao.maps.Map(container, options);
    // 중심 좌표 (시립대)
    const centerPosition = new window.kakao.maps.LatLng(37.583840, 127.059019);

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

    // 중심 좌표 마커 생성
    const centerMarker = new window.kakao.maps.Marker({
      position: centerPosition
    });
    centerMarker.setMap(map); // 지도 위에 중심 마커 표시

    // '서울시립대학교' 텍스트 라벨 표시
    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: centerPosition,
      content: `<div class="map-label">서울시립대학교</div>`,
      yAnchor: -0.3 
    });
    customOverlay.setMap(map);

    // 마커 이미지 설정
    const imageSrc = '/Irumae-face.png';
    const imageSize = new window.kakao.maps.Size(40, 40); // 크기 소폭 변경
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 객체 생성

    //카테고리에 맞는 음식점 필터링
    const filteredRestaurants = restaurants.filter((restaurant) => {
      // 중복 선택 허용
      const selectedCategory = foodCategory === '전체' || restaurant.category === foodCategory;
      const selectedOption = diningOption === '전체' || 
        (diningOption === '배달' && restaurant.usage.delivery) ||
        (diningOption === '포장' && restaurant.usage.takeOut) ||
        (diningOption === '매장식사' && restaurant.usage.forHere);

      return selectedCategory && selectedOption;
    });


    // 마커 표시
    filteredRestaurants.forEach((restaurant) => {
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

  // 재선택시 선택 해제
  const handleDiningOption = (option: string) => {
    if(diningOption === option) {
      setDiningOption('전체');
    }
    else {
      setDiningOption(option);
    }
  };

  const handleFoodCategory = (category: string) => {
    if(foodCategory === category) {
      setFoodCategory('전체');
    }
    else {
      setFoodCategory(category);
    }
  };

  //선택된 버튼 화면에 표시
  const SelectedButtons = () => {
    if( diningOption === '전체' && foodCategory === '전체') {
      return null;
    }

    return (
      <div className='selected-button'>
        {diningOption !== '전체' && <span>{diningOption}</span>}
        {foodCategory !== '전체' && <span>{foodCategory}</span>}
      </div>
    )
  }

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

      <div>
        <SelectedButtons />
      </div>

      <div className='reset-wrapper'>
        <button 
          className='reset-button'
          onClick={() => {
            setFilterSelector('전체');
            setDiningOption('전체');
            setFoodCategory('전체');
          }}
        >초기화</button>
      </div>


      <div className='main-container'>
        {/* 필터 버튼 */}
        <div className='filter-wrapper'>

          {/*필터 선택 버튼은 필터가 아직 선택되지 않았을 때만 보여줌 */}
          {filterSelector === '전체' && (
            <FilterSelector 
              filterSelector={filterSelector}
              setFilterSelector={setFilterSelector}
            />
          )}

        
          {filterSelector === '음식 카테고리' && (
            <FoodCategory
              foodCategory={foodCategory}
              setFoodCategory={handleFoodCategory}
              setFilterSelector={setFilterSelector}
            />
          )}

          {filterSelector === '이용 방법' && (
            <DiningOption
              diningOption={diningOption}
              setDiningOption={handleDiningOption}
              setFilterSelector={setFilterSelector}
            />
          )}
        </div>



        {/* 지도 표시 영역 */}
        <div className="map-container" id="map"></div>

      </div>
      
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
            <hr className="special-hr" />
            {/* p: 문단 나누기 , strong: 강조 */}
            <p><strong>📍 주소</strong> {selectedRestaurant.address}</p>
            <p><strong>📞 전화번호</strong> {selectedRestaurant.phone}</p>
            <p><strong>📆 휴무일</strong> {
              selectedRestaurant.closedDays.length > 0
                ? selectedRestaurant.closedDays.map((day, index) => (
                  <span key={index}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}{index < selectedRestaurant.closedDays.length - 1 ? ', ' : ''}
                  </span>
                ))
              : '매일 영업'
            }</p>
            <p><strong>🕙 영업 시간</strong> {selectedRestaurant.openTime}</p>
            <p><strong>⛔️ 브레이크 타임</strong> {selectedRestaurant.breakTime}</p>
            <hr />
            <p><strong>🍽️ 대표 메뉴</strong></p>
            <ul>
              {selectedRestaurant.menu.map((item, index) => (
                <li key={index}>{item.name} - {item.price}원</li>
              ))}
            </ul>
            <hr />
            <p><strong>🚗 이용 방법</strong></p>
            <div className="service-icons">
              <img src={selectedRestaurant.delivery ? '/p-delivery.png' : '/i-delivery.png'} alt="delivery" />
              <img src={selectedRestaurant.takeOut ? '/p-takeOut.png' : '/i-takeOut.png'} alt="takeOut" />
              <img src={selectedRestaurant.forHere ? '/p-forHere.png' : '/i-forHere.png'} alt="forHere" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}