import React, { KeyboardEvent, useRef, useState } from 'react';
import './style.css';
import InputBox from 'components/InputBox';

//                  Component : 인증 화면 컴포넌트                   //
export default function Authentication() {

  //          State : 인증 화면 상태          //
  const [ authView, setAuthView ] = useState<'sign-in' | 'sign-up'>('sign-in');

  //          Component : 로그인 카드 컴포넌트         //
  const SignInCard = () => {
    //          State : 이메일 및 패스워드 InputBox 요소 참조 상태          //
    const emailInputBoxRef = useRef<HTMLInputElement | null>(null);
    const passwordInputBoxRef = useRef<HTMLInputElement | null>(null);

    //          State : 이메일 및 패스워드 입력값 상태         //
    const [ emailValue, setEmailValue ] = useState<string>('');
    const [ passwordValue, setPasswordValue ] = useState<string>('');

    //          State : 패스워드 View 상태         //
    const [ passwordView, setPasswordView ] = useState<'text' | 'password'>('password');

    //          State : 패스워드 View Icon 상태 관리          //
    const [ passwordViewIcon, setPasswordViewIcon ] 
      = useState<'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon'>('eye-light-off-icon');

    //          State : 에러 상태         //
    const [ isError, setIsError ] = useState<boolean>(false);

    //          Event Handler : 패스워드 View 아이콘 버튼 클릭 이벤트 처리 함수         //
    const onPasswordViewIconClickHandler = () => {
      setPasswordView((prev) => {
        if (prev === 'text') {
          setPasswordViewIcon('eye-light-off-icon');
          return 'password';
        } else {
          setPasswordViewIcon('eye-light-on-icon');
          return 'text';
        }
      });
    };

    //          Event Handler : 로그인 버튼 클릭 이벤트 처리 함수         //
    const onSignInButtonClickHandler = () => {
      // TODO : 로그인 기능 구현 필요
    };

    //          Event Handler : 회원가입 링크 클릭 이벤트 처리 함수         //
    const onSignUpLinkClickHandler = () => {
      setAuthView('sign-up');
    };

    //          Event Handler : 이메일 InputBox 키보드 이벤트(keyDown) 처리 함수         //
    // Description : Enter키 이벤트 - Enter키 누르면 비밀번호 입력 칸으로 focus 처리
    const onEmailInputBoxKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return;
      if (!passwordInputBoxRef.current) return;
      passwordInputBoxRef.current.focus();
    };
    //          Event Handler : 비밀번호 InputBox 키보드 이벤트(keyDown) 처리 함수         //
    // Description : Enter키 이벤트 - Enter키 누르면 로그인 버튼 동작
    const onPasswordInputBoxKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return;
      onSignInButtonClickHandler();
    };

    //          Render : 로그인 카드 컴포넌트 렌더링         //
    return (
      <div className='auth-card'>
        <div className="auth-card-box">
          <div className="auth-card-top">
            <div className="auth-card-title-box">
              <div className="auth-card-title">{'로그인'}</div>
            </div>
            <InputBox 
              ref={emailInputBoxRef}
              label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요' 
              value={emailValue} setValue={setEmailValue} error={isError}
              onKeyDown={onEmailInputBoxKeyDownHandler}
            />
            <InputBox 
              ref={passwordInputBoxRef}
              label='비밀번호' type={passwordView} placeholder='비밀번호를 입력해주세요'
              value={passwordValue} setValue={setPasswordValue} error={isError}
              onKeyDown={onPasswordInputBoxKeyDownHandler} icon={passwordViewIcon} onButtonClick={onPasswordViewIconClickHandler}
            />
          </div>
          <div className="auth-card-bottom">
            {isError && (
              <div className="auth-sign-in-error-box">
                <div className="auth-sign-in-error-message">
                  {'이메일 주소 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.'}
                </div>
              </div>
            )}
            <div className="black-large-full-button" onClick={onSignInButtonClickHandler}>{'로그인'}</div>
            <div className="auth-description-box">
              <div className="auth-description">
                {'신규 사용자이신가요? '}<span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{'회원가입'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //          Component : 회원가입 카드 컴포넌트         //
  const SignUpCard = () => {

    //          Render : 회원가입 카드 컴포넌트 렌더링         //
    return (
      <div className='auth-card'></div>
    );
  };

//                  Render : 인증 화면 컴포넌트 렌더링                   //
  return (
    <div id="auth-wrapper" className='auth-background-image'>
      <div className="auth-contianer">
        <div className="auth-jumbotron-box">
          <div className="auth-jumbotron-contents">
            <div className="auth-logo-icon-box">
              <div className="icon auth-logo-icon"></div>
            </div>
            <div className="auth-jumbotron-text-box">
              <div className="auth-jumbotron-text">{'환영합니다.'}</div>
              <div className="auth-jumbotron-text">{'PRACTICE BOARD 입니다.'}</div>
            </div>
          </div>
        </div>
        { (authView === 'sign-in') ? <SignInCard /> : <SignUpCard /> }
      </div>
    </div>
  )
}
