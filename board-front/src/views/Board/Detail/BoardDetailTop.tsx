import React, { useState } from "react";
import defaultProfileImage from 'assets/images/default_profile_image.jpg';

//                  Component : 게시물 상세 화면 상단 컴포넌트                   //
export const BoardDetailTop = () => {

    //                  State : 더보기 버튼 상태                    //
    const [showMoreBox, setShowMoreBox] = useState<boolean>(false);
    
    //                  Event Handler : 더보기 버튼 클릭 이벤트                 //
    const onMoreButtonClickHandler = () => {
        setShowMoreBox(!showMoreBox);
    };

    //                  Render : 게시물 상세 화면 상단 컴포넌트 렌더링                   //
    return (
        <div id="board-detail-top">
            <div className="board-detail-top-header">
                <div className="board-detail-top-title">{'오늘 점심 뭐먹지 맛있는 거 먹고 싶은데 추천 부탁 오늘 점심 뭐먹지 맛있는 거 먹고 싶은데'}</div>
                <div className="board-detail-top-sub-box">
                    <div className="board-detail-top-write-info-box">
                        <div className="board-detail-top-writer-profile-image" style={{'backgroundImage': `url(${defaultProfileImage})`}}></div>
                        <div className="board-detail-top-writer-nickname">{'안녕하세요나는주코야끼'}</div>
                        <div className="board-detail-top-info-divider">{'|'}</div>
                        <div className="board-detail-top-write-date">{'2022. 05. 12.'}</div>
                    </div>
                    <div className="icon-button" onClick={onMoreButtonClickHandler}>
                        <div className="icon more-icon"></div>
                    </div>
                    {showMoreBox && 
                        (
                            <div className="board-detail-more-box">
                                <div className="board-detail-update-button">{'수정'}</div>
                                <div className="divider"></div>
                                <div className="board-detail-delete-button">{'삭제'}</div>
                            </div>
                        ) 

                    }
                </div>
            </div>

            <div className="divder"></div>

            <div className="board-detail-top-main">
                <div className="board-detail-main-text">{'오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 오늘 점심을 뭐먹을 지 너무 고민이 되는 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 ...'}</div>
                <img src="https://cdn.pixabay.com/photo/2024/02/25/13/30/coffee-8595772_640.jpg" alt="" className="board-detail-main-image" />
            </div>
        </div>
    )
};