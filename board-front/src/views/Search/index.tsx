import React, { useEffect, useState } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { BoardListItem } from 'types/interface';
import { latestBoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';

//					Component : 검색 화면 컴포넌트                   //
export default function Search() {

	//					State : 검색 화면 Path Variable 상태					//
	const { searchWord } = useParams();

	//					State : 검색 게시물 리스트 상태(임시)					//
	const [ searchBoardList, setSearchBoardList ] = useState<BoardListItem[]>([]);

	//					State : 연관 검색어 리스트 상태(임시)					//
	const [ relativeWordList, setRelativeWordList ] = useState<string[]>([]);

	//					Effect : 마운트 시 실행 					 //
	useEffect(() => {
		setSearchBoardList(latestBoardListMock);
		setRelativeWordList(['안녕', '하이', '게시물', '가나다라', 'MySQL', 'Java', 'PostgreSQL', 'React', 'Oracle']);
	}, []);

	//                  Render : 검색 화면 컴포넌트 렌더링                   //
	return (
		<div id="search-wrapper">
			<div className="search-container">
				<div className="search-title-box">
					<div className="search-title">
						<span className='emphasis'>{searchWord}</span>{'에 대한 검색 결과입니다.'}
					</div>
					<div className="search-count">{searchBoardList.length}</div>
				</div>
				<div className="search-contents-box">
					{searchBoardList.length 
						? (
							<div className="search-contents-nothing">
								{'검색 결과가 없습니다.'}
							</div>
						) 
						: (
							<div className="search-contents">
								{searchBoardList.map(board => (<BoardItem key={board.boardNumber} boardListItem={board} />))}
							</div>
						)	
					}
					<div className="search-relation-box">
						<div className="search-relation-card-box">
							<div className="search-relation-card">
								<div className="search-relation-card-title"></div>
								<div className="search-relation-card-contents">
									{relativeWordList.map((word, index) => (<div key={index} className="word-badge">{word}</div>))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="search-pagination-box">
					{/* <Pagination /> */}
				</div>
			</div>
		</div>
	)
}
