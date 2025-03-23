export default function irumae({name, lat, lng}) {
    return (
        <div style={{position: "absolute", top: lat, left: lng, transform: "translate(-50%, -50%)"}}>
            <img 
        src="/irumae.jpg"  // public 폴더에 있는 이미지 사용
        alt={name} 
        width="40" 
        height="40"
      />
        </div>
    );
}

/* 저장해둔 이루매 이미지를 불러옴. 아직 지도api를 적용하지 않았으므로 이미지만 선정.
위 코드들은 이루매 이미지를 불러오고, 너비/높이만 설정해놓음. */