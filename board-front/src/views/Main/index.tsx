import React, { useEffect, useState } from 'react';
import './style.css';
import { MainTop } from './MainTop';
import { MainBottom } from './MainBottom';
import { BoardListItem } from 'types/interface';
import { getLatestBoardListRequest, getPopularListRequest, getTop3BoardListRequest } from 'apis';
import { GetLatestBoardListResponseDto, GetTop3BoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { ResponseCode } from 'types/enum';
import { useTranslation } from 'react-i18next';
import GetPopularListResponseDto from 'apis/response/search/get-popular-list.response.dto';

//                  Component : 메인 화면 컴포넌트                   //
export default function Main() {

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

    if (!responseBody) return ;

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

  //                  Function : 인기 검색어 리스트 요청에 대한 응답 처리 함수                //
  const getPopularListResponse = (responseBody: GetPopularListResponseDto | ResponseDto | null) => {

    if (!responseBody) return ;

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
    const { popularWordList } = responseBody as GetPopularListResponseDto;
    setPopularWordList([...popularWordList]);
  };

  //          Effect : 메인 화면 마운트 시, 실행되는 함수          //
  useEffect(() => {
    // TODO : 각 요청에 대한 응답 함수에서 requestError 상태를 변경하는데, 응답보다 빨라서인지 바뀌어 있지를 않음. 코드 바꾸고 저장하면 또 뜨고... (방법 모색해야함)
    Promise.all([
      getTop3BoardListRequest().then(getTop3BoardListResponse), 
      getLatestBoardListRequest().then(getLatestBoardListResponse),
      getPopularListRequest().then(getPopularListResponse)
    ])
  }, []);

  //                  Render : 메인 화면 컴포넌트 렌더링                   //
  return (
    <>
      <MainTop top3BoardList={top3BoardList}/>
      <MainBottom latestBoardList={latestBoardList}/>
    </>
  )
}
