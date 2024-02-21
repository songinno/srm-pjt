import React from 'react';
import './style.css';
import { FavoriteListItem } from 'types/interface';
import defaultProfileImage from 'assets/images/default_profile_image.jpg';

interface Props {
    favoriteListItem: FavoriteListItem;
}

/* ---------- component : Favorite List Item 컴포넌트 ---------- */
export default function FavoriteItem(props: Props) {
    const { favoriteListItem } = props;
    
/* ---------- Properties ---------- */
    const { nickname, profileImage } = favoriteListItem;

/* ---------- render : favorite list item 컴포넌트 랜더링 ---------- */
    return (
        <div className='favorite-list-item'>
            <div className='favorite-list-item-profile-box'>
                <div className='favorite-list-item-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})` }}></div>
            </div>
            <div className='favorite-list-item-nickname'>{nickname}</div>
        </div>
    )
}
