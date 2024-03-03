import React, {  useState } from 'react';
import './style.css';
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
        { (authView === 'sign-in') ? <SignInCard setAuthView={setAuthView} /> : <SignUpCard setAuthView={setAuthView} /> }
      </div>
    </div>
  )
}
