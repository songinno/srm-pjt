import { AUTH_PATH } from 'constant';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';


//                  Component : 전체 레이아웃                   //
export default function Container() {
//                  State : 현재 페이지 pathname 상태                  //
const { pathname } = useLocation();

//					Effect : 전체 레이아웃 렌더링 시 실행					//
useEffect(() => {
	window.scrollTo(0, 0);
}, [])

//                  Render : 전체 레이아웃 렌더링                   //
  return (
    <>
        <Header />
        <Outlet />
        {pathname !== AUTH_PATH() && (<Footer />)}
    </>
  )
}
