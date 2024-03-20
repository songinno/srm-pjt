import React from 'react';
import './style.css';


//                  Component : Footer Layout                   //
export default function Footer() {

//                  Event Handler : 노션 아이콘 버튼 클릭 이벤트 처리                   //
const onNotionIconButtonClickHandler = () => {
    window.open("https://powerful-homburg-7c8.notion.site/REST-API-011a3c736e7242c296d623b96154d276");
};

//                  Event Handler : 노션 아이콘 버튼 클릭 이벤트 처리                   //
const onGithubIconButtonClickHandler = () => {
    window.open("https://github.com/songinno/srm-pjt");
};

//                  Event Handler : 인스타 아이콘 버튼 클릭 이벤트 처리                 //
// const onInstaIconButtonClickHandler = () => {
//     window.open('https://instagram.com');
// };

//                  Event Handler : 네이버 블로그 아이콘 버튼 클릭 이벤트 처리                 //
// const onNaverBlogIconButtonClickHandler = () => {
//     window.open('https://blog.naver.com');
// };


//                  Render : Footer Layout 렌더링                   //
  return (
    <div id="footer">
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo-box'>
                    <div className='icon-box'>
                        <div className="icon logo-light-icon"></div>
                    </div>
                    <div className="footer-logo-text">{'Practice Board'}</div>
                </div>
                <div className='footer-link-box'>
                    <div className="footer-email-link">{'songinno@naver.com'}</div>
                    <div className="icon-button">
                        <div className="icon notion-icon" onClick={onNotionIconButtonClickHandler}></div>
                    </div>
                    <div className="icon-button">
                        <div className="icon github-icon" onClick={onGithubIconButtonClickHandler}></div>
                    </div>
                    {/* <div className="icon-button">
                        <div className="icon insta-icon" onClick={onInstaIconButtonClickHandler}></div>
                    </div>
                    <div className="icon-button">
                        <div className="icon naver-blog-icon" onClick={onNaverBlogIconButtonClickHandler}></div>
                    </div> */}
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='footer-copyright'>{'Copyright © 2024 SongInNo. All Rights Reserved.'}</div>
            </div>
        </div>
    </div>
    
  )
}
