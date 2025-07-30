'use client'; // 

import Script from 'next/script'; // 외부 스크립트(kakao maps sdk) 불러오기 위해
import { useRef, useEffect, useState } from 'react';
import FilterSelector from '@/components/Filter/FilterSelector';
import DiningOption from '@/components/Filter/DiningOption';
import FoodCategory from '@/components/Filter/FoodCategory';
import KeywordBox from '@/components/KeywordBox/KeywordBox'; //키워드박스 불러오기
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar/SearchBar';
import { signIn, signOut, useSession } from 'next-auth/react';

declare const kakao: any;

// 식당 정보 담을 인터페이스 
interface Restaurant {
  id: number;
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string | null;
  closedDays: string[]; // DB 저장 시 JSON 배열로 처리됨
  openTime: string;
  breakTime?: string | null;
  delivery: boolean;
  forHere: boolean;
  takeOut: boolean;
  imageUrl: string;
  menu: {
    id: number;
    name: string;
    price: number;
  }[];
}

// 상태 변수
export default function KakaoMapPage() {
  // 헤더 이루매 이미지
  const [src,setSrc] = useState("/irumae.jpg");
  // 음식점 리스트
  const [restaurants, setRestaurants] = useState<any[]>([]);
  // 음식점 클릭 여부
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  // 모달 open 여부
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 필터 선택
  const [filterSelector, setFilterSelector] = useState('all');
  //이용 방법
  const [diningOption, setDiningOption] = useState<string[]>([]); //중복처리를 위해 배열로 변경
  // 카테고리
  const [foodCategory, setFoodCategory] = useState<string[]>([]);  //중복처리를 위해 배열로 변경
  //모달
  const [activeTab, setActiveTab] = useState<'menu' | 'usage'>('menu');
  const [hovered, setHovered] = useState(false);
  //키워드박스
  const [isKeywordBoxOpen, setIsKeywordBoxOpen] = useState(true);
  //로그인 모달
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  //지도 저장
  const mapRef = useRef<kakao.maps.Map | null>(null);
  // 로그인 상태 저장
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const handleLogoutConfirm = async () => {
    await signOut({ callbackUrl: '/' });
    setIsLogoutConfirmOpen(false);
  };
  const handleLogout = () => {
  setIsLogoutConfirmOpen(true); // 실제 로그아웃이 아니라 모달만 열림
  };
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  //로그아웃 확인 모달






  // DB 불러오기
  useEffect(() => {
    const fetchRestaurants = async () => {
      // api 폴더에서 data 요청
      const res = await fetch('/api/restaurants');
      // json 파싱
      const data = await res.json();
      // 음식점 리스트 저장
      console.log('API 응답 데이터:', data);
      setRestaurants(data);
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

  let alertTimeout: NodeJS.Timeout | null = null;

  const showAlert = (message: string) => {
    const alertDiv = document.getElementById("alert");
    if (!alertDiv) return;
    alertDiv.textContent = message;
    alertDiv.style.display = "block";

    if (alertTimeout) clearTimeout(alertTimeout);
    alertTimeout = setTimeout(() => {
      alertDiv.style.display = "none";
    }, 2000); // 2초 후 자동 숨김
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
  const selectedCategory =
    foodCategory.length === 0 ||
    foodCategory.includes(restaurant.category);

  const selectedOption =
    diningOption.length === 0 ||
    diningOption.every((option) => {
      if (option === "배달") return restaurant.delivery;
      if (option === "포장") return restaurant.takeOut;
      if (option === "매장식사") return restaurant.forHere;
      return false;
    });

  return selectedCategory && selectedOption;
});

  // 지도 초기화 함수
  const initMap = () => {
    // 데이터 없으면 실행 안 함
    if(restaurants.length === 0) return;

    // 지도 담을 DOM
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.584863,127.057734), // 초기 좌표 (시립대 중심)
      level: 4 // 확대 레벨 (작을수록 확대)
    };

    // 지도 객체 생성
    const map = new window.kakao.maps.Map(container, options);
    //검색시 지도 위치 변화를 위한 지도 참조
    mapRef.current = map;
    // 중심 좌표 (시립대)
    const centerPosition = new window.kakao.maps.LatLng(37.584863,127.057734);
    // 확대/축소 범위 제한
    map.setMinLevel(1);
    map.setMaxLevel(4);
    // 확대/축소 범위 초과 시 이벤트
    window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
      const level = map.getLevel();
      if (level === 1) {
        showAlert("최대 확대 범위입니다.");
      } else if (level === 4) {
        showAlert("최대 축소 범위입니다.");
      }
    });

    // 원 그리기
    const circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(37.584863,127.057734),
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
      const selectedCategory = 
        foodCategory.length === 0 ||  //배열에 아무것도 없으면 == 선택 안함 == '전체'
        foodCategory.includes(restaurant.category);   //선택한 카테고리 중 하나라도 일치하는 경우

      const selectedOption = 
        diningOption.length === 0 ||  //배열에 아무것도 없으면 == 선택 안함 == '전체'
        diningOption.every((option) => {    //every: 모든 조건이 만족해야 할때 사용
          if(option === "배달") return restaurant.delivery;
          if(option === "포장") return restaurant.takeOut;
          if(option === "매장식사") return restaurant.forHere;
          return false;
        })

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
    setDiningOption((prevOptions) => {    //prevOptions 현재 상태값 배열
      if(prevOptions.includes(option)) {
        return prevOptions.filter((o) => o !== option); // filter: 주어진 조건을 만족하는 요소만 남김 => option과 같으면 배열에서 제거(재선택시 해제)
      }
      else {
        return [...prevOptions, option];   //...prevOptions: 기존 배열 복사
      }
    })
  };

  const handleFoodCategory = (category: string) => {
    setFoodCategory((prevCategories) => {
      if(prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      }
      else {
        return [...prevCategories, category]; 
      }
    })
  };
  

  //선택된 버튼 화면에 표시
  const SelectedButtons = () => {
    if( diningOption.length === 0 && foodCategory.length === 0) {
      return null;
    }

    return (
      <div>
        <div className='selected-button'>
          {diningOption.map((opt) => (    //diningOption 배열 요소 렌더링
            <span key={opt}>✅{opt}</span>
          ))}
          {foodCategory.map((cate) => (
            <span key={cate}>☑️{cate}</span>
          ))}
        </div>

        <div className='selected-hamburger'>
          ...
          <div className='dropdown-list'>
            {diningOption.map((opt) => (   
              <span key={opt}>{opt}</span>
            ))}
            {/* 이용방법, 카테고리 구분선 */}
            <div className='special-hr'></div>    
            {foodCategory.map((cate) => (
              <span key={cate}>{cate}</span>
            ))}
          </div>
        </div>
      </div>

    )
  }

  const handleLogin = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      userId: loginId,
      password: loginPw
    });
    if (result?.error) { alert('아이디 또는 비밀번호를 확인하세요'); return; }
    alert('로그인에 성공하였습니다.');
    setIsLoginModalOpen(false);
 };

  const router = useRouter();
  console.log(router);

  //음식점을 중심으로 확대하여 지도 위치 이동
  const handleSearchRestaurant = (restaurant: Restaurant) => {
    if(mapRef.current) {
      const center = new kakao.maps.LatLng(restaurant.latitude, restaurant.longitude);
      (mapRef.current as any).setCenter(center);
      (mapRef.current as any).setLevel(1);
    }
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

    <div
      id="alert"
      style={{
        display: 'none',
        position: 'fixed',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#00B398',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '6px',
        zIndex: 9999,
      }}
    >
    </div>

      <div className='irumae-wrapper'>
        {/* 이루매 드래그 시, 이미지 변경 */}
        <div
          className={`image-wrapper ${hovered ? 'hovered' : ''}`}
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
        >
          <img
            className="irumae-img"
            src={hovered ? "/heart_Irumae.png" : "/irumae.png"}
            alt="이루매"
          />
        </div>

        <img
          className="irumae-mask"
          src="/irumae_mask.png"
          alt='이루매-2'
          style={{ opacity: hovered ? 0 : 1 }}
        />
      </div>

      <div className='top-wrapper'>
        <SearchBar
          restaurants={restaurants}
          onSelect={(restaurant) => {
              handleSearchRestaurant(restaurant as Restaurant);
            }}
        />
        
        {!isLoggedIn ? (
          <div className="login-wrapper">
          <button className="login-button" onClick={() => setIsLoginModalOpen(prev => !prev)}>
            로그인
          </button>

        {isLoginModalOpen && (
          <>
            <div className="login-overlay-background" onClick={() => setIsLoginModalOpen(false)} />
            <div className="login-dropdown" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="아이디"
                className="login-input"
                value={loginId}
                onChange={e => setLoginId(e.target.value)}
              />
              <input
                type="password"
                placeholder="비밀번호"
                className="login-input"
                value={loginPw}
                onChange={e => setLoginPw(e.target.value)}
              />
              <button className="login-submit-button" onClick={handleLogin}>
                로그인
              </button>
            </div>
          </>
        )}

        <span className="divider"></span>
        <button className="signup-button" onClick={() => router.push('/signup')}>
          회원가입
        </button>
      </div>
              ) : (
                <div className='user-wrapper' style={{ display: 'flex', gap: '10px' }}>
                  <button className='filter-button' onClick={handleLogout}>
                    로그아웃
                  </button>
                </div>
              )}
            </div>

      <div className='top-container'>
        <div className='top-bar'>
          <div className='top-bar-left'>
            {/* 필터 버튼 */}
            <div className='filter-wrapper'>
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

              {filterSelector === 'all' && (
                <FilterSelector
                  filterSelector={filterSelector}
                  setFilterSelector={setFilterSelector}
                />
              )}
            </div>
          </div>
            

          <div className='top-bar-right'>
            <div>
              <SelectedButtons />
            </div>

            <div className='reset-wrapper'>
              <button 
                className='reset-button'
                data-text="초기화"
                onClick={() => {
                  setDiningOption([]);
                  setFoodCategory([]);
                }}  
              >초기화</button>
            </div>

          </div>
        </div>
      
        {/* 키워드박스 식당 불러오기 */}
        <div className='keyword-container'>
          <div className="keyword-wrapper">
            <KeywordBox 
              isOpen={isKeywordBoxOpen} 
              restaurants={filteredRestaurants}
              onRestaurantClick={(restaurant) => {
                setSelectedRestaurant(restaurant as Restaurant);
                setIsModalOpen(true);
              }}
            />

            {/* 지도 표시 영역 */}
              <button
                  onClick={() => {
                    setIsKeywordBoxOpen((prev) => !prev);
                    console.log('키워드 박스 상태:', !isKeywordBoxOpen);
                  }}
                  className={`keyword-toggle ${isKeywordBoxOpen ? 'open' : ''}`}
                >
                  <span className="hamburger-icon">{isKeywordBoxOpen ? '<' : '>'}</span>
                </button>
            </div>
            <div className="map-container" id="map"></div>
          </div>
        </div>
      
      
      {/* 모달 */}
        {isModalOpen && selectedRestaurant && (
          <div
            className="modal-overlay"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="modal-content modal-text"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 이미지 영역 */}
              <div className="modal-header-image">
                <img
                  src={selectedRestaurant.imageUrl}
                  alt={selectedRestaurant.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default.png';
                  }}
                />
              </div>

              {/* 닫기 버튼 */}
              <button
                className="modal-close-button"
                onClick={() => setIsModalOpen(false)}
                aria-label="close"
              >
                &times;
              </button>

              <div className="modal-body-scrollable">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 style={{ margin: 0 }}>{selectedRestaurant.name}</h2>
                </div>
                <hr className="special-hr" />
                <p><strong>📍 주소</strong> {selectedRestaurant.address}</p>
                <p><strong>📞 전화번호</strong> {selectedRestaurant.phone || '없음'}</p>
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
                <p><strong>⛔️ 브레이크 타임</strong> {selectedRestaurant.breakTime || '없음'}</p>

                <hr />

                {/* 탭 버튼 */}
                <div className="modal-tab-buttons">
                  <button
                    className={activeTab === 'menu' ? 'active' : ''}
                    onClick={() => setActiveTab('menu')}
                  >
                  대표 메뉴
                </button>
                <button
                  className={activeTab === 'usage' ? 'active' : ''}
                  onClick={() => setActiveTab('usage')}
                >
                  이용 방법
                </button>
              </div>

              {/* 탭 내용 */}
              {activeTab === 'menu' && (
                <div className="modal-tab-content">
                  <p><strong>🍽️ 대표 메뉴</strong></p>
                  <ul>
                    {selectedRestaurant.menu.map((item, index) => (
                      <li key={index}>{item.name} - {item.price}원</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="modal-tab-content">
                  <p><strong>🚗 이용 방법</strong></p>
                  <div className="service-icons">
                    <img src={selectedRestaurant.delivery ? '/p-delivery.png' : '/i-delivery.png'} alt="배달" />
                    <img src={selectedRestaurant.takeOut ? '/p-takeOut.png' : '/i-takeOut.png'} alt="포장" />
                    <img src={selectedRestaurant.forHere ? '/p-forHere.png' : '/i-forHere.png'} alt="매장식사" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 로그아웃 확인 버튼 */}
      {isLogoutConfirmOpen && (
      <div className="modal-overlay" onClick={() => setIsLogoutConfirmOpen(false)}>
        <div className="modal-content logout-confirm" onClick={(e) => e.stopPropagation()}>
          <p className="modal-text" style={{ fontSize: '18px', fontWeight: 'bold' }}>정말 로그아웃하시겠습니까?</p>

          {/* sad 이루매 이미지 추가 */}
          <img
            src="/sadIrumae.png"
            alt="슬픈이루매"
            style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block'
            }}
          />

          <div className="modal-buttons">
            <button className="confirm-button" onClick={handleLogoutConfirm}>예</button>
            <button className="cancel-button" onClick={() => setIsLogoutConfirmOpen(false)}>아니오</button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}