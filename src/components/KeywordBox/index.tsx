'use client';
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

const KeywordBox = () => {
    const [restaurants, setRestaurants] = useState([]);

useEffect(() => {
    fetch("/restaurants.json")
    .then((res) => res.json())
    .then((data) => setRestaurants(data.restaurants));
    }, []);

return (
    <div className="p-2">
    <div className="font-bold text-lg border-b pb-2 mb-2">주변 음식점</div>
    <div className="overflow-y-auto h-[calc(100vh-60px)]">
        {restaurants.map((res, idx) => (
        <RestaurantCard key={idx} {...res} />
        ))}
    </div>
    </div>
    );
};

export default KeywordBox;
