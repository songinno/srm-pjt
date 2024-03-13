import React, { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react';
import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';
import { fileUploadRequest, patchBoardRequest, postBoardRequest } from 'apis';
import { PatchBoardRequestDto, PostBoardRequestDto } from 'apis/request/board';
import { PatchBoardResponseDto, PostBoardResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { ResponseCode } from 'types/enum';
import { useTranslation } from 'react-i18next';

//                  Component : Header Layout                 //
export default function Header() {

  //          State : 로그인 유저 상태         //
  const { loginUser, setLoginUser, resetLoginUser  } = useLoginUserStore();

  //          State : URL path 상태         //
  const { pathname } = useLocation();
  // console.log("pathname: " + pathname);
  
  // const isMainPage = pathname === MAIN_PATH();
  // const isAuthPage = pathname.startsWith(AUTH_PATH());
  // const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
  // const isUserPage = pathname.startsWith(USER_PATH(''));
  // const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + "/" + BOARD_DETAIL_PATH(''));
  // const isBoardWritePage = pathname.startsWith(BOARD_PATH() + "/" +BOARD_WRITE_PATH());
  // const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + "/" +BOARD_UPDATE_PATH(''));
  
  //          State : 현재 페이지 경로 일치 여부 상태         //
  const [isMainPage, setIsMainPage] = useState<boolean>(false);
  const [isAuthPage, setIsAuthPage] = useState<boolean>(false);
  const [isSearchPage, setIsSearchPage] = useState<boolean>(false);
  const [isUserPage, setIsUserPage] = useState<boolean>(false);
  const [isBoardDetailPage, setIsBoardDetailPage] = useState<boolean>(false);
  const [isBoardWritePage, setIsBoardWritePage] = useState<boolean>(false);
  const [isBoardUpdatePage, setIsBoardUpdatePage] = useState<boolean>(false);

  //          Effect : Path Name 변경 시 마다 실행되는 함수         //
  useEffect(() => {
    const isMainPage = pathname === MAIN_PATH();
    setIsMainPage(isMainPage);
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setIsAuthPage(isAuthPage);
    const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
    setIsSearchPage(isSearchPage);
    const isUserPage = pathname.startsWith(USER_PATH(''));
    setIsUserPage(isUserPage);
    const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + "/" + BOARD_DETAIL_PATH(''));
    setIsBoardDetailPage(isBoardDetailPage);
    const isBoardWritePage = pathname.startsWith(BOARD_PATH() + "/" +BOARD_WRITE_PATH());
    setIsBoardWritePage(isBoardWritePage);
    const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + "/" +BOARD_UPDATE_PATH(''));
    setIsBoardUpdatePage(isBoardUpdatePage);
  }, [pathname]);

  
  //          State : Cookie, Login 상태         //
  const [cookies, setCookies, removeCookies ] = useCookies();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  //          Effect : 로그인 유저 상태 변경 시 마다 실행되는 함수          //
  useEffect(() => {
    setIsLogin(loginUser !== null);
  }, [loginUser]);

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
      // ! 로그인 유저 전역 State 정보 삭제
      resetLoginUser();
      // ! 쿠키 삭제 (둘 다 됨)
      // setCookies('accessToken', '', { path: MAIN_PATH(), expires: new Date() })
      removeCookies('accessToken', {path: '/'});
      
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

  //          Component : 업로드 버튼 컴포넌트          //
  const UploadButton = () => {

    //          State : 게시물 상태         //
    const { title, content, boardImageFileList, resetBoard } = useBoardStore();

    //          State : 게시물 번호 Path Variable 상태          //
    const { boardNumber } = useParams();

    //          Function : 번역 함수          //
    const { t } = useTranslation();

    //          Function : 게시물 등록 Response 처리 함수         //
    const postBoardResponse = (responseBody: PostBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;

      const { code, message } = responseBody;

      switch (code) {
        case ResponseCode.SUCCESS:
          break;

        case ResponseCode.AUTHORIZATION_FAIL:
        case ResponseCode.NOT_EXISTED_USER:
          alert(t(`response-message.${message}`));
          navigate(AUTH_PATH());
          return;

        case ResponseCode.VALIDATION_FAILED:
        case ResponseCode.DATABASE_ERROR:
          alert(t(`response-message.${message}`));
          return;
        default:
          alert(t(`response-message.Unidentified code.`) + code);
          return;
      }

      // ! 등록 완료 후
      resetBoard();

      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    };

    //          Function : 게시물 수정 Response 처리 함수         //
    const patchBoardResponse = (responseBody: PatchBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;

      const { code, message } = responseBody;

      switch(code) {
        case ResponseCode.SUCCESS:
          break;
        default:
          alert(t(`response-message.${message}`));
          return;
      }

      // ! 수정 완료 후
      if (!boardNumber) return;
      navigate(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(boardNumber));
    };

    //          Event handler : 업로드 버튼 클릭 이벤트 처리         //
    const onUploadButtonClickHandler = async () => {
      
      const accessToken = cookies.accessToken;
      if (!accessToken) return;

      const boardImageList: string[] = [];

      // * 파일 업로드 요청 보내기
      for (const file of boardImageFileList) { // # 비동기 처리를 위해 for-of 사용 (forEach()는 안됨)
        const data = new FormData(); // # FormData() 객체로 생성
        data.append('file', file);

        // ! 파일 업로드 요청
        const url = await fileUploadRequest(data);
        if (url) boardImageList.push(url);
      }

      // * 현재 페이지 경로 일치 여부 상태에 따른 요청 분리
      if (isBoardWritePage) {
        // ! 게시물 등록 요청 
        const requestBody: PostBoardRequestDto = {
          title, content, boardImageList
        };

        postBoardRequest(requestBody, accessToken)
          .then(postBoardResponse);
      } else if (isBoardUpdatePage) {
        // ! 게시물 수정 요청
        if (!boardNumber) return;

        const requestBody: PatchBoardRequestDto = {
          title, content, boardImageList
        };
        
        patchBoardRequest(requestBody, boardNumber, accessToken)
          .then(patchBoardResponse);
      }


      
      
    };

    //          Render : 업로드 버튼 컴포넌트 렌더링         //
    // ! 업로드 활성화 
    if (title && content) {
      return (<div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>);
    }
    // ! 업로드 비활성화
    return (<div className='disable-button'>{'업로드'}</div>);
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
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton />}
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <MyPageButton />}
          {(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}
        </div>
      </div>
    </div>
  )
}
