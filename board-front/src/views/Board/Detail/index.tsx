import React from "react";
import "./style.css";
import { BoardDetailTop } from "./BoardDetailTop";
import { BoardDetailBottom } from "./BoardDetailBottom";

//                  Component : 게시물 상세 화면 컴포넌트                   //
export default function BoardDetail() {
  //                  Render : 게시물 상세 화면 컴포넌트 렌더링                   //
  return (
    <div id="board-detail-wrapper">
      <div className="board-detail-container">
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  );
}
