import React, { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';

//                  Component : Header Layout                 //
export default function Header() {

  //          State : 로그인 유저 상태         //
  const { loginUser, setLoginUser, resetLoginUser  } = useLoginUserStore();

  //          State : Cookie, Login 상태         //
  const [cookies, setCookies] = useCookies();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  //          Function : 네비게이트 함수          //
  const navigate = useNavigate();

  //          Event Handler : 로고 클릭 이벤트 처리 함수          //
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  };

  //          Component : 검색 버튼 컴포넌트          //
  const SearchButton = () => {

    //          State : 검색 버튼 요소 참조 상태          //
    // description : Enter 키 입력 시, 검색 기능 관련
    const searchButtonRef = useRef<HTMLInputElement | null>(null);

    //          State : 검색 버튼 상태          //
    const [isSearchButtonClicked, setIsSearchButtonClicked] = useState<boolean>(false);

    //          State : 검색어 상태          //
    const [word, setWord] = useState<string>('');

    //          State : 검색어 path variable 상태         //
    const { searchWord } = useParams();
    /* 
      const params = useParams();
        (-> params = { searchWord: 'xxx' })
      const searchWord = params.searchWord;
    */
    
    //          Event Handler : 검색어 변경 이벤트 처리 함수         //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setWord(() => value);
    };

    //          Event Handler : 검색어 Enter 키 이벤트 처리 함수         //
    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!searchButtonRef) return;
      searchButtonRef.current?.click();
    };

    //          Event Handler : 검색 버튼 클릭 이벤트 처리 함수         //
    const onSearchButtonClickHandler = () => {
      if (!isSearchButtonClicked) {
        setIsSearchButtonClicked(status => !status);
        return;
      }
      // ! 검색 실행
      navigate(SEARCH_PATH(word));
    };

    //          Effect : 검색어 path variable 변경 시 실행되는 함수         //
    useEffect(() => {
      if (searchWord) {
        setWord(searchWord);
        setIsSearchButtonClicked(true);
      }
    }, [searchWord]);

    //          Render : 검색 버튼 컴포넌트 렌더링         //
    // ! 클릭 안된 상태
    if (!isSearchButtonClicked) {
      return (
        <div className="icon-button" onClick={onSearchButtonClickHandler}>
          <div className="icon search-light-icon"></div>
        </div>
      );
    // ! 클릭 된 상태
    } else {
      return (
        <div className='header-search-input-box'>
          <input className='haeder-search-input' 
            type='text' 
            value={word}
            placeholder='검색어를 입력해주세요.' 
            onChange={onSearchWordChangeHandler}
            onKeyDown={onSearchWordKeyDownHandler}
          />
          <div className="icon-button" 
            ref={searchButtonRef} 
            onClick={onSearchButtonClickHandler}
            
          >
            <div className="icon search-light-icon"></div>
          </div>
        </div>
      );
    }
  }

  //          Component : 로그인 | 마이페이지 버튼 컴포넌트          //
  const MyPageButton = () => {

    //          State : userEmail path variable 상태          //
    const { userEmail } = useParams();

    //          Event handler : 마이페이지 버튼 클릭 이벤트 처리 함수         //
    const onMyPageButtonClickHandler = () => {
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    };

    //          Event handler : 로그인 버튼 클릭 이벤트 처리 함수         //
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    };

    //          Event handler : 로그아웃 버튼 클릭 이벤트 처리 함수         //
    const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      navigate(MAIN_PATH());
    };

    //          Render : 로그인 | 마이페이지 | 로그아웃 버튼 컴포넌트 렌더링         //
    if (isLogin && userEmail === loginUser?.email) {
      return (<div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>);
    }
    if (isLogin) {
      return (<div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>);
    }
    return (<div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>);

  };

  //          Render : Header Layout 렌더링         //
  return (
    <div id='header'>
      <div className="header-container">
        <div className="header-left-box" onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo-text'>{'Practice Board'}</div>
        </div>
        <div className="header-right-box">
          <SearchButton />
          <MyPageButton />
        </div>
      </div>
    </div>
  )
}
