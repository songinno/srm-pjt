import React from 'react';
import './style.css';
import { CommentListItem } from 'types/interface';
import defaultProfileImage from 'assets/images/default_profile_image.jpg';

//                  Interface: Comment List Item 컴포넌트 Properties                  //
interface Props {
    commentListItem: CommentListItem;
}

//                   Component : Comment List Item 컴포넌트                  //
export default function CommentItem(props: Props) {
    const { commentListItem } = props;

// Properties //
const { nickname, profileImage, writeDatetime, content } = commentListItem;

//                  Render : Board List Item 컴포넌트 랜더링                    //
  return (
    <div className='comment-list-item'>
        <div className='comment-list-item-top'>
            <div className='comment-list-item-profile-box'>
                <div className='comment-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
            </div>
            <div className='comment-list-item-nickname'>{nickname}</div>
            <div className='comment-list-item-divider'>{'|'}</div>
            <div className='comment-list-item-time'>{writeDatetime}</div>
        </div>
        <div className='comment-list-item-main'>
            <div className='comment-list-item-content'>{content}</div>
        </div>
    </div>
  )
}
