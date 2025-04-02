'use client'; //클라이언트 사이드에서 DOM 조작해야함

import Script from 'next/script';

export default function KakaoMapPage() {
  let map: kakao.maps.Map;

  // 지도 초기화
  const initMap = () => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(37.583840, 127.059019), // 초기 좌표. 시립대로 설정. 좌표는 https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/ 여기서 얻었습니다.
      level: 4, // 확대 레벨 (숫자가 작을수록 확대됨)
    };
    map = new window.kakao.maps.Map(container, options);

    //원 그리기
    const circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(37.583840, 127.059019),
      radius: 500,
      strokeWeight: 1, // 선 두께
      strokeColor: "#9BCBE8", // 선의 색상
      strokeOpacity: 1, // 선의 불투명도 (0~1)
      strokeStyle: "solid", // 선 스타일
      fillColor: "#B9D9EB", // 채우기 색상
      fillOpacity: 0.4, // 채우기 불투명도 (0~1)
    });

    //원 표시하기
    circle.setMap(map);

  };

  return (
    <div>
      {/*스크립트 로드*/}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false`} //api키는 보안을 위해 환경 변수로 관리
        strategy="afterInteractive"
        onLoad={() => {
          {/*onload 이벤트에서 API 초기화 함수 실행*/}
          window.kakao.maps.load(initMap);
        }}
      />
      {/*지도 표시 영역*/}
      <div className = "map-container" id="map" style={{ width: '70%', height: '500px' }}></div>
    </div>
  );
}


