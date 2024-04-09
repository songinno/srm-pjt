import React, { useEffect } from 'react';
import './style.css';
import Accordion from 'react-bootstrap/Accordion';

export const Statistics = () => {

    //                  Effect : 마운트 시 실행                 //
    useEffect(() => {
        
    }, []);

    return (
        <Accordion id='statistics-wrapper' defaultActiveKey={['0', '1']} alwaysOpen>
            <Accordion.Item eventKey="0" className='statistics-container'>
                <Accordion.Header className='statistics-header'>{'인기검색어 TOP 10'}</Accordion.Header>
                <Accordion.Body className='statistics-box'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className='statistics-container'>
                <Accordion.Header className='statistics-header'>{'인기 게시글 TOP 10'}</Accordion.Header>
                <Accordion.Body className='statistics-box'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};