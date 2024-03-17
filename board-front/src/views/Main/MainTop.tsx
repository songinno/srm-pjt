import Top3Item from "components/Top3Item";
import { top3BoardListMock } from "mocks";
import React, { useEffect, useState } from "react";
import { BoardListItem } from "types/interface";

//                  Interface : Properties                  //
interface Props {
    top3BoardList: BoardListItem[];
}

//                  Component : 메인 화면 상단 컴포넌트                   //
export const MainTop = (props: Props) => {

    //                  State : Properties                  //
    const { top3BoardList } = props;

    //                  Render : 메인 화면 상단 컴포넌트 렌더링                   //
    return (
        <div id="main-top-wrapper">
            <div className="main-top-container">
                <div className="main-top-intro">{'게시판에서\n다양한 이야기를 나눠보세요.'}</div>
                <div className="main-top-contents-box">
                    <div className="main-top-contents-title">{'월간 TOP3 게시글'}</div>
                    <div className="main-top-contents">
                        {top3BoardList.map(board => <Top3Item key={board.boardNumber} top3ListItem={board} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};