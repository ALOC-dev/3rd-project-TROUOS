import Image from "next/image";

interface RestaurantProps {
    name: string;
    category: string;
    description: string;
}

const RestaurantCard = ({ name, category, rating, description }: RestaurantProps) => {
    return (
    <div className="flex p-2 border-b">
        <Image src={`/${category}.png`} alt={category} width={60} height={60} className="rounded" />
        <div className="ml-2 text-sm">
        <div className="font-bold">{name}</div>
        <div className="text-xs text-gray-500">{description}</div>
        </div>
    </div>
    );
};

export default RestaurantCard;
