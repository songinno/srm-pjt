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
import { SignInCard } from './SignInCard';
import { SignUpCard } from './SignUpCard';

//                  Component : 인증 화면 컴포넌트                   //
export default function Authentication() {

  //          State : 인증 화면 상태          //
  const [ authView, setAuthView ] = useState<'sign-in' | 'sign-up'>('sign-in');

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
        { (authView === 'sign-in') ? <SignInCard setAuthView={setAuthView} /> : <SignUpCard /> }
      </div>
    </div>
  )
}
