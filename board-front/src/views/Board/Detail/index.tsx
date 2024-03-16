import React, { memo, useEffect, useState } from "react";
import "./style.css";
import { BoardDetailTop } from "./BoardDetailTop";
import { BoardDetailBottom } from "./BoardDetailBottom";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useLoginUserStore } from "stores";
import { Board, User } from "types/interface";
// import { boardMock } from "mocks";
import { MAIN_PATH } from "constant";
import { getBoardRequest, viewCountUpRuquest } from "apis";
import { GetBoardResponseDto, ViewCountUpResponseDto } from "apis/response/board";
import { ResponseDto } from "apis/response";
import { useTranslation } from "react-i18next";
import { ResponseCode } from "types/enum";
import { useCookies } from "react-cookie";


//          Interface : 하위 컴포넌트 전달 Props 타입         //
export interface BoardDetailProps {
    boardNumber: string | undefined;
    loginUser: User | null;
    board: Board | null;
    setBoard?: React.Dispatch<React.SetStateAction<Board | null>>;
    navigate: NavigateFunction;
    isWirter?: boolean;
}

//                  Component : 게시물 상세 화면 컴포넌트                   //
function BoardDetail() {

  //                  State : 게시물 번호 path variable 상태          //
  const { boardNumber } = useParams();

  //                  State : 로그인 유저 상태          //
  const { loginUser } = useLoginUserStore();

  //                  State : 게시물 상태                 //
  const [board, setBoard] = useState<Board | null>(null);

  //                  State : 작성자 여부 상태                    //
  const [isWriter, setIsWriter] = useState<boolean>(false);

  //          Function : 네비게이트 함수          //
  const navigate = useNavigate();

  //          Function : 번역 함수          //
  const { t } = useTranslation();

  //          Function : 게시물 불러오기 요청, 응답 처리 함수          //
  const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
    if (!responseBody) return;

    // ! 응답 결과에 따른 처리
    const { code, message } = responseBody;

    switch (code) {
      case ResponseCode.SUCCESS:
        break;
      case ResponseCode.NOT_EXISTED_BOARD:
      case ResponseCode.DATABASE_ERROR:
        alert(t(`response-message.${message}`));
        navigate(MAIN_PATH());
        return;
      default:
        if (code) alert(t(`response-message.${message}`));
        else alert(t(`response-message.Unidentified code.`) + code);
        navigate(MAIN_PATH());
        return;
    }

    // ! 게시물 상태 업데이트
    const newBoard: Board = {...responseBody as GetBoardResponseDto};
    setBoard(newBoard);

    // ! 작성자 여부 확인
    if (!loginUser) {
      setIsWriter(false);
      return;
    }
    setIsWriter(loginUser.email === newBoard.writerEmail);
  };

  //                  Effect : 게시물 번호 Path Variable 변경 시 마다, 해당 게시물 정보 불러오기                   //
  useEffect(() => {
    // setBoard(boardMock); // # boardMock으로 임시
    if (!boardNumber) {
      navigate(MAIN_PATH());
      return;
    }
    getBoardRequest(boardNumber)
      .then(getBoardResponse)
  }, [boardNumber]);

  //          Function : 조회수 카운트업 요청, 응답 처리 함수          //
  const viewCountUpResponse = (responseBody: ResponseDto | ViewCountUpResponseDto | null) => {
    if (!responseBody) return;

    const { code, message } = responseBody;

    switch (code) {
      case ResponseCode.SUCCESS:
        break;
      case ResponseCode.NOT_EXISTED_BOARD:
      case ResponseCode.DATABASE_ERROR:
        alert(t(`response-message.${message}`));
        navigate(MAIN_PATH());
        return;
      default:
        if (code) alert(t(`response-message.${message}`));
        else alert(t(`response-message.Unidentified code.`) + code);
        navigate(MAIN_PATH());
        return;
    }
  };

  //                  Effect : 게시물 번호 Path Variable 변경 시 마다, 해당 게시물 조회수 증가                   //
  // TODO : 어떤 원리인지 확인 필요
  // TODO : strict mode를 해제하면 조회수가 안올라감
  // let effectFlag = true;
  useEffect(() => {
    
    if (!boardNumber) return;
    // if (effectFlag) {
    //   effectFlag = false;
    //   return;
    // }

    viewCountUpRuquest(boardNumber)
      .then(viewCountUpResponse)
  }, [boardNumber]);


  //                  Render : 게시물 상세 화면 컴포넌트 렌더링                   //
  return (
    <div id="board-detail-wrapper">
      <div className="board-detail-container">
        <BoardDetailTop 
          boardNumber={boardNumber} 
          loginUser={loginUser} 
          board={board} 
          setBoard={setBoard}
          navigate={navigate}
          isWirter={isWriter}
        />
        <BoardDetailBottom
          boardNumber={boardNumber} 
          loginUser={loginUser} 
          board={board} 
          setBoard={setBoard}
          navigate={navigate}
        />
      </div>
    </div>
  );
}

export default memo(BoardDetail);