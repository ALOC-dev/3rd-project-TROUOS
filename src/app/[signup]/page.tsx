
'use client';
import { useState } from 'react';
import styles from './signup.module.css';
import { useParams } from 'next/navigation';


export default function Signup() {
    const {signup} = useParams();

    const isValidPassword = (pw: string): boolean => {
        const lengthRule = pw.length >= 8;
        const alphaRule = /[a-z]/.test(pw);
        const numberRule = /[0-9]/.test(pw);
        const specialRule = /[!@#$%^&*?]/.test(pw);

        return lengthRule && alphaRule && numberRule && specialRule;
    }

    const Password = () => {
        const [pw, setPw] = useState('');
        const [rePw, setRePw] = useState('');

        const isMismatch = pw && rePw && pw!==rePw;

        return (
            <div>
                <p>비밀번호</p>
                <input 
                    className={styles.pwBox} 
                    type='text' 
                    title='pw'
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                />

                {pw && !isValidPassword(pw) && (
                    <p style={{ color: 'red', marginTop: '8px' }}>
                        비밀번호가 규칙에 맞지 않습니다.
                    </p>
                )}

                <p>비밀번호 재확인</p>
                <input 
                    className={styles.pwBox} 
                    type='text' 
                    title='re-pw'
                    value={rePw}
                    onChange={(e) => setRePw(e.target.value)}
                />

                {/* 비밀번호가 다를경우 경고메세지 */}
                { isMismatch && (
                    <p style={{ color: 'red', marginTop: '8px' }}>
                        비밀번호가 일치하지 않습니다.
                    </p>
                )}
            </div>

        )
    }


    return (
        <div className={styles.background}>
            
            <form className={styles.signUpBox}>
                <p>이메일</p>
                <div className={styles.boxContainer}>
                    <input className={styles.emailBox} type='email' title='이메일'/>
                    <button 
                        className={styles.buttonContainer}
                        type='button'
                        // onClick={} 
                    >
                        인증번호 전송
                    </button>
                </div>

                <p>인증번호</p>
                <div className={styles.boxContainer}>
                    <input className={styles.verifyNumBox} type='number' title='인증번호'/>
                    <button 
                        className={styles.buttonContainer}
                        type='button'
                        // onClick={} 
                    >
                        인증번호 확인
                    </button>
                </div>
                
                <p>아이디</p>
                <div className={styles.boxContainer}>
                    <input className={styles.IDBox} type='text' title='ID'/>
                    <button 
                        className={styles.buttonContainer}
                        type='button'
                        // onClick={} 
                    >
                        중복 확인
                    </button>
                </div>
                

                <div>
                    <Password/>
                </div>
                
                <p className={styles.submitButtonContainer}>
                    <button 
                        className={styles.submitButton}
                        type='submit'
                    >
                        회원가입
                    </button>
                </p>
            </form>
        </div>
    )
}