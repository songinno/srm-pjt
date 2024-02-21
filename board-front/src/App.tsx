import React, { useState } from 'react';
import './App.css';
import { latestBoardListMock, top3BoardListMock, commentListMock, favoriteListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import Top3Item from 'components/Top3Item';
import CommentItem from 'components/CommentItem';
import FavoriteItem from 'components/FavoriteItem';
import InputBox from 'components/InputBox';

function App() {

  const [value, setValue] = useState<string>("");
  return (
    <>
      {/* {latestBoardListMock.map(board => <BoardItem key={board.boardNumber} boardListItem={board}/>)} */}

      {/* <div style={{display: 'flex', justifyContent: 'center', gap: '24px'}}>
        {top3BoardListMock.map(top3ListItem => <Top3Item key={top3ListItem.boardNumber} top3ListItem={top3ListItem}/>)}
      </div> */}

      {/* <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {commentListMock.map((comment, index) => <CommentItem key={index} commentListItem={comment} />)}
      </div> */}

      {/* <div style={{ display: 'flex', columnGap: '30px', rowGap: '20px' }}>
        {favoriteListMock.map((favorite, index) => <FavoriteItem key={index} favoriteListItem={favorite}/>)}
      </div> */}

      <InputBox label='이메일' type='text' placeholder='이메일 주소를 입력해주세요' value={value} error={true} setValue={setValue} message='아무것도 입력 안했다.'/>

    </>
  );
}

export default App;
