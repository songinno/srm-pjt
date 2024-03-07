import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { useBoardStore } from 'stores';

//                  Component : 게시물 작성 화면 컴포넌트                   //
export default function BoardWrite() {

  //          State : 본문 영역 요소 참조 상태          //
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  //          State : 이미지 입력 요소 참조 상태          //
  const imageRef = useRef<HTMLInputElement | null>(null);
  //          State : 게시물 전역 상태          //
  const { title, setTitle } = useBoardStore();
  const { content, setContent } = useBoardStore();
  const { boardImageFileList, setBoardImageFileList } = useBoardStore();
  const { resetBoard } = useBoardStore();

  //          State : 게시물 이미지 미리보기 URL 상태         //
  const [ imageUrls, setImageUrls ] = useState<string[]>([]);

  //          Effect : 마운트 시 실행되는 함수          //
  useEffect(() => {
    resetBoard();
  }, []);

//                  Render : 게시물 작성 화면 컴포넌트 렌더링                  //
  return (
    <div id='board-write-wrapper'>
      <div className="board-write-container">
        <div className="board-write-box">
          {/* 제목 */}
          <div className="board-write-title-box">
            <input className='board-write-title-input' type="text" placeholder='제목을 작성해주세요.' value={title} />
          </div>
          <div className="divider"></div>
          {/* 본문 */}
          <div className="board-write-content-box">
            <textarea ref={contentRef} className='board-write-content-textarea' placeholder='본문을 작성해주세요.' value={content} />
            <div className="icon-button">
              <div className="icon image-box-light-icon"></div>
            </div>
            <input ref={imageRef} type='file' accept='image/*' style={{ display: 'none' }}  />
          </div>
          {/* 이미지 */}
          <div className="board-write-images-box">
            <div className="board-write-image-box">
              <img className='board-write-image' src="https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8" alt="" />
              <div className="icon-button image-close">
                <div className="icon close-icon"></div>
              </div>
            </div>
            <div className="board-write-image-box">
              <img className='board-write-image' src="https://images.unsplash.com/photo-1707327956851-30a531b70cda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D" alt="" />
              <div className="icon-button image-close">
                <div className="icon close-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
