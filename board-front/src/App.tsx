import React, { useState } from 'react';
import './App.css';
import { latestBoardListMock, top3BoardListMock, commentListMock, favoriteListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import Top3Item from 'components/Top3Item';
import CommentItem from 'components/CommentItem';
import FavoriteItem from 'components/FavoriteItem';
import InputBox from 'components/InputBox';
import Footer from 'layouts/Footer';
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

//           Component : Application 컴포넌트           //
function App() {

  const [value, setValue] = useState<string>("");
  
  //          Render : Application 컴포넌트 랜더링          //
  
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
