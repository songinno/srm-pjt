import React from 'react';
import './App.css';
import { latestBoardListMock, top3BoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import Top3Item from 'components/Top3Item';


function App() {
  return (
    <>
      {/* {latestBoardListMock.map(board => <BoardItem key={board.boardNumber} boardListItem={board}/>)} */}
      <div style={{display: 'flex', justifyContent: 'center', gap: '24px'}}>
        {top3BoardListMock.map(top3ListItem => <Top3Item key={top3ListItem.boardNumber} top3ListItem={top3ListItem}/>)}
      </div>
    </>
  );
}

export default App;
