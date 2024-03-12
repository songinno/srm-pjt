import React, { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import CommentItem from "components/CommentItem";
import FavoriteItem from "components/FavoriteItem";
import { Pagination } from "components/Pagination";
// import { commentListMock, favoriteListMock } from "mocks";
import { CommentListItem, FavoriteListItem } from "types/interface";
import { BoardDetailProps } from ".";
import { getCommentListRequest, getFavoriteListRequest, postCommentRequest, putFavoriteRequest } from "apis";
import { ResponseDto } from "apis/response";
import { GetCommentResponseDto, GetFavoriteListResponseDto, PostCommentResponseDto, PutFavoriteResponseDto } from "apis/response/board";
import { ResponseCode } from "types/enum";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";
import { PostCommentRequestDto } from "apis/request/board";
import { usePagination } from "hooks";

//                  Component : 게시물 상세 화면 하단 컴포넌트                   //
export const BoardDetailBottom = memo((props: BoardDetailProps) => {
    
    const { boardNumber, loginUser, board, setBoard, navigate} = props;

    //                  State : 좋아요 리스트 상태                  //
    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);

    //                  State : 페이지네이션 관련 상태                 //
    // ! 가져온 것들을 나눠서 비구조화 할당X
    const {
        currentPage, viewList, viewPageList, currentSection,  totalSection,
        setCurrentPage, setCurrentSection, setTotalList } = usePagination<CommentListItem>(3, 5);

    //                  State : 좋아요 상태                 //
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    //                  State : 좋아요 박스 표출 상태                 //
    const [showFavoriteBox, setShowFavoriteBox] = useState<boolean>(true);

    //                  State : 댓글 박스 표출 상태                  //
    const [showCommentBox, setShowCommentBox] = useState<boolean>(true);

    //                  State : 댓글 상태                   //
    const [comment, setComment] = useState<string>('');

    //                  State : 댓글 textarea 요소 참조 상태                  //
    const commentRef = useRef<HTMLTextAreaElement | null>(null);

    //                  State : 쿠키 상태                   //
    const [ cookies, setCookies, removeCookies ] = useCookies();

    //                  State : 전체 댓글 수 상태                   //
    const [totalCommentCount, setTotalCommentCount] = useState<number>(0);

    //                  Function : 번역 함수                    //
    const { t } = useTranslation();

    //                  Function : 좋아요 요청에 대한 응답 처리 함수                    //
    const putFavoriteResponse = (responseBody: ResponseDto | PutFavoriteResponseDto | null) => {
        if (!responseBody) return;

        const { code, message } = responseBody;

        switch (code) {
            case ResponseCode.SUCCESS:
                break;
            default:
                alert(t(`response-message.${message}`));
                return;
        }

        // ! 좋아요 리스트 요청 재전송
        if (!boardNumber) return;
        getFavoriteListRequest(boardNumber)
            .then(getFavoriteListResponse);
    };

    //                  Event Handler : 좋아요 버튼 클릭 이벤트                 //
    const onFaoviteButtonClickHandler = () => {
        if (!loginUser) {
            alert(t(`general-message.This service requires login.`));
            return;
        }
        if (!(boardNumber && cookies.accessToken)) return;

        // ! 좋아요 요청
        putFavoriteRequest(boardNumber, cookies.accessToken)
            .then(putFavoriteResponse) 
    };

    //                  Event Handler : 좋아요 박스 버튼 클릭 이벤트                 //
    const onFavoriteBoxButtonClick = () => {
        setShowFavoriteBox(!showFavoriteBox);
    };

    //                  Event Handler : 댓글 박스 버튼 클릭 이벤트         //
    const onCommentBoxButtonClick = () => {
        setShowCommentBox(!showCommentBox);
    };

    //                  Event Handler : 댓글 입력값 변경 이벤트                 //
    const onCommentValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        // ! 댓글달기 버튼 활성화/비활성화
        const { value } = event.target;
        setComment(value);

        // ! 댓글 작성창 Height 자동 조정
        if (!commentRef.current) return;
        commentRef.current.style.height = 'auto';
        commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    };

    //                  Function : 댓글등록 요청에 대한 응답 처리 함수                  //
    const postCommentResponse = (responseBody: ResponseDto | PostCommentResponseDto | null) => {
        if (!responseBody) return;

        const { code, message } = responseBody;

        switch(code) {
            case ResponseCode.SUCCESS:
                break;
            default:
                alert(t(`response-message.${message}`));
                return;
        }

        // ! 댓글 입력창 비우기
        setComment('');

        // ! 댓글 리스트 요청 재전송
        if (!boardNumber) return;
        getCommentListRequest(boardNumber)
            .then(getCommentListResponse);
    };

    //                  Event Handler : 댓글달기 버튼 클릭 이벤트                 //
    const onCommentSubmitButtonClickHandler = () => {
        if (!comment.trim()) return;
        
        if (!loginUser) {
            alert(t(`general-message.This service requires login.`));
            return;
        }

        if (!(boardNumber && cookies.accessToken)) return;

        // ! 댓글등록 요청
        const requestBody: PostCommentRequestDto = { content: comment };
        postCommentRequest(boardNumber, requestBody, cookies.accessToken)
            .then(postCommentResponse)

    };

    //                  Function : 작성 경과시간 산출 함수                  //
    const getElaspedTime = (writeDatetime: string | null) => {
        if (!writeDatetime) return;

        const now = dayjs().add(9, 'hour'); // # 한국 시간으로 조정
        const writeTime = dayjs(writeDatetime);

        const gap = now.diff(writeTime, 's'); // # 초단위로 차이 계산
        // # 1분 미만
        if (gap < 60) return `${gap}초 전`;
        // # 1시간 미만
        if (gap < (60 * 60)) return `${Math.floor(gap / 60)}분 전`;
        // # 하루 미만
        if (gap < (3600 * 24)) return `${Math.floor(gap / 3600)}시간 전`;
        // # 하루 초과
        return `${Math.floor(gap / 86400)}일 전`;
    };

    //                  Function : 좋아요 리스트 요청에 대한 응답 처리 함수                 //
    const getFavoriteListResponse = (responseBody: ResponseDto | GetFavoriteListResponseDto | null) => {
        if (!responseBody) return;

        const { code, message } = responseBody;

        switch (code) {
            case ResponseCode.SUCCESS:
                break;
            default:
                if (code) alert(t(`response-message.${message}`));
                else alert(t(`response-message.Unidentified code.` + code));
                return;
        }
        
        // ! 좋아요 리스트 State 업데이트
        const { favoriteList } = responseBody as GetFavoriteListResponseDto;
        const newFavoriteList = [...favoriteList];
        setFavoriteList(newFavoriteList);

        // ! 로그인 유저의 좋아요 버튼 클릭 여부 확인 및 좋아요 상태 업데이트
        if (!loginUser) {
            setIsFavorite(false);
            return;
        }
        favoriteList.forEach(favoriteItem => {
            if (loginUser.email === favoriteItem.email) {
                setIsFavorite(true);
                return;
            }
        });
    };

    //                  Function : 댓글 리스트 요청에 대한 응답 처리 함수                   //
    const getCommentListResponse = (responseBody: ResponseDto | GetCommentResponseDto | null) => {
        if (!responseBody) return;

        const { code, message } = responseBody;

        switch (code) {
            case ResponseCode.SUCCESS:
                break;
            default:
                alert(t(`response-message.${message}`));
                return;
        }
        
        // ! 작성일자 포맷 변경
        const { commentList } = responseBody as GetCommentResponseDto;

        const newCommentList = commentList.map(comment => ({
            ...comment,
            writeDatetime: getElaspedTime(comment.writeDatetime) as string
        }));
        
        // ! 댓글 리스트 State 업데이트
        setTotalList(newCommentList)
        setTotalCommentCount(newCommentList.length);
    };

    //                  Effect : 게시물 번호 Path Variable 변경 시 마다, 좋아요 및 댓글 리스트 불러오기                 //
    useEffect(() => {
        // ! 좋아요 리스트 요청
        if (!boardNumber) return;

        getFavoriteListRequest(boardNumber)
            .then(getFavoriteListResponse);

        // ! 댓글 리스트 요청
        getCommentListRequest(boardNumber)
            .then(getCommentListResponse);
    }, [boardNumber]);

    //                  Render : 게시물 상세 화면 하단 컴포넌트 렌더링                   //
    return (
        <div id="board-detail-bottom">
            <div className="board-detail-bottom-button-box">
                <div className="board-detail-bottom-button-group">
                    <div className="icon-button" onClick={onFaoviteButtonClickHandler}>
                        {isFavorite 
                            ? (<div className="icon favorite-fill-icon"></div>) 
                            : (<div className="icon favorite-light-icon"></div>)
                        }
                    </div>
                    <div className="board-detail-bottom-button-text">{`좋아요 ${favoriteList.length}`}</div>
                    <div className="icon-button" onClick={onFavoriteBoxButtonClick}>
                        {
                            showFavoriteBox 
                            ? (<div className="icon up-light-icon"></div>)
                            : (<div className="icon down-light-icon"></div>)
                        }
                        
                    </div>
                </div>
                <div className="board-detail-bottom-button-group">
                    <div className="icon-button">
                        <div className="icon comment-icon"></div>
                    </div>
                    <div className="board-detail-bottom-button-text">{`댓글 ${totalCommentCount}`}</div>
                    <div className="icon-button"  onClick={onCommentBoxButtonClick}>
                        {
                            showCommentBox 
                            ? (<div className="icon up-light-icon"></div>)
                            : (<div className="icon down-light-icon"></div>)
                        }
                    </div>
                </div>
            </div>

            {showFavoriteBox && (
                <div className="board-detail-bottom-favorite-box">
                    <div className="board-detail-bottom-favorite-container">
                        <div className="board-detail-bottom-favorite-title">
                            {'좋아요'} <span className="emphasis">{favoriteList.length}</span>
                        </div>
                        <div className="board-detail-bottom-favorite-contents">
                            {favoriteList.map((favorite, index) => (<FavoriteItem favoriteListItem={favorite} key={index} />))}
                        </div>
                    </div>
                </div>
            )}
            
            {showCommentBox && (
                <div className="board-detail-bottom-comment-box">
                    <div className="board-detail-bottom-comment-container">
                        <div className="board-detail-bottom-comment-title">
                            {'댓글'} <span className="emphasis">{totalCommentCount}</span>
                        </div>
                        <div className="board-detail-bottom-comment-list-container">
                            {viewList.map((comment, index) => (<CommentItem commentListItem={comment} key={index} />))}
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="board-detail-bottom-comment-pagination-box">
                        <Pagination  
                            currentPage={currentPage} currentSection={currentSection} 
                            setCurrentPage={setCurrentPage} setCurrentSection={setCurrentSection}
                            viewPageList={viewPageList} totalSection={totalSection}
                        />
                    </div>
                    {loginUser && (
                        <div className="board-detail-bottom-comment-input-box">
                            <div className="board-detail-bottom-comment-input-container">
                                <textarea className="board-detail-comment-textarea" ref={commentRef} placeholder={'댓글을 작성해주세요.'} onChange={onCommentValueChange} value={comment}/>
                                <div className="board-detail-bottom-comment-button-box">
                                    <div className={!comment.trim() ? 'disable-button' : 'black-button'} onClick={onCommentSubmitButtonClickHandler}>{'댓글달기'}</div>
                                </div>
                            </div>
                        </div>)
                    }
                    
                </div>
            )}
            
        </div>
    )
});