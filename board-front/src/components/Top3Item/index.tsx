import React from 'react';
import './style.css';
import defaultProfileImage from 'assets/images/default_profile_image.jpg';
import { BoardListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import { BOARD_DETAIL_PATH, BOARD_PATH } from 'constant';

//          Interface : TOP 3 List Item         //
interface Props {
  top3ListItem: BoardListItem
}

//          Component : TOP 3 List Item 컴포넌트           //
export default function Top3Item(props: Props) {
  // properties //
  const {top3ListItem} = props;
  const { boardNumber, title, content, boardTitleImage } = top3ListItem;
  const { favoriteCount, commentCount, viewCount } = top3ListItem;
  const { writeDatetime, writerNickname, writerProfileImage } = top3ListItem;

  //          Function : 네비게이트 함수          //
  const navigate = useNavigate();

  //          Event Handler : 게시물 아이템 클릭 이벤트 처리 함수           //
  const onClickHandler = () => {
    navigate(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(boardNumber));
  };

  //          Render : TOP 3 List Item 컴포넌트 렌더링           //
  return (
    <div className='top-3-list-item' onClick={onClickHandler}
      style={{backgroundImage: `url(${boardTitleImage})`}}>
      <div className='top-3-list-item-main-box'>
        <div className='top-3-list-item-top'>
          <div className='top-3-list-item-profile-box'>
            <div className='top-3-list-item-profile-image' 
              style={{backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})`}}></div>
          </div>
          <div className='top-3-list-item-write-box'>
            <div className='top-3-list-item-nickname'>{writerNickname}</div>
            <div className='top-3-list-item-write-date'>{writeDatetime}</div>
          </div>
        </div>
        <div className='top-3-list-item-middle'>
          <div className='top-3-list-item-title'>{title}</div>
          <div className='top-3-list-item-content'>{content}</div>
        </div>
        <div className='top-3-list-item-bottom'>
          <div className='top-3-list-item-counts'>
            {`댓글 ${commentCount} ・ 좋아요 ${favoriteCount} ・ 조회수 ${viewCount}`}
          </div>
        </div>
      </div>
    </div>
  )
}
