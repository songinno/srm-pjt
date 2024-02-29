import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import './style.css';
import InputBox from 'components/InputBox';
import { SignInRequestDto } from 'apis/request/auth';
import { signInRequest, signUpRequest } from 'apis';
import { SignInResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { ResponseCode } from 'types/enum';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';

//                  Component : 인증 화면 컴포넌트                   //
export default function Authentication() {

  //          State : 인증 화면 상태          //
  const [ authView, setAuthView ] = useState<'sign-in' | 'sign-up'>('sign-in');

  //          State : 쿠키 상태         //
  const [ cookie, setCookie ] = useCookies();

  //          Function : 네비게이터 함수          //
  const navigator = useNavigate();

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

    //          Function : SignInResponse 처리 함수         //
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
      // ! 응답 객체가 null인 경우
      if (!responseBody) { // # null이 오는 경우는 backend 서버가 안켜지거나, 도메인이 잘못되었거나 등
        alert('네트워크 이상입니다.');
        return;
      }
      
      // ! 응답 코드에 따른 처리
      const { code } = responseBody;
      switch (code) {
        case ResponseCode.SUCCESS:
          break;
        case ResponseCode.DATABASE_ERROR:
          alert('데이터베이스 오류입니다.');
          return;
        case ResponseCode.SIGN_IN_FAIL:
        case ResponseCode.VALIDATION_FAILED:
          setIsError(true);
          return;
        default:
          alert('식별되지 않는 코드 - ' + code);
          return;
      }

      // ! 토큰을 이용한 쿠키 설정
      const { token, expirationTime } = responseBody as SignInResponseDto;
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000); // # 지금으로부터 1시간

      setCookie('accessToken', token, {expires, path: MAIN_PATH()});
      navigator(MAIN_PATH());
    };

    // TODO : 이메일과 비밀번호 분리하지 않고, input에 name 속성을 부여하여 작성하는 아이디어
    //          Event Handler : 이메일 입력값 변경 이벤트 처리          //
    const onEmailValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      // ! 작성하는 동안에는 error 상태가 아니도록 처리
      setIsError(false);
      // ! 이메일 입력값 State 업데이트
      const { value } = event.target;
      setEmailValue(value);
    };
    
    //          Event Handler : 비밀번호 입력값 변경 이벤트 처리          //
    const onPasswordValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      // ! 작성하는 동안에는 error 상태가 아니도록 처리
      setIsError(false);
      // ! 비밀번호 입력값 State 업데이트
      const { value } = event.target;
      setPasswordValue(value);
    };

    //          Event Handler : 로그인 버튼 클릭 이벤트 처리 함수         //
    const onSignInButtonClickHandler = () => {
      // ! RequestBody 생성
      const requestBody: SignInRequestDto = {
        email: emailValue,
        password: passwordValue
      };
      
      // ! 요청 및 응답 처리
      signInRequest(requestBody).then(signInResponse);
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
              value={emailValue} onChange={onEmailValueChangeHandler} error={isError}
              onKeyDown={onEmailInputBoxKeyDownHandler}
            />
            <InputBox 
              ref={passwordInputBoxRef}
              label='비밀번호' type={passwordView} placeholder='비밀번호를 입력해주세요'
              value={passwordValue} onChange={onPasswordValueChangeHandler} error={isError}
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
