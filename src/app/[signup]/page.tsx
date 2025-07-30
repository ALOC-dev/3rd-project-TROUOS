'use client';

import { useState } from 'react';
import styles from './signup.module.css';
import { useRouter } from 'next/navigation'; 

export default function Signup() {
    const router = useRouter();
    const [id, setId] = useState(''); // id
    const [emailSent, setEmailSent] = useState(false); // 인증 메일 여부
    const [code, setCode] = useState(''); // 인증 코드
    const [isVerified, setIsVerified] = useState(false); // 인증 완료 
    const [pw, setPw] = useState(''); // 비밀번호 
    const [rePw, setRePw] = useState(''); // 비밀번호 확인 

    const email = `${id}@uos.ac.kr`; // 이메일 자동 완성

    const isValidPassword = (pw: string): boolean => {
        const lengthRule = pw.length >= 8;
        const alphaRule = /[a-z]/.test(pw);
        const numberRule = /[0-9]/.test(pw);
        const specialRule = /[!@#$%^&*?]/.test(pw);

        return lengthRule && alphaRule && numberRule && specialRule;
    }

    // 인증번호 전송
    const sendVerificationCode = async () => {
        if (!id) {
            alert('아이디를 입력해주세요.');
            return;
        }

        const res = await fetch('/api/send-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (res.ok) {
            alert('인증번호가 전송되었습니다.');
            setEmailSent(true);
        } else {
            alert('인증번호 전송 실패');
        }
    };

    // 인증 코드 확인
    const verifyCode = async () => {
        const res = await fetch('/api/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code }),
        });
        if (res.ok) {
            alert('인증이 완료되었습니다.');
            setIsVerified(true);
        } else {
            alert('인증번호가 올바르지 않습니다.');
        }
    };

    // 입력 확인
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isVerified) {
            alert('이메일 인증을 완료해주세요.');
            return;
        }
        if (pw !== rePw) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!isValidPassword(pw)) {
            alert('비밀번호가 규칙에 맞지 않습니다.');
            return;
        }
    
        const res = await fetch('/api/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: id,
                name: id,
                password: pw
            }),
        });
    
        if (res.ok) {
            alert('회원가입이 완료되었습니다.');
            router.push('/'); // 회원가입 성공 시, 메인 화면으로 이동
        }
        else {
            alert('회원가입 실패');
        }
    };

    const getProgressStep = (): number => {
        if (!id) return 0;
        if (!emailSent) return 0;
        if (!isVerified) return 1;
        if (!isValidPassword(pw)) return 2;
        if (pw !== rePw) return 3;
        return 4;
    }

    const currentStep = getProgressStep();
    const progressPercent = (currentStep/4) * 100;
    const barWidth = 450;
    const offset = 20;
    const leftPx = (progressPercent / 100) * barWidth - offset;


    return (
        <div className={styles.background}>
            {/*진행바 */}
            <div className={styles.barWrapper}>
                <div className={styles.bar}>
                    <div className={styles.fill} style={{width: `${progressPercent}%`}}/>   
                </div>
                <img
                    className={styles.character}
                    src={progressPercent === 100 ? '/irumae-success.png' : '/irumae-progress.png'}
                    style={{ left: `calc(${leftPx}px)` }}
                    alt="이루매"
                />
            </div>

            <form className={styles.signUpBox} onSubmit={handleSubmit}>
                <p>서울시립대학교 포털 ID</p>
                <div className={styles.boxContainer}>
                    <input
                        className={styles.emailBox}
                        type="text"
                        value={id}
                        onChange={(e)=>setId(e.target.value)}
                        required
                    />
                    <button 
                        className={styles.buttonContainer}
                        type="button"
                        onClick={sendVerificationCode}
                        disabled={!id}
                    >
                        인증번호 전송
                    </button>
                </div>

                <p>인증 번호</p>
                <div className={styles.boxContainer}>
                    <input
                        className={styles.verifyNumBox}
                        type="text"
                        value={code}
                        onChange={(e)=>setCode(e.target.value)}
                        required
                        disabled={!emailSent}
                    />
                    <button 
                        className={styles.buttonContainer}
                        type="button"
                        onClick={verifyCode}
                        disabled={!emailSent}
                    >
                        인증번호 확인
                    </button>
                </div>
                
                <p>비밀번호</p>
                    <input
                        className={styles.pwBox}
                        type="password"
                        value={pw}
                        onChange={(e)=>setPw(e.target.value)}
                        required
                        disabled={!isVerified}
                    />
                    {pw && !isValidPassword(pw) && (
                    <p style={{ color: 'red', marginTop: '8px', fontSize: 12}}>
                        영문 소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.
                    </p>
                    )}

                    <p>비밀번호 재입력</p>
                    <input
                        className={styles.pwBox}
                        type="password"
                        value={rePw}
                        onChange={(e)=>setRePw(e.target.value)}
                        required
                        disabled={!isValidPassword(pw)}
                    />

                    {pw && rePw && pw !== rePw && (
                        <p style={{color: 'red', marginTop: '8px', fontSize: 12}}>
                            비밀번호가 일치하지 않습니다.
                        </p>
                    )}
                
                    <p className={styles.submitButtonContainer}>
                        <button 
                            className={styles.submitButton}
                            type="submit"
                            disabled={
                                !id ||
                                !emailSent ||
                                !isVerified ||
                                !isValidPassword(pw) ||
                                pw !== rePw
                            }
                        >
                            회원가입
                        </button>
                    </p>
            </form>
        </div>
    );
}