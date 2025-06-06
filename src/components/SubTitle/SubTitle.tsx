'use client';

import React from 'react';

export default function TypingText({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = React.useState('');

    React.useEffect(() => {
        let index = 0;
        let timeoutId: ReturnType<typeof setTimeout>;

        function type() {
            if (index <= text.length) {
                setDisplayedText(text.slice(0, index));
                index++;
                timeoutId = setTimeout(type, 100);
            }
            else {
                // 타이핑 완료 후 3초 대기
                timeoutId = setTimeout(() => {
                index = 0;
                setDisplayedText('');
                type();
                }, 3000);
            }
        }

        type();

        return () => clearInterval(timeoutId);
    }, [text]);

    return <span>{displayedText}</span>;
}
