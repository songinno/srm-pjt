import { useEffect, useState } from "react";

const usePagination = <T>(viewCount: number, sectionCount: number) => {
    // # viewCount : 한 페이지에서 보여줄 객체의 개수
    // # sectionCount : 한 페이지에서 보여줄 섹션의 개수 Ex) <1, 2, 3, 4, 5> => 5
    // ! 객체)
    //                  State : 전체 객체 리스트 상태                   //
    // Description: 객체 타입은 댓글, 게시물 등 타입이 올 수 있음 -> Generic 이용
    const [ totalList, setTotalList ] = useState<T[]>([]);
    //                  State : 보여줄 객체 리스트 상태                 //
    const [ viewList, setViewList ] = useState<T[]>([]);
    // ! 페이지)
    //                  State : 현재 페이지 번호 상태                    //
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    //                  State : 전체 페이지 번호 리스트 상태                    //
    const [ totalPageList, setTotalPageList ] = useState<number[]>([1]);
    //                  State : 보여줄 페이지 번호 리스트 상태                 //
    const [ viewPageList, setViewPageList ] = useState<number[]>([1]);
    // ! 섹션)
    //                  State : 현재 섹션 상태                 //
    const [ currentSection, setCurrentSection ] = useState<number>(1);
    //                  State : 전체 섹션 상태                 //
    const [ totalSection, setTotalSection ] = useState<number>(1);

    //                  Function : 보여줄 객체 리스트 추출 함수                 //
    const getViewList = () => {
        const firstIndex = viewCount * (currentPage - 1);
        // const lastIndex = (viewCount * currentPage) - 1;
        const lastIndex = (viewCount * currentPage); // # slice(start 이상, end 미만)로 할거라, -1을 제거하고 계산

        const viewList = totalList.slice(firstIndex, (totalList.length > lastIndex ? lastIndex : totalList.length));
        // # 인덱스 [102, 103, 104]에서 103 > 104 = false -> 103인덱스 미만까지 slice
        setViewList(viewList);
    };

    //                  Function : 보여줄 페이지 리스트 추출 함수                 //
    const getViewPageList = () => {
        const firstIndex = sectionCount * (currentSection - 1);
        const lastIndex = sectionCount * currentSection;

        const viewPageList = totalPageList.slice(firstIndex, (totalPageList.length > lastIndex ? lastIndex : totalPageList.length));
        setViewPageList(viewPageList);
    };

    //                  Effect : Total List 변경 시 마다 실행되는 함수                  //
    useEffect(() => {
        // ! Total Page와 Total Section 결정
        const totalPage = Math.ceil(totalList.length / viewCount);
        const totalSection = Math.ceil(totalList.length / (viewCount * sectionCount)); // # 103개를 한 페이지 당 3개씩, 기본 10개 섹션 -> 한 섹션에서 30개씩 -> 4개 섹션 필요
        
        const totalPageList: number[] = [];
        for (let page = 1; page <= totalPage; page++) {
            totalPageList.push(page);
        }

        setTotalPageList(totalPageList);
        setTotalSection(totalSection);

        setCurrentPage(1);
        setCurrentSection(1);

        getViewList();
        getViewPageList();
    }, [totalList]);

    //                  Effect : Current Page 변경 시 마다 실행되는 함수                  //
    useEffect(() => {
        getViewList();
    }, [currentPage]);

    //                  Effect : Current Section 변경 시 마다 실행되는 함수                  //
    useEffect(() => {
        getViewPageList();
    }, [currentSection]);

    return {
        currentPage, setCurrentPage,
        currentSection, setCurrentSection,
        viewList, viewPageList, 
        totalSection, 
        setTotalList
    };
};

export default usePagination;