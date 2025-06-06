'use client';

import React from 'react';

interface IrumaImageProps {
    hovered: boolean;
    setHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IrumaImage({ hovered, setHovered }: IrumaImageProps) {
    return (
        <div className='irumae-wrapper'>
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
    );
}