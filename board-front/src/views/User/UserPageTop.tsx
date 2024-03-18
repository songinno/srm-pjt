import { fileUploadRequest, patchNicknameRequest, patchProfileImageRequest } from 'apis';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from 'apis/request/user';
import { ResponseDto } from 'apis/response';
import { PatchNicknameResponseDto, PatchProfileImageResponseDto } from 'apis/response/user';
import { t } from 'i18next';
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { ResponseCode } from 'types/enum';
import { User } from 'types/interface';

//                  Interface : 유저 페이지 상단 컴포넌트 Props 타입                 //
interface Props {
    isMyPage: boolean;
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

//                  Component : 유저 페이지 상단 컴포넌트                   //
export const UserPageTop = (props: Props) => {

    //                  State : Properties                  //
    const { isMyPage, user } = props;
    const { setUser } = props;

    //                  State : Properties - 유저 정보 상태                  //
    const { email, nickname, profileImage } = user;

    //                  State : 이미지 파일 Input 참조 상태                 //
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    //                  State : 닉네임 변경 여부 상태                  //
    // Description : 닉네임 수정 버튼 클릭 시, input으로 변경하기 위함
    const [ isChangeNickname, setIsChangeNickname ] = useState<boolean>(false);

    //                  State : 변경된 닉네임 값 상태                   //
    const [changedNickname, setChangedNickname] = useState<string>('');

    //                  State : 닉네임 Input 참조 상태                    //
    const nicknameInputRef = useRef<HTMLInputElement | null>(null);

    //                  State : 쿠키 상태                   //
    const [ cookies, setCookies ] = useCookies();

    //                  Event Handler : 닉네임 Input 값 변경 이벤트 처리                    //
    const onNicknameInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setChangedNickname(value);
    };

    //                  Function : 닉네임 변경 요청에 대한 응답 처리                 //
    const patchNicknameResponse = (responseBody: PatchNicknameResponseDto | ResponseDto | null) => {
        if (!responseBody) return;

        const { code, message } = responseBody;

        switch (code) {
            case ResponseCode.SUCCESS:
                break;
            default:
                alert(t(`response-message.${message}`));
                return;
        }

        setUser(prev => ({
            ...prev,
            nickname: changedNickname
        }));
    };

    //                  Event Handler : 닉네임 수정 버튼 클릭 이벤트 처리                    //
    const onNicknameUpdateButtonClickHandler = () => {
        if (!changedNickname) {
            alert(t(`general-message.Nickname is required entry.`));
            if (!nicknameInputRef.current) return;
            nicknameInputRef.current.focus();
            return;
        }
        setIsChangeNickname(!isChangeNickname);
        // ! 닉네임 수정 API 요청
        if (isChangeNickname) {
            if (!cookies.accessToken) {
                alert(t(`general-message.Cookie does not exist.`));
                return;
            } 
            const requestBody = { nickname: changedNickname } as PatchNicknameRequestDto;

            patchNicknameRequest(requestBody, cookies.accessToken)
                .then(responseBody => patchNicknameResponse(responseBody));
        }
    };

    //                  Event Handler : 프로필 이미지 박스 클릭 이벤트 처리                    //
    const onProfileImageBoxClickHandler = () => {
        if (!imageInputRef.current) return;
        imageInputRef.current.click();
    };

    //                  Function : 프로필 이미지 변경 요청에 대한 응답 처리                 //
    const patchProfileImageResponse = (responseBody: PatchProfileImageResponseDto | ResponseDto | null, profileImage: string | null) => {
        if (!responseBody) return;

        const { code, message } = responseBody;

        switch (code) {
            case ResponseCode.SUCCESS:
                break;
            default:
                alert(t(`response-message.${message}`));
                return;
        }

        setUser(prev => ({
            ...prev,
            profileImage
        }));
    };

    //                  Function : 파일 업로드 요청에 대한 응답 처리                 //
    const fileUploadResponse = (profileImage: string | null) => {
        if (!cookies.accessToken) {
            alert(t(`general-message.Cookie does not exist.`));
            return;
        }

        const requestBody: PatchProfileImageRequestDto = {
            profileImage
        };
        
        patchProfileImageRequest(requestBody, cookies.accessToken)
            .then(responseBody => patchProfileImageResponse(responseBody, profileImage));
        
    };

    //                  Event Handler : 프로필 이미지 변경 이벤트 처리                    //
    const onProfileImageChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        if (!(event.target.files && event.target.files.length)) return;

        const file = event.target.files[0];
        const data = new FormData();
        data.append('file', file);

        // ! 파일 업로드 요청
        fileUploadRequest(data).then(fileUploadResponse)
    };

    //                  Effect : User 닉네임 변경 시 마다 실행                  //
    useEffect(() => {
        setChangedNickname(nickname);
    }, [nickname])

    //                  Effect : 닉네임 변경 여부 상태 변화 시 마다 실행                   //
    useEffect(() => {
        // ! 닉네임 수정 Input에 focus
        if (!nicknameInputRef.current) return;
        nicknameInputRef.current.focus();
    }, [isChangeNickname]);

    

    //                  Render : 유저 페이지 상단 컴포넌트 렌더링                   //
    if (!email) return (<></>);
    return (
        <div id="user-top-wraaper">
            <div className="user-top-container">
                {isMyPage 
                    ? (<>
                        <div className="user-top-my-profile-image-box" onClick={onProfileImageBoxClickHandler}>
                            {profileImage 
                                ? (<div className="user-top-profile-image" style={{ backgroundImage: `url(${profileImage})` }}></div>) 
                                : (<div className="icon-box-large">
                                        <div className="icon image-box-white-light-icon"></div>
                                    </div>
                                )
                            } 
                        </div>
                        <input ref={imageInputRef} type="file" accept='image/*' style={{display: 'none'}} onChange={onProfileImageChangeHandler} />
                        </>
                    ) 
                    : (<div className="user-top-profile-image-box">
                            <div className="user-top-profile-image" style={{ backgroundImage: `url(${profileImage})` }}></div>
                        </div>
                    )
                }
                    
                <div className="user-top-info-box">
                    <div className="user-top-info-nickname-box">
                        {isChangeNickname 
                            ? (<input 
                                    ref={nicknameInputRef} 
                                    className='user-top-info-nickname-input' 
                                    type='text' 
                                    size={changedNickname.length + 2} 
                                    value={changedNickname} 
                                    onChange={onNicknameInputChangeHandler}
                                />) 
                            : (<div className="user-top-info-nickname">{nickname}</div>)
                        }
                        {isMyPage && (
                            <div className="icon-button" onClick={onNicknameUpdateButtonClickHandler}>
                                <div className="icon edit-icon"></div>
                            </div>
                        )}
                    </div>
                    <div className="user-top-info-email">{email}</div>
                </div>
            </div>
        </div>
    );
}
