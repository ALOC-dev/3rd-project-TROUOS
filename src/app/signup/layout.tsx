import type { Metadata } from "next";

export const signUpMetadata: Metadata = {
    title: "이시대맛집 회원가입"
}

export default function SignUpLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <div>
            {children}
        </div>
    )
}