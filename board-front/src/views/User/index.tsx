import React, { useEffect, useState } from 'react';
import './style.css';
import { UserPageTop } from './UserPageTop';
import { UserPageBottom } from './UserPageBottom';
import { BoardListItem, User } from 'types/interface';
import { useParams } from 'react-router-dom';
import UserMock from 'mocks/user.mock';
import { latestBoardListMock } from 'mocks';
import { getUserBoardListRequest, getUserRequest } from 'apis';
import { GetUserResponseDto } from 'apis/response/user';
import { GetUserBoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { ResponseCode } from 'types/enum';
import { t } from 'i18next';
import { useLoginUserStore } from 'stores';

//                  Component : 유저 화면 컴포넌트                   //
export default function UserPage() {

	//					State : 마이 페이지 상태					//
	const [ isMyPage, setIsMyPage ] = useState<boolean>(false);

	//					State : userEmail Path Variable 상태					//
	const { userEmail } = useParams();

	//					State : 유저 정보 상태					//
	const [ user, setUser ] = useState<User>({
		email: '',
		nickname: '',
		profileImage: ''
	});

	//					State : 특정 유저 게시물 리스트 상태					//
    const [ userBoardList, setUserBoardList ] = useState<BoardListItem[]>([]);

	//					State : 로그인 유저 전역 상태					//
	const { loginUser } = useLoginUserStore();

	//					Function : 유저 정보 요청에 대한 응답 처리 함수					//
	const getUserResponse = (responseBody: GetUserResponseDto | ResponseDto | null) => {
		if (!responseBody) return;

		const { code, message } = responseBody;

		switch (code) {
			case ResponseCode.SUCCESS:
				break;
			default:
				alert(t(`response-message.${message}`));
				return;
		}

		const { email, nickname, profileImage } = responseBody as GetUserResponseDto;

		// ! 유저 정보 State 업데이트
		setUser(prev => ({
			...prev,
			email,
			nickname,
			profileImage
		}));

		// ! 마이페이지 여부 State 업데이트
		if (!loginUser) return;
		if (loginUser.email === email) setIsMyPage(true);

	};

	//					Function : 특정 유저 게시물 리스트 요청에 대한 응답 처리 함수					//
	const getUserBoardListResponse = (responseBody: GetUserBoardListResponseDto | ResponseDto | null) => {
		if (!responseBody) return;

		const { code, message } = responseBody;

		switch (code) {
			case ResponseCode.SUCCESS:
				break;
			default:
				alert(t(`response-message.${message}`));
				return;
		}

		const { userBoardList } = responseBody as GetUserBoardListResponseDto;

		setUserBoardList(userBoardList);
	};

	//					Effect : userEmail(Path Variable) 변경 시 마다 실행					//
	useEffect(() => {
		if (!userEmail) return;

		Promise.all([
			// ! 유저 정보 요청
			getUserRequest(userEmail).then(getUserResponse),
			// ! 특정 유저 게시물 리스트 요청
			getUserBoardListRequest(userEmail).then(getUserBoardListResponse)
		]);
	}, [userEmail]);

	//					Effect : 닉네임, 프로필 이미지 State 변경 시 마다 실행					//
	useEffect(() => {
		if (!userEmail) return;
		Promise.all([
			// ! 유저 정보 요청
			getUserRequest(userEmail).then(getUserResponse),
			// ! 특정 유저 게시물 리스트 요청
			getUserBoardListRequest(userEmail).then(getUserBoardListResponse)
		]);
	}, [user.nickname, user.profileImage]);

	//                  Render : 유저 화면 컴포넌트 렌더링                  //
	return (
		<>
			<UserPageTop 
				isMyPage={isMyPage}
				user={user}
				setUser={setUser}
			/>
			<UserPageBottom 
				isMyPage={isMyPage}
				userBoardList={userBoardList}
			/>
		</>
	)
}
