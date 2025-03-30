import React, { useState } from "react";

interface Review {
  comment: string;
  rating: number;
}

interface Restaurant {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  rating: number;
  tags: string[];
  reviews: Review[];
}

interface ModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  userLocation: { lat: number; lng: number };
}

const Modal: React.FC<ModalProps> = ({ restaurant, onClose, userLocation }) => {
  const [reviewText, setReviewText] = useState<string>("");
  const [reviewRating, setReviewRating] = useState<number>(5);

  if (!restaurant) return null;

  const getDistance = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
    const dx = a.lat - b.lat;
    const dy = a.lng - b.lng;
    return Math.sqrt(dx * dx + dy * dy).toFixed(2);
  };

  const handleSubmit = () => {
    if (reviewText.trim() === "") return;

    // 리뷰 추가
    const newReview: Review = {
      comment: reviewText,
      rating: reviewRating,
    };

    restaurant.reviews.push(newReview);

    // 평균 평점 계산
    const total = restaurant.reviews.reduce((acc, r) => acc + r.rating, 0);
    restaurant.rating = parseFloat((total / restaurant.reviews.length).toFixed(1));

    // 입력 초기화
    setReviewText("");
    setReviewRating(5);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          width: "400px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            border: "none",
            background: "transparent",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          ✖
        </button>

        <h2>{restaurant.name}</h2>
        <p><strong>카테고리:</strong> {restaurant.category}</p>
        <p><strong>주소:</strong> 서울시 동대문구 전농동 (예시)</p>
        <p><strong>거리:</strong> {getDistance(userLocation, restaurant)} km</p>
        <p><strong>가격대:</strong> 10,000~15,000원 (예시)</p>
        <p><strong>영업시간:</strong> 11:00 ~ 21:00 (예시)</p>
        <p><strong>평점:</strong> ⭐ {restaurant.rating}</p>

        <hr style={{ margin: "1rem 0" }} />

        <h3>후기</h3>
        {restaurant.reviews.length === 0 ? (
          <p>아직 작성된 리뷰가 없습니다.</p>
        ) : (
          <ul>
            {restaurant.reviews.map((review, idx) => (
              <li key={idx}>
                ⭐ {review.rating}점 - {review.comment}
              </li>
            ))}
          </ul>
        )}

        <div style={{ marginTop: "1rem" }}>
          <h4>후기 남기기</h4>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="후기를 입력하세요"
            style={{
              width: "100%",
              height: "60px",
              marginBottom: "0.5rem",
              padding: "0.5rem",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              style={{ padding: "0.4rem" }}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}점</option>
              ))}
            </select>
            <button
              onClick={handleSubmit}
              style={{
                padding: "0.4rem 0.8rem",
                backgroundColor: "#007aff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
