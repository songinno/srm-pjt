import BoardItem from "components/BoardItem";
import { Pagination } from "components/Pagination";
import { BOARD_DETAIL_PATH, BOARD_PATH, SEARCH_PATH } from "constant";
import { usePagination } from "hooks";
import { latestBoardListMock } from "mocks";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoardListItem } from "types/interface";

//                  Interface : Propperties 타입                 //
interface Props {
    latestBoardList: BoardListItem[];
    popularWordList: string[];
};

//                  Component : 메인 화면 하단 컴포넌트                   //
export const MainBottom = (props: Props) => {

    //                  State : Properties                  //
    const { latestBoardList, popularWordList } = props;

    //                  State : 페이지네이션 관련 상태                  //
    const { 
        currentPage, setCurrentPage,
        currentSection, setCurrentSection,
        viewList, viewPageList, 
        totalSection,
        setTotalList 
    } = usePagination<BoardListItem>(5, 5);

    //                  Function : 네비게이트 함수          //
    const navigate = useNavigate();

    //                  Event Handler : 인기 검색어 클릭 이벤트                 //
    const popularWordClickHandler = (word: string) => {
        navigate(SEARCH_PATH(word));
    };

    //                  Effect : 메인 하단 화면 마운트 시, 실행되는 함수                    //
    // Description : 페이지네이션을 위한 처리
    useEffect(() => {
        setTotalList([...latestBoardList]);
    }, [latestBoardList]);

    //                  Render : 메인 화면 하단 컴포넌트 렌더링                   //
    return (
        <div id="main-bottom-wrapper">
            <div className="main-bottom-container">
                <div className="main-bottom-title"></div>
                <div className="main-bottom-contents-box">
                    <div className="main-bottom-recent-contents">
                        {viewList.map(board => <BoardItem key={board.boardNumber} boardListItem={board} />)}
                    </div>
                    
                    <div className="main-bottom-popular-box">
                        <div className="main-bottom-popular-card-box">
                            <div className="main-bottom-popular-card">
                                <div className="main-bottom-popular-card-title">{'인기 검색어'}</div>
                                <div className="main-bottom-popular-card-contents">
                                    {popularWordList.map((word, index) => <div key={index} className="word-badge" onClick={() => popularWordClickHandler(word)}>{word}</div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-bottom-pagination-box">
                    <Pagination 
                        currentPage={currentPage}
                        currentSection={currentSection}
                        setCurrentPage={setCurrentPage}
                        setCurrentSection={setCurrentSection}
                        viewPageList={viewPageList}
                        totalSection={totalSection}
                    />
                </div>
            </div>
        </div>
    );
};