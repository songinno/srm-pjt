import BoardItem from 'components/BoardItem';
import { Pagination } from 'components/Pagination';
import { BOARD_PATH, BOARD_WRITE_PATH, USER_PATH } from 'constant';
import { usePagination } from 'hooks';
import { t } from 'i18next';
// import { boardMock, latestBoardListMock } from 'mocks';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLoginUserStore } from 'stores';
import { BoardListItem } from 'types/interface';

//                  Interface : 유저 페이지 하단 컴포넌트 Propperties                 //
interface Props {
    isMyPage: boolean;
    userBoardList: BoardListItem[];
}

//                  Component : 유저 페이지 하단 컴포넌트                   //
export const UserPageBottom = (props: Props) => {
    
    //                  State : Properties                  //
    const { isMyPage, userBoardList } = props;

    //                  State : 유저 게시물 개수 상태                  //
    const [ userBoardCount, setUserBoardCount ] = useState<number>(0);

    //                  State : 로그인 유저 전역 상태                   //
    const { loginUser } = useLoginUserStore();

    //                  State : 페이지네이션 관련 상태                  //
    const { 
        currentPage, setCurrentPage,
        currentSection, setCurrentSection,
        viewList, viewPageList, 
        totalSection,
        setTotalList 
    } = usePagination<BoardListItem>(5, 5);

    //                  Function : 네비게이트 함수                  //
    const navigate = useNavigate();

    //                  Event Handler : 사이드 카드 클릭 이벤트 처리                  //
    const onSideCardClickHandler = () => {
        if (isMyPage) {
            navigate(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
        } else {
            if (!loginUser) {
                alert(t(`general-message.This service requires login.`));
                return;
            }
            navigate(USER_PATH(loginUser.email));
        }
    };

    //                  Effect : 특정 유저 게시물 리스트 변경 시 마다 실행                   //
    useEffect(() => {
        setTotalList(userBoardList);
        setUserBoardCount(userBoardList.length);
    }, [userBoardList]);

    //                  Render : 유저 페이지 하단 컴포넌트 렌더링                   //
    return (
        <div id='user-bottom-wrapper'>
            <div className="user-bottom-container">
                <div className="user-bottom-title">{isMyPage ? `내 게시물 ${userBoardCount}` : `게시물 ${userBoardCount}`}</div>
                <div className="user-bottom-contents-box">
                    {userBoardCount 
                        ? (<div className="user-bottom-contents">
                                {viewList.map(board => (<BoardItem key={board.boardNumber} boardListItem={board} />))}
                            </div>) 
                        : (<div className="user-bottom-contents-nothing">{'게시물이 없습니다.'}</div>)
                    }
                    <div className="user-bottom-side-box">
                        <div className="user-bottom-side-card" onClick={onSideCardClickHandler}>
                            <div className="user-bottom-side-container">
                                {isMyPage 
                                    ? (<>
                                            <div className='icon-box'>
                                                <div className="icon edit-icon"></div>
                                            </div>
                                            <div className="user-bottom-side-text">{'글쓰기'}</div>
                                        </>
                                    ) 
                                    : (<>
                                            <div className="user-bottom-side-text">{'내 게시물로 가기'}</div>
                                            <div className="icon-box">
                                                <div className="icon arrow-right-icon"></div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {(!!userBoardCount) && (
                    <div className="user-bottom-pagination-box">
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
    );
};
