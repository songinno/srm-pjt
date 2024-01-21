import React from 'react';
import './App.css';
import { latestBoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';

function App() {
  return (
    <>
      {latestBoardListMock.map(board => <BoardItem boardListItem={board}/>)}
    </>
  );
}

export default App;
