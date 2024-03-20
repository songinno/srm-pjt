import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem } from 'types/interface';
import { latestBoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import { MAIN_PATH, SEARCH_PATH } from 'constant';
import { getRelationListRequest, getSearchListRequest } from 'apis';
import { GetSearchListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { ResponseCode } from 'types/enum';
import { t } from 'i18next';
import { GetRelationListResponseDto } from 'apis/response/search';
import { usePagination } from 'hooks';
import { Pagination } from 'components/Pagination';

//					Component : 검색 화면 컴포넌트                   //
export default function Search() {

	//					State : 검색 화면 Path Variable 상태					//
	const { searchWord } = useParams();

	//					State : 이전 검색어 상태					//
	const [ preSearchWord, setPreSearchWord ] = useState<string | undefined>(undefined);

	//					State : 페이지네이션 관련 상태					//
	const { 
        currentPage, setCurrentPage,
        currentSection, setCurrentSection,
        viewList, viewPageList, 
        totalSection,
        setTotalList 
    } = usePagination<BoardListItem>(5, 10);

	//					State : 검색 게시물 리스트 상태(임시)					//
	//	Description : 페이지네이션으로 대체
	// const [ searchBoardList, setSearchBoardList ] = useState<BoardListItem[]>([]);

	//					State : 검색 게시물 개수 상태					//
	const [ searchListCount, setSearchListCount ] = useState<number>(0);

	//					State : 연관 검색어 리스트 상태(임시)					//
	const [ relativeWordList, setRelativeWordList ] = useState<string[]>([]);

	//					Function : 네비게이트 함수					//
	const navigate = useNavigate();

	//					Event Handler : 연관 검색어 클릭 이벤트 처리					//
	const onRelativeWordClickHandler = (word: string) => {
		navigate(SEARCH_PATH(word));
	};

	//					Function : 검색 게시물 리스트 요청에 대한 응답 처리 함수					//
	const getSearchListResponse = (responseBody: GetSearchListResponseDto | ResponseDto | null) => {
		if (!responseBody) return;

		const { code, message } = responseBody;

		switch (code) {
			case ResponseCode.SUCCESS:
				break;
			default:
				alert(t(`response-message.${message}`));
				navigate(MAIN_PATH());
				return;
		}

		const { searchList } = responseBody as GetSearchListResponseDto;

		setTotalList([...searchList]);
		setSearchListCount(searchList.length);
		if (!searchWord) return;
		setPreSearchWord(searchWord);
	};

	//					Function : 연관 검색어 리스트 요청에 대한 응답 처리 함수					//
	const getRelationListResponse = (responseBody: GetRelationListResponseDto | ResponseDto | null) => {
		if (!responseBody) return;

		const { code, message } = responseBody;

		switch (code) {
			case ResponseCode.SUCCESS:
				break;
			default:
				alert(t(`response-message.${message}`));
				navigate(MAIN_PATH());
				return;
		}

		const { relativeWordList } = responseBody as GetRelationListResponseDto;

		setRelativeWordList([...relativeWordList]);
	};

	//					Effect : 검색어 변경 시 마다 실행					//
	useEffect(() => {
		if (!searchWord) return;

		window.scrollTo(0, 0);

		Promise.all([
			getSearchListRequest(searchWord, preSearchWord).then(getSearchListResponse),
			getRelationListRequest(searchWord).then(getRelationListResponse)
		]);

	}, [searchWord]);

	//                  Render : 검색 화면 컴포넌트 렌더링                   //
	return (
		<div id="search-wrapper">
			<div className="search-container">
				<div className="search-title-box">
					<div className="search-title">
						<span className='search-title-emphasis'>{searchWord}</span>{'에 대한 검색 결과입니다.'}
					</div>
					<div className="search-count">{`${viewList.length}건`}</div>
				</div>
				<div className="search-contents-box">
					{(!searchListCount)
						? (
							<div className="search-contents-nothing">
								{'검색 결과가 없습니다.'}
							</div>
						) 
						: (
							<div className="search-contents">
								{viewList.map(board => (<BoardItem key={board.boardNumber} boardListItem={board} />))}
							</div>
						)	
					}
					<div className="search-relation-box">
						<div className="search-relation-card-box">
							<div className="search-relation-card">
								<div className="search-relation-card-title">{'연관 검색어'}</div>
								{(!relativeWordList.length) 
									? (
										<div className="search-relation-card-contents-nothing">
											{'연관 검색어가 없습니다.'}
										</div>
									) 
									: (
										<div className="search-relation-card-contents">
											{relativeWordList.map((word, index) => (<div key={index} className="word-badge" onClick={() => onRelativeWordClickHandler(word)}>{word}</div>))}
										</div>
									)
								}
							</div>
						</div>
					</div>
				</div>
				{(!!searchListCount) && (
					<div className="search-pagination-box">
						<Pagination 
							currentPage={currentPage}
							currentSection={currentSection}
							setCurrentPage={setCurrentPage}
							setCurrentSection={setCurrentSection}
							viewPageList={viewPageList}
							totalSection={totalSection}
						/>
					</div>	
				)}
			</div>
		</div>
	)
}
