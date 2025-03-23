export default function header() { 
    return (
        <header style = {{display : "flex", justifyContent: "space-between", padding: "10px", background: "#fff", borderBottom: "1px solid #ddd"}}>
            <h1>이시대맛집</h1>
            <div>
                <button>로그인</button>
                <button>회원가입</button>
            </div>
        </header>
    );
}

/*가장 상단에 위치할 '이시대맛집', 로그인&회원가입 창입니다.
아직 디자인적으론 전혀 손을 대지 않았고, 대강의 위치만 잡았습니다!

-코드에 대한 간략한 설명-
export default를 통해 다른 파일에서 import를 한다면 해당 header 파일을 불러올 수 있습니다. 
<header> : 말그대로 웹페이지의 헤더역할. 뒤에는 스타일링
<div>태그 안에 <button> : 말그대로 버튼을 말함, 로그인&회원가입 버튼 생성했습니다.

*/