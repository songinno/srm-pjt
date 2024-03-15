import React, { Dispatch, SetStateAction } from 'react';
import './style.css';

//                  Interface : 페이지네이션 컴포넌트 Properties                    //
interface Props {
    currentPage: number;
    currentSection: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setCurrentSection: Dispatch<SetStateAction<number>>;

    viewPageList: number[];
    totalSection: number;
}

//                  Component : 페이지네이션 컴포넌트                   //
export const Pagination = (props: Props) => {
    console.log("----- 페이지네이션 컴포넌트 렌더링 -----");
    

    //                  State : Properties                  //
    const { currentPage, currentSection, viewPageList, totalSection } = props;
    const { setCurrentPage, setCurrentSection } = props;

    //                  Event Handler : 페이지 번호 클릭 이벤트 처리                    //
    const onPageNumberClickHandler = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    //                  Event Handler : 이전 버튼 클릭 이벤트 처리                    //
    const onPreviousButtonClickHandler = () => {
        if (currentSection === 1) return;

        // # ex) 2번째 섹션에서 이전 버튼 클릭 -> 1번째 섹션의 마지막 페이지로 이동
        setCurrentPage((currentSection - 1) * 5); // TODO : 5는 sectionCount
        setCurrentSection(currentSection - 1);
    };

    //                  Event Handler : 다음 버튼 클릭 이벤트 처리                    //
    const onNextButtonClickHandler = () => {
        if (currentSection === totalSection) return;

        setCurrentPage((currentSection * 5) + 1); // TODO : 5는 sectionCount
        setCurrentSection(currentSection + 1);
    };

    //                  Render : 페이지네이션 컴포넌트 렌더링                  //
    return (
        <div id="pagination-wrapper">
            <div className="pagination-change-link-box">
                <div className="icon-box-small">
                    <div className="icon expand-left-icon"></div>
                </div>
                <div className="pagination-change-link-text" onClick={onPreviousButtonClickHandler}>{'이전'}</div>
            </div>
            <div className="pagination-divider">{'|'}</div>

            {viewPageList.map((page, index) => page === currentPage 
                ? (<div className='pagination-text-active' key={index}>{page}</div>) 
                : (<div className='pagination-text' key={index} onClick={() => onPageNumberClickHandler(page)}>{page}</div>)
            )}

            <div className="pagination-divider">{'|'}</div>
            <div className="pagination-change-link-box">
                <div className="pagination-change-link-text" onClick={onNextButtonClickHandler}>{'다음'}</div>
                <div className="icon-box-small">
                    <div className="icon expand-right-icon"></div>
                </div>
            </div>
        </div>
    )
};