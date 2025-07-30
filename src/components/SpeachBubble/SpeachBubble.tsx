'use client';
import { usePathname } from "next/navigation";
import SubTitle from "@/components/SubTitle/SubTitle";

export default function SpeachBubble() {
    const pathName = usePathname();

    if (pathName == '/signup') {
        return null;
    }

    return (
        <div className="speech-bubble">
            <SubTitle text="Trending Restaurants of UOS" />
        </div>
    )
}