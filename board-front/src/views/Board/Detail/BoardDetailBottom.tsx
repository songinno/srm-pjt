import React, { useEffect, useState } from "react";
import CommentItem from "components/CommentItem";
import FavoriteItem from "components/FavoriteItem";
import { Pagination } from "components/Pagination";
import { commentListMock, favoriteListMock } from "mocks";
import { CommentListItem, FavoriteListItem } from "types/interface";

//                  Component : 게시물 상세 화면 하단 컴포넌트                   //
export const BoardDetailBottom = () => {

    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
    const [commentList, setCommentList] = useState<CommentListItem[]>([]);

    useEffect(() => {
        setFavoriteList(favoriteListMock);
        setCommentList(commentListMock);
    }, []);

    //                  Render : 게시물 상세 화면 하단 컴포넌트 렌더링                   //
    return (
        <div id="board-detail-bottom">
            <div className="board-detail-bottom-button-box">
                <div className="board-detail-bottom-button-group">
                    <div className="icon-button">
                        <div className="icon favorite-fill-icon"></div>
                    </div>
                    <div className="board-detail-bottom-button-text">{`좋아요 ${12}`}</div>
                    <div className="icon-button">
                        <div className="icon up-light-icon"></div>
                    </div>
                </div>
                <div className="board-detail-bottom-button-group">
                    <div className="icon-button">
                        <div className="icon comment-icon"></div>
                    </div>
                    <div className="board-detail-bottom-button-text">{`댓글 ${12}`}</div>
                    <div className="icon-button">
                        <div className="icon up-light-icon"></div>
                    </div>
                </div>
            </div>

            <div className="board-detail-bottom-favorite-box">
                <div className="board-detail-bottom-favorite-container">
                    <div className="board-detail-bottom-favorite-title">
                        {'좋아요'} <span className="emphasis">{12}</span>
                    </div>
                    <div className="board-detail-bottom-favorite-contents">
                        {favoriteList.map((favorite, index) => (<FavoriteItem favoriteListItem={favorite} key={index} />))}
                    </div>
                </div>
            </div>
            
            <div className="board-detail-bottom-comment-box">
                <div className="board-detail-bottom-comment-container">
                    <div className="board-detail-bottom-comment-title">
                        {'댓글'} <span className="emphasis">{12}</span>
                    </div>
                    <div className="board-detail-bottom-comment-list-container">
                        {commentList.map((comment, index) => (<CommentItem commentListItem={comment} key={index} />))}
                    </div>
                </div>
                <div className="divider"></div>
                <div className="board-detail-bottom-comment-pagination-box">
                    <Pagination />
                </div>
                <div className="board-detail-bottom-comment-input-box">
                    <div className="board-detail-bottom-comment-input-container">
                        <textarea className="board-detail-comment-textarea" placeholder={'댓글을 작성해주세요.'} />
                        <div className="board-detail-bottom-comment-button-box">
                            <div className="disable-button">{'댓글달기'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};