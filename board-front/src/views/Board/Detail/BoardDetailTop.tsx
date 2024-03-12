import React, { memo, useState } from "react";
import defaultProfileImage from 'assets/images/default_profile_image.jpg';
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from "constant";
import { BoardDetailProps } from ".";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";
import { deleteBoardRequest } from "apis";
import { ResponseDto } from "apis/response";
import { DeleteBoardResponseDto } from "apis/response/board";
import { ResponseCode } from "types/enum";
import { t } from "i18next";


//                  Component : 게시물 상세 화면 상단 컴포넌트                   //
export const BoardDetailTop = memo((props: BoardDetailProps) => {
    
    const { boardNumber, loginUser, board, setBoard, navigate, isWirter } = props;

    //                  State : 더보기 버튼 상태                    //
    const [showMoreBox, setShowMoreBox] = useState<boolean>(false);

    //                  State : 쿠키 상태                   //
    const [ cookies, setCookies ] = useCookies();

    //                  Function : 작성일자 포맷 변경 함수                  //
    const convertWriteDatetimeFormat = (writeDatetime: string | null) => {
        if (!writeDatetime) return;
        const newWriteDatetime = dayjs(writeDatetime).format('YYYY. MM. DD.');

        return newWriteDatetime;
    };

    //                  Event Handler : 더보기 버튼 클릭 이벤트                 //
    const onMoreButtonClickHandler = () => {
        setShowMoreBox(!showMoreBox);
    };

    //                  Event Handler : 닉네임 클릭 이벤트                 //
    const onNicknameClickHandler = () => {
        if (!board) return;
        navigate(USER_PATH(board.writerEmail));
    };

    //                  Event Handler : 수정 버튼 클릭 이벤트                   //
    const onUpdateButtonClickHandler = () => {
        if (!board || !loginUser) return;
        if (loginUser.email !== board.writerEmail) return;
        navigate(BOARD_PATH() + "/" + BOARD_UPDATE_PATH(board.boardNumber));
    };

    //                  Function : 게시물 삭제 요청에 대한 응답 처리 함수                   //
    const deleteBoardResponse = (responseBody: ResponseDto | DeleteBoardResponseDto | null) => {
        if (!responseBody) return;

        const { code, message } = responseBody;

        switch (code) {
            case ResponseCode.SUCCESS:
                alert(t(`response-message.${message}`));
                break;
            default:
                if (code) alert(t(`response-message.${message}`));
                else alert(t(`response-message.Unidentified code.`) + code);
                navigate(MAIN_PATH());
                return;
        }

        navigate(MAIN_PATH());
    };

    //                  Event Handler : 삭제 버튼 클릭 이벤트                   //
    const onDeleteButtonClickHandler = () => {
        if (!(board && boardNumber && loginUser && cookies.accessToken)) return;
        if (loginUser.email !== board.writerEmail) return;
        
        // ! 게시물 삭제 요청
        deleteBoardRequest(boardNumber, cookies.accessToken)
            .then(deleteBoardResponse);
    };

    //                  Render : 게시물 상세 화면 상단 컴포넌트 렌더링                   //
    if (!board) return <></>;
    return (
        <div id="board-detail-top">
            <div className="board-detail-top-header">
                <div className="board-detail-top-title">{board.title}</div>
                <div className="board-detail-top-sub-box">
                    <div className="board-detail-top-write-info-box">
                        <div className="board-detail-top-writer-profile-image" style={{'backgroundImage': `url(${board?.writerProfileImage ? board.writerProfileImage : defaultProfileImage})`}}></div>
                        <div className="board-detail-top-writer-nickname" onClick={onNicknameClickHandler}>{board.writerNickname}</div>
                        <div className="board-detail-top-info-divider">{'|'}</div>
                        <div className="board-detail-top-write-date">{convertWriteDatetimeFormat(board.writeDatetime)}</div>
                    </div>
                    {isWirter && (
                            <div className="icon-button" onClick={onMoreButtonClickHandler}>
                                <div className="icon more-icon"></div>
                            </div>
                        )
                    }
                    
                    {showMoreBox && 
                        (
                            <div className="board-detail-more-box">
                                <div className="board-detail-update-button" onClick={onUpdateButtonClickHandler}>{'수정'}</div>
                                <div className="divider"></div>
                                <div className="board-detail-delete-button" onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
                            </div>
                        ) 
                    }
                </div>
            </div>

            <div className="divider"></div>

            <div className="board-detail-top-main">
                <div className="board-detail-main-text">{board.content}</div>
                {board.boardImageList.map((image, index) => (
                    <img src={image} alt="" className="board-detail-main-image" key={index} />
                ))}
            </div>
        </div>
    )
});