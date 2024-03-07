import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useBoardStore } from 'stores';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

//                  Component : 게시물 작성 화면 컴포넌트                   //
export default function BoardWrite() {

  //          State : 제목 영역 요소 참조 상태          //
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  //          State : 본문 영역 요소 참조 상태          //
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  //          State : 이미지 입력 요소 참조 상태          //
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  //          State : 게시물 전역 상태          //
  const { title, setTitle } = useBoardStore();
  const { content, setContent } = useBoardStore();
  const { boardImageFileList, setBoardImageFileList } = useBoardStore();
  const { resetBoard } = useBoardStore();

  //          State : 게시물 이미지 미리보기 URL 상태         //
  const [ imageUrls, setImageUrls ] = useState<string[]>([]);

  //          Function : 네비게이트 함수          //
  const navigate = useNavigate();

  //          Function : 번역 함수          //
  const { t } = useTranslation();

  //          State : 쿠키 상태         //
  const [ cookies, setCookies ] = useCookies();

  //          Effect : 마운트 시 실행되는 함수          //
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      alert(t("general-message.Cookie does not exist."));
      navigate(MAIN_PATH());
      return;
    }
    resetBoard();
  }, []);

  //          Event Handler : 제목 입력값 변경 이벤트 처리         //
  const onTitleValueChangeHanler = (event:ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTitle(value);

    // ! 스크롤 안보이게 처리
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  };

  //          Event Handler : 본문 입력값 변경 이벤트 처리         //
  const onContentValueChangeHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setContent(value);

    // ! 스크롤 안보이게 처리
    // Description : 스크롤은 있으나, 스크롤이 생기면 그만큼 height를 계속 늘리면서, 스크롤을 안보이게 하는 방식
    if (!contentRef.current) return;
    contentRef.current.style.height = 'auto';
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  };

  //          Event Handler : 이미지 업로드 버튼 클릭 이벤트 처리         //
  const onImageUploadButtonClickHandler = () => {
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  };

  //          Event Handler : 첨부 이미지 변경 이벤트 처리         //
  const onImageFileChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files || !files.length) return;

    // ! 미리보기용 이미지 상태 업데이트
    const file = files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrls(prev => [...prev, imageUrl]);

    // ! 실제 업로드용 이미지 상태 업데이트
    const newBoardImageFileList = [...boardImageFileList, file];
    setBoardImageFileList(newBoardImageFileList); // # 전역객체 -> 함수형 업데이트로 X (store에서 구현해놓음)

    // ! 동일한 이미지 중복 첨부할 수 있도록 처리
    // Description : 파일을 등록 하고 나면, input의 value 속성 값으로 파일 경로가 남아 있어, 이후 동일한 파일 등록 시 변경 감지를 못해서 등록이 안됨
    if (!imageInputRef.current) return;
    imageInputRef.current.value = '';
  };

  //          Event Handler : 이미지 닫기 버튼 클릭 이벤트 처리         //
  const onImageCloseButtonClickHandler = (deleteIndex: number) => {
    if (!imageInputRef.current) return;
    
    // ! 미리보기 이미지 상태 업데이트
    setImageUrls(imageUrls.filter((imageUrl, index) => index !== deleteIndex));

    // ! 실제 업로드용 이미지 상태 업데이트
    const newBoardImageFileList = boardImageFileList.filter((boardImageFile, index) => index !== deleteIndex);
    setBoardImageFileList(newBoardImageFileList);
  };

//                  Render : 게시물 작성 화면 컴포넌트 렌더링                  //
  return (
    <div id='board-write-wrapper'>
      <div className="board-write-container">
        <div className="board-write-box">
          {/* 제목 */}
          <div className="board-write-title-box">
            <textarea ref={titleRef} className='board-write-title-textarea' rows={1} placeholder='제목을 작성해주세요.' value={title} onChange={onTitleValueChangeHanler} />
          </div>
          <div className="divider"></div>
          {/* 본문 */}
          <div className="board-write-content-box">
            <textarea ref={contentRef} className='board-write-content-textarea' placeholder='본문을 작성해주세요.' value={content} onChange={onContentValueChangeHandler} />
            <div className="icon-button" onClick={onImageUploadButtonClickHandler}>
              <div className="icon image-box-light-icon"></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onImageFileChangeHandler} />
          </div>
          {/* 이미지 */}
          <div className="board-write-images-box">
            {imageUrls.map((imageUrl, index) => (
              <div className="board-write-image-box" key={index}>
                <img className='board-write-image' src={imageUrl} alt="" />
                <div className="icon-button image-close" onClick={() => onImageCloseButtonClickHandler(index)}>
                  <div className="icon close-icon"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
