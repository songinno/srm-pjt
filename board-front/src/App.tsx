import React, { useEffect } from 'react';
import './App.css';
// import { latestBoardListMock, top3BoardListMock, commentListMock, favoriteListMock } from 'mocks';
// import BoardItem from 'components/BoardItem';
// import Top3Item from 'components/Top3Item';
// import CommentItem from 'components/CommentItem';
// import FavoriteItem from 'components/FavoriteItem';
// import InputBox from 'components/InputBox';
// import Footer from 'layouts/Footer';
import { Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import User from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import { BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH } from 'constant';
import { AUTH_PATH } from 'constant';
import { SEARCH_PATH } from 'constant';
import { USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';
import { getSignInUserRequest } from 'apis';
import { GetSignInUserResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { ResponseCode } from 'types/enum';
import { User as UserType } from 'types/interface';

//           Component : Application 컴포넌트           //
function App() {

  //          State : 로그인 유저 전역 상태         //
  const { setLoginUser, resetLoginUser } = useLoginUserStore();

  //          State : 쿠키 상태         //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies();
  
  //          Function : 로그인 유저 정보 Response 처리 함수          //
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === ResponseCode.AUTHORIZATION_FAIL 
        || code === ResponseCode.NOT_EXISTED_USER
        || code === ResponseCode.DATABASE_ERROR) {
        resetLoginUser();
        return;
    }

    const loginUser: UserType = { ...responseBody as GetSignInUserResponseDto  };
    setLoginUser(loginUser);
  };

  //          Effect : Access 토큰 쿠키 값이 변경될 때 마다 실행되는 함수         //
  // Description : Access 토큰 값이 변경되는 상황
  // 1. 로그인 카드 컴포넌트 - 로그인 버튼 클릭해서 서버에 로그인 요청 후, 생성된 토큰을 받은 경우
  // 2. Header 컴포넌트 - 로그아웃 버튼 클릭 시
  useEffect(() => {
    if (!cookies.accessToken) {
      resetLoginUser();
      return;
    }
    
    // ! 로그인 유저 정보를 가져와서 전역 상태값 업데이트
    getSignInUserRequest(cookies.accessToken)
      .then(getSignInUserResponse)
  }, [cookies.accessToken]); // TODO : 의존 배열에 setLoginUser(), resetLoginUser() -> useCallback() 고려
  
  
  //          Render : Application 컴포넌트 렌더링          //
  
  // Description : 메인 화면) 경로 - '/', 컴포넌트명 - Main //
  // Description : 로그인 + 회원가입 화면) 경로 - '/auth', 컴포넌트명 - Authentication  //
  // Description : 검색 화면) 경로 - '/search/:searchWord', 컴포넌트명 - Search  //
  // Description : 마이페이지 화면) 경로 - '/user/:userEmail', 컴포넌트명 - User  //
  // Description : 게시물 작성 화면) 경로 - '/board/write', 컴포넌트명 - BoardWrite  //
  // Description : 게시물 상세 화면) 경로 - '/board/detail/:boardNumber', 컴포넌트명 - BoardDetail  //
  // Description : 게시물 수정 화면) 경로 - '/board/update/:boardNumber', 컴포넌트명 - BoardUpdate  //
 
  return (
    <Routes>
      <Route element={<Container/>}>
        <Route path={MAIN_PATH()} element={<Main />} />
        <Route path={AUTH_PATH()} element={<Authentication />} />
        <Route path={SEARCH_PATH(':searchWord')} element={<Search />} />
        <Route path={USER_PATH(':userEmail')} element={<User />} />
        <Route path={BOARD_PATH()}>
          <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
          <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
          <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
        </Route>
        <Route path='*' element={(<h1>404 Not Found</h1>)}></Route>
      </Route>
    </Routes>
  );
}

export default App;
