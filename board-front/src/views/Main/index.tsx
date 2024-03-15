import React, { useEffect, useState } from 'react';
import './style.css';
import { MainTop } from './MainTop';
import { MainBottom } from './MainBottom';
import { BoardListItem } from 'types/interface';
import { getLatestBoardListRequest, getTop3BoardListRequest } from 'apis';
import { GetLatestBoardListResponseDto, GetTop3BoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { ResponseCode } from 'types/enum';
import { useTranslation } from 'react-i18next';

//                  Component : 메인 화면 컴포넌트                   //
export default function Main() {
  console.log("----- Main 컴포넌트 렌더링 -----");
  

  //                  State : 주간 TOP3 게시물 리스트 상태         //
  const [ top3BoardList, setTop3BoardList ] = useState<BoardListItem[]>([]);

  //                  State : 최신 게시물 리스트 상태(임시)                   //
  const [ latestBoardList, setLatestBoardList ] = useState<BoardListItem[]>([]);

  //                  State : 인기 검색어 리스트 상태                   //
  const [ popularWordList, setPopularWordList ] = useState<string[]>([]);

  //                  Interface : 요청 오류 State 타입                 //
  interface RequestError {
    isError: boolean;
    errorMessage: string;
  };

  //                  State : 서버 비동기 요청 오류 및 메시지 상태               //
  const [requestError, setRequestError] = useState<RequestError>({
    isError: false,
    errorMessage: ''
  });

  //                  Function : 번역 함수                  //
  const { t } = useTranslation();

  //                  Function : 주간 TOP3 게시물 리스트 요청에 대한 응답 처리 함수                //
  const getTop3BoardListResponse = (responseBody: GetTop3BoardListResponseDto | ResponseDto | null) => {

    if (!responseBody) return;

    const { code, message } = responseBody;

    switch (code) {
      case ResponseCode.SUCCESS:
        break;
      default:
        setRequestError(prev => ({
          ...prev,
          isError: true,
          errorMessage: message
        }));
        
        return;
    }

    // ! 주간 TOP3 게시물 리스트 상태 업데이트
    const { top3List } = responseBody as GetTop3BoardListResponseDto;
    
    setTop3BoardList([...top3List]);
  };

  //                  Function : 최신 게시물 리스트 요청에 대한 응답 처리 함수                //
  const getLatestBoardListResponse = (responseBody: GetLatestBoardListResponseDto | ResponseDto | null) => {

    if (!responseBody) return;

    const { code, message } = responseBody;

    switch (code) {
      case ResponseCode.SUCCESS:
        break;
      default:
        setRequestError(prev => ({
          ...prev,
          isError: true,
          errorMessage: message
        }));
        return;
    }

    // ! 최신 게시물 리스트 상태 업데이트
    const { latestList } = responseBody as GetLatestBoardListResponseDto;
    
    setLatestBoardList([...latestList]);
  };

  //          Effect : 메인 화면 마운트 시, 실행되는 함수          //
  useEffect(() => {
    console.log("Main 컴포넌트 - Effect 함수 호출");
    
    // ! useEffect() 안에서 async-await 함수 정의
    Promise.all([getTop3BoardListRequest(), getLatestBoardListRequest()])
    .then(response => {
      getTop3BoardListResponse(response[0]);
      getLatestBoardListResponse(response[1]);
    });
    
    // // ! 주간 TOP3 게시물 리스트 요청
    // getTop3BoardListRequest()
    // .then(getTop3BoardListResponse);

    // // ! 최신 게시물 리스트 요청
    // getLatestBoardListRequest()
    //   .then(getLatestBoardListResponse);
    
    
    // ! 인기 검색어 리스트 요청

    // ! 요청 오류 시, alert
    // TODO : 이렇게 하면 받아오기 전에 alert 나갈듯
    if (requestError.isError) alert(t(`response-message.${requestError.errorMessage}`));
  }, []);


  //                  Render : 메인 화면 컴포넌트 렌더링                   //
  return (
    <>
      <MainTop top3BoardList={top3BoardList}/>
      <MainBottom latestBoardList={latestBoardList}/>
    </>
  )
}
