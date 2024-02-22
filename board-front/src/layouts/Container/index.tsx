import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';


//                  Component : 전체 레이아웃                   //
export default function Container() {
//                  State : 현재 페이지 pathname 상태                  //
const { pathname } = useLocation();

//                  Render : 전체 레이아웃 랜더링                   //
  return (
    <>
        <Header />
        <Outlet />
        {pathname !== '/auth' && (<Footer />)}
    </>
  )
}
