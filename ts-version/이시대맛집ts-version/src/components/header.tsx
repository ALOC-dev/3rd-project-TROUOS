import React from "react";

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 2rem",
      borderBottom: "1px solid #ddd"
    }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <h1 style={{
          margin: 0,
          fontSize: "4.8rem",
          fontWeight: 800,
          paddingLeft: "0.5rem"
        }}>
          이시대맛집
        </h1>
      </div>

      {/* 검색창 */}
      <div style={{ flex: 2, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "60%" }}>
          <input
            type="text"
            placeholder="맛집 검색"
            style={{
              width: "100%",
              padding: "0.5rem 1rem 0.5rem 2rem",
              borderRadius: "999px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
          <span style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "0.9rem",
            color: "#888"
          }}>🔍</span>
        </div>
      </div>

      {/*로그인&회원가입 */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
        <button onClick={onLoginClick}>로그인</button>
        <button>회원가입</button>
      </div>
    </div>
  );
};

export default Header;
