import React, { MouseEventHandler } from 'react';
import './style.css';
import { BoardListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
// 기본 프로필 이미지
import defaultProfileImage from 'assets/images/default_profile_image.jpg';
import { BOARD_DETAIL_PATH, BOARD_PATH } from 'constant';

//                  Interface: Baord List Item 컴포넌트 Properties                  //
interface Props {
    boardListItem: BoardListItem;
}

//                  Component : Board List Item 컴포넌트                    //
// export default function BoardItem({ boardListItem }: Props) {
export default function BoardItem(props: Props) {
    const {boardListItem} = props;
    
    // properties //
    const { boardNumber, title, content, boardTitleImage } = boardListItem;
    const { favoriteCount ,commentCount, viewCount } = boardListItem;
    const { writeDatetime, writerNickname, writerProfileImage } = boardListItem;

    //                   Function : 네비게이트 함수                  //
    const navigate = useNavigate();

    //                  Event Handler : 게시물 아이템 클릭 이벤트 처리 함수                     //
    const onClickHandler = () => {
       navigate(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(boardNumber));
    };

    //                  Render: Board List Item 컴포넌트 렌더링                  //
    return (
        <div className='board-list-item' onClick={onClickHandler}>
            <div className='board-list-item-main-box'>
                <div className='board-list-item-top'>
                    <div className='board-list-item-profile-box'>
                        <div className='board-list-item-profile-image' style={{backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})`}}></div>
                    </div>
                    <div className='board-list-item-write-box'>
                        <div className='board-list-item-nickname'>
                            {writerNickname}
                        </div>
                        <div className='board-list-item-write-date'>
                            {writeDatetime}
                        </div>
                    </div>
                </div>
                <div className='board-list-item-middle'>
                    <div className='board-list-item-title'>
                        {title}
                    </div>
                    <div className='board-list-item-content'>
                        {content}
                    </div>
                </div>
                <div className='board-list-item-bottom'>
                    <div className='board-list-item-counts'>
                        {`댓글 ${commentCount} ・ 좋아요 ${favoriteCount} ・ 조회수 ${viewCount}`}
                    </div>
                </div>
            </div>
            {/* 게시글 타이틀 이미지가 null이 아닌 경우 */}
            {boardTitleImage !== null && (
                <div className='board-list-item-image-box'>
                <div className='board-list-item-image' style={{backgroundImage: `url(${boardTitleImage})`}}></div>
            </div>
            )}
        </div>
    )
}
