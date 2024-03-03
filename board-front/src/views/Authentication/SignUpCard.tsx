import React, { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import InputBox from "components/InputBox";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import { SignUpRequestDto } from "apis/request/auth";
import { signUpRequest } from "apis";
import { SignUpResponseDto } from "apis/response/auth";
import { ResponseDto } from "apis/response";
import { ResponseCode } from "types/enum";

import { useTranslation } from "react-i18next";
import i18n from 'locales/i18n';

//                  Interface : input의 name 속성별 타입                  //
export interface InputName {
    email: string;
    password: string;
    confirmPassword: string;
    nickname: string;
    telNumber: string;
    address: string;
    addressDetail: string;
};

//                  Interface : input 박스 별, 에러 타입                    //
interface InputError {
    [anything: string]: boolean;
};

//                    Interface : input 박스 별, 에러 메시지                 //
interface InputErrorMessage {
    [anything: string]: string;
};

//                  Interface : input name 속성 별, Password View 타입                    //
interface InputView {
    [anything: string]: 'text' | 'password',
};

//                  Interface : input name 속성 별, Password View Icon 타입                    //
interface InputViewIcon {
    [anything: string]: 'eye-light-off-icon' | 'eye-light-on-icon',
};

//                  Interface : 회원가입 카드 컴포넌트 관리 전체 States 타입                //
interface SignUpCardState {
    inputValue: InputName;
    pageNum: 1 | 2;
    inputError: InputError;
    inputErrorMessage: InputErrorMessage;
    inputView: InputView;
    inputViewIcon: InputViewIcon;
    agreedPersonal: boolean;
    agreedPersonalError: boolean;
    agreedPersonalErrorAnimate: boolean;
};

//                  Interface : Props 타입                  //
interface Props {
    setAuthView: React.Dispatch<React.SetStateAction<"sign-up" | "sign-in">>
}

//          Component : 회원가입 카드 컴포넌트         //
export const SignUpCard = (props: Props) => {
    const { setAuthView } = props;
    

    //                  State : 회원가입 카드 컴포넌트 전체 States 관리                  //
    const [signUpCardStates, setSignUpCardStates] = useState<SignUpCardState>({
        inputValue: {
            email: '',
            password: '',
            confirmPassword: '',
            nickname: '',
            telNumber: '',
            address: '',
            addressDetail: '',
        },
        pageNum: 1,
        inputError: {
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            nicknameError: false,
            telNumberError: false,
            addressError: false,
        },
        inputErrorMessage: {
            emailErrorMessage: '',
            passwordErrorMessage: '',
            confirmPasswordErrorMessage: '',
            nicknameErrorMessage: '',
            telNumberErrorMessage: '',
            addressErrorMessage: '',
        },
        inputView: {
            passwordView: 'password',
            confirmPasswordView: 'password'
        },
        inputViewIcon: {
            passwordIcon: 'eye-light-off-icon',
            confirmPasswordIcon: 'eye-light-off-icon'
        },
        agreedPersonal: false,
        agreedPersonalError: false,
        agreedPersonalErrorAnimate: false,
    });

    const { 
        email, password, confirmPassword, 
        nickname, telNumber, address, addressDetail 
    } = signUpCardStates.inputValue;

    const {
         emailError, passwordError, confirmPasswordError,
         nicknameError, telNumberError, addressError
    } = signUpCardStates.inputError;

    const {
        emailErrorMessage, passwordErrorMessage, confirmPasswordErrorMessage,
        nicknameErrorMessage, telNumberErrorMessage, addressErrorMessage
    } = signUpCardStates.inputErrorMessage;

    const { pageNum } = signUpCardStates;

    const { passwordView, confirmPasswordView } = signUpCardStates.inputView;

    const { passwordIcon, confirmPasswordIcon } = signUpCardStates.inputViewIcon;

    const { agreedPersonal, agreedPersonalError, agreedPersonalErrorAnimate } = signUpCardStates;

    //                  State : InputBox 요소 참조 상태                 //
    const emailInputBoxRef = useRef<HTMLInputElement | null>(null);
    const passwordInputBoxRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordInputBoxRef = useRef<HTMLInputElement | null>(null);
    const nicknameInputBoxRef = useRef<HTMLInputElement | null>(null);
    const telNumberInputBoxRef = useRef<HTMLInputElement | null>(null);
    const addressInputBoxRef = useRef<HTMLInputElement | null>(null);
    const addressDetailInputBoxRef = useRef<HTMLInputElement | null>(null);

    const inputBoxRefArray = [
        emailInputBoxRef, passwordInputBoxRef, confirmPasswordInputBoxRef, 
        nicknameInputBoxRef, telNumberInputBoxRef, 
        addressInputBoxRef, addressDetailInputBoxRef
    ];


    //                  Event Handler : Input 입력값 변경 이벤트 처리                   //
    const onInputValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;
        // ! State 업데이트
        const newInputValue = {
            ...signUpCardStates.inputValue,
            [name]: value
        };

        const newInputError = {...signUpCardStates.inputError}
        for (const e in newInputError) {
            newInputError[e] = false;
        }

        const newInputErrorMessage = {...signUpCardStates.inputErrorMessage}
        for (const e in newInputErrorMessage) {
            newInputErrorMessage[e] = '';
        }
        
        setSignUpCardStates(prev => ({
            ...prev,
            inputValue: newInputValue,
            // ! 입력하는 동안에는 error, errorMessage 상태 초기화
            inputError: newInputError,
            inputErrorMessage: newInputErrorMessage
        }));
    };

    //                  Event Handler : InputBox 키보드 이벤트(keyDown) 처리                    //
    const onInputBoxKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        // * InputBox 위치(name)에 따른 동작 구분
        const { name } = event.currentTarget; // # KeyboardEvent에서는 currentTarget으로 참조
        
        for (const indexStr in inputBoxRefArray) {
            // if (!inputBoxRefArray[indexStr].current) return;

            const indexNum: number = Number(indexStr);
            let inputBoxName = inputBoxRefArray[indexNum].current?.name;
            
            if (!(name === inputBoxName)) continue;

            // ! 비밀번호 확인 -> 다음 단계 버튼 클릭
            if (name === 'confirmPassword') {
                onNextButtonClickHandler();
                break;
            }

            // ! 핸드폰 번호 -> 우편번호 검색 클릭
            if (name === 'telNumber') {
                onAddressButtonClickHandler();
                break;
            }

            // ! 상세 주소 -> 회원가입 버튼 클릭
            if (name === 'addressDetail') {
                onSignUpButtonClickHandler();
                break;
            }
            
            // ! 그 외, 다음 InputBox로 이동
            inputBoxRefArray[indexNum + 1].current?.focus();
            break;
        }
    };

    //                  Function : 패스워드 View 아이콘 토글 기능 함수                   //
    const passwordIconToggle = (inputName: string) => {

        // * 비밀번호 input
        let inputViewKey: string = 'passwordView';
        let inputViewIconKey: string = 'passwordIcon';

        // * 비밀번호 확인 input
        if (inputName === 'confirmPassword') {
            inputViewKey = 'confirmPasswordView';
            inputViewIconKey = 'confirmPasswordIcon';
        }

        // * 현재 input type속성 값이 password
        let tmpInputType: 'text' | 'password' = 'text';
        let tmpInputViewIcon: 'eye-light-on-icon' | 'eye-light-off-icon'  = 'eye-light-on-icon';

        // * 현재 input type속성 값이 text
        if (inputName === 'password') {
            if (passwordView === 'text') {
                tmpInputType = 'password';
                tmpInputViewIcon = 'eye-light-off-icon'
            } 
        } else {
            if (confirmPasswordView === 'text') {
                tmpInputType = 'password';
                tmpInputViewIcon = 'eye-light-off-icon'
            } 
        }

        // * 신규 객체
        const newInputView: InputView = {
            ...signUpCardStates.inputView,
            [inputViewKey]: tmpInputType
        };

        const newInputViewIcon: InputViewIcon = {
            ...signUpCardStates.inputViewIcon,
            [inputViewIconKey]: tmpInputViewIcon
        };

        // * State 업데이트
        setSignUpCardStates(prev => ({
            ...prev,
            inputView: newInputView,
            inputViewIcon: newInputViewIcon
        }));
    };

    //          Event Handler : 패스워드 View 아이콘 버튼 클릭 이벤트 처리 함수         //
    const onPasswordViewIconClickHandler = (event: MouseEvent<HTMLDivElement> | undefined) => {
        // ! 해당 Icon 버튼과 같이 있는 input의 name 속성 값
        const inputName = event?.currentTarget.previousElementSibling?.getAttribute("name");

        if (!inputName) return;

        passwordIconToggle(inputName);
    };

    //                  Function : Daum 주소 검색 팝업 오픈 함수                    //
    const open = useDaumPostcodePopup();

    //                  Event Handler : 주소 찾기 버튼 클릭 이벤트 처리                 //
    const onAddressButtonClickHandler = () => {
        // Description : Daum 우편번호 검색 서비스를 위한 라이브러리 이용 (react-daum-postcode)
        open({onComplete});
    };

    //                  Event Handler : Daum 주소 검색 완료 이벤트 처리                 //
    const onComplete = (data: Address) => {
        const { address } = data;
        setSignUpCardStates(prev => ({
            ...prev,
            inputValue: {...prev.inputValue, address: address},
            inputError: {...prev.inputError, addressError: false},
            inputErrorMessage: {...prev.inputErrorMessage, addressErrorMessage: ''},
        }));
        if (!addressDetailInputBoxRef.current) return;
        addressDetailInputBoxRef.current.focus();
    };

    //                  Event Handler : 개인정보 동의 버튼 클릭 이벤트 처리                 //
    const onConsentButtonClickHandler = () => {
        if (!agreedPersonal) {
            setSignUpCardStates(prev => ({
                ...prev,
                agreedPersonal: true,
                agreedPersonalError: false,
                agreedPersonalErrorAnimate:false
            }));
        } else {
            setSignUpCardStates(prev => ({
                ...prev,
                agreedPersonal: false,
            }));
        }
    };

    //                  Function : 오류 관련 State 변경 함수                  //
    const updateErrorState = (inputName: string, message: string) => {
        const errorPropertyName: string = inputName + 'Error';
        const errorMessagePropertyName: string = inputName + 'ErrorMessage';

        setSignUpCardStates(prev => ({
            ...prev,
            inputError: {
                ...prev.inputError, 
                [errorPropertyName]:true
            },
            inputErrorMessage: {
                ...prev.inputErrorMessage, 
                [errorMessagePropertyName]: message
            }
        }))
    };

    //                  Function : Input 별 유효성 검증 및 오류 처리 함수                    //
    const validateWithErrorHandling = (inputName: keyof InputName): boolean =>  {
        let message: string | null = null;
        
        switch (inputName) {
            case 'email':
                // ! 이메일 형식 검증
                const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
                const isEmailPattern = emailPattern.test(email);
                if (!isEmailPattern) {
                    message = '이메일 주소 포맷이 맞지 않습니다.';
                    updateErrorState(inputName, message);
                    return false;
                }
                break;
            case 'password':
                // ! 비밀번호 길이 검증 - 8자 이상
                const isSuitablePassword = password.trim().length >= 8;
                if (!isSuitablePassword) {
                    message = '비밀번호는 8자 이상 입력해주세요';
                    updateErrorState(inputName, message);
                    return false;
                }
                break;
            case 'confirmPassword':
                // ! 비밀번호 동일 검증
                const isEqualPassword = password === confirmPassword;
                if (!isEqualPassword) {
                    message = '비밀번호가 일치하지 않습니다.';
                    updateErrorState(inputName, message);
                    return false;
                }
                break;
            case 'nickname':
                // ! 닉네임 공백 검증
                if (nickname.trim().length === 0) {
                    message = '닉네임을 입력해주세요.';
                    updateErrorState(inputName, message);
                    return false;
                }
                break;
            case 'telNumber':
                // ! 공백 검증
                if (telNumber.trim().length === 0) {
                    message = '핸드폰 번호를 입력해주세요.';
                    updateErrorState(inputName, message);
                    return false;
                }

                // ! 핸드폰 번호 형식 검증
                const telNumberPattern = /^[0-9]{11,13}$/;
                const isTelNumberPattern = telNumberPattern.test(telNumber);
                if (!isTelNumberPattern) {
                    message = '숫자만 입력해주세요';
                    updateErrorState(inputName, message);
                    return false;
                }
                break;
            case 'address':
                // ! 공백 검증
                if (address.trim().length === 0) {
                    message = '주소를 선택해주세요.';
                    updateErrorState(inputName, message);
                    return false;
                }
                break;
            default:
                return false;
        }
        return true;
    };

    //          Event Handler : 다음 단계 버튼 클릭 이벤트 처리 함수         //
    const onNextButtonClickHandler = () => {
        // ! 유효성 검증 + 에러 메시지 업데이트
        const isValidEmail = validateWithErrorHandling('email');
        const isValidPassword = validateWithErrorHandling('password');
        const isValidConfirmPassword = validateWithErrorHandling('confirmPassword');

        if (!(isValidEmail && isValidPassword && isValidConfirmPassword)) return;

        // ! 다음 페이지로 업데이트
        setSignUpCardStates(prev => ({
            ...prev,
            pageNum: 2
        }));
    };

    //                  Function : 번역 처리 함수                   //
    const { t } = useTranslation();

    //                  Function : Sign Up Response 처리 함수                   //
    const signUpResponse = (responseBody: SignUpResponseDto | ResponseDto | null) => {
        // ! null인 경우
        if (!responseBody) {
            alert('네트워크 이상입니다.');
            return;
        }
        
        // ! 응답 코드에 따른 처리
        const { code, message } = responseBody;
        switch (code) {
            case ResponseCode.SUCCESS:
                break;
            case ResponseCode.DATABASE_ERROR:
            case ResponseCode.VALIDATION_FAILED:
                alert(t(`response-message.${message}`));
                return
            case ResponseCode.DUPLICATE_EMAIL:
                setSignUpCardStates(prev => ({
                    ...prev,
                    inputError: {...prev.inputError, emailError: true},
                    inputErrorMessage: {...prev.inputErrorMessage, emailErrorMessage: t(`response-message.${message}`)}
                }));
                return;
            case ResponseCode.DUPLICATE_NICKNAME:
                setSignUpCardStates(prev => ({
                    ...prev,
                    inputError: {...prev.inputError, nicknameError: true},
                    inputErrorMessage: {...prev.inputErrorMessage, nicknameErrorMessage: t(`response-message.${message}`)}
                }));
                return;
            case ResponseCode.DUPLICATE_TEL_NUMBER:
                setSignUpCardStates(prev => ({
                    ...prev,
                    inputError: {...prev.inputError, telNumberError: true},
                    inputErrorMessage: {...prev.inputErrorMessage, telNumberErrorMessage: t(`response-message.${message}`)}
                }));
                return;
            default:
                alert(t(`response-message.Unidentified code.`) + code);
                return;
        }

        // ! 회원가입 성공 시
        setAuthView('sign-in');
    };

    //          Event Handler : 회원가입 버튼 클릭 이벤트 처리 함수         //
    const onSignUpButtonClickHandler = () => {
        // * 유효성 검증
        // ! 1/2 페이지 유효성 재검증
        const isValidEmail = validateWithErrorHandling('email');
        const isValidPassword = validateWithErrorHandling('password');
        const isValidConfirmPassword = validateWithErrorHandling('confirmPassword');
        if (!(isValidEmail && isValidPassword && isValidConfirmPassword)) {
            setSignUpCardStates(prev => ({
                ...prev,
                pageNum: 1
            }));
        }

        // ! 2/2 페이지 유효성 검증
        const isValidNickname = validateWithErrorHandling('nickname');
        const isValidTelNumber = validateWithErrorHandling('telNumber');
        const isValidAddress = validateWithErrorHandling('address');

        if (!(isValidNickname && isValidTelNumber && isValidAddress)) return;

        if (!agreedPersonal) {
            setSignUpCardStates(prev => ({
                ...prev,
                agreedPersonalError: true,
                agreedPersonalErrorAnimate: true
            }));
            return;
        }

        // * API 요청 전송
        const requestBody: SignUpRequestDto = {
            email, password, nickname, telNumber, address, addressDetail, agreedPersonal
        };

        signUpRequest(requestBody)
            .then(signUpResponse)
    };

    //          Event Handler : 로그인 버튼 클릭 이벤트 처리 함수         //
    const onSignInButtonClickHandler = () => {
        setAuthView('sign-in');
    };
    
    //                  Effect : 페이지 변경 시 마다 실행되는 함수                  //
    // Description : 회원가입 2페이지로 넘어갔을 때, focus가 주소 입력창에 되어 있는 문제 해결
    useEffect(() => {
        if (pageNum === 2) {
            if (!nicknameInputBoxRef) return;
            nicknameInputBoxRef.current?.focus();
        }
    }, [pageNum]);

    //          Render : 회원가입 카드 컴포넌트 렌더링         //
    return (
        <div className='auth-card'>
            <div className="auth-card-box">
                <div className="auth-card-top">
                    <div className="auth-card-title-box">
                        <div className="auth-card-title">{'회원가입'}</div>
                        <div className="auth-card-page">{`${pageNum}/2`}</div>
                    </div>
                    {pageNum === 1 ? (
                        <>
                            <InputBox 
                                ref={emailInputBoxRef}
                                label={'이메일 주소*'} type={'text'} placeholder={'이메일 주소를 입력해주세요'}
                                name={'email'} value={email} onChange={onInputValueChangeHandler} error={emailError}
                                onKeyDown={onInputBoxKeyDownHandler} message={emailErrorMessage}
                            />
                            <InputBox 
                                ref={passwordInputBoxRef} icon={passwordIcon} onButtonClick={onPasswordViewIconClickHandler}
                                label={'비밀번호*'} type={passwordView} placeholder={'비밀번호를 입력해주세요'}
                                name={'password'} value={password} onChange={onInputValueChangeHandler} error={passwordError}
                                onKeyDown={onInputBoxKeyDownHandler} message={passwordErrorMessage}
                            />
                            <InputBox 
                                ref={confirmPasswordInputBoxRef} icon={confirmPasswordIcon} onButtonClick={onPasswordViewIconClickHandler}
                                label={'비밀번호 확인*'} type={confirmPasswordView} placeholder={'비밀번호를 다시 입력해주세요'}
                                name={'confirmPassword'} value={confirmPassword} onChange={onInputValueChangeHandler} error={confirmPasswordError}
                                onKeyDown={onInputBoxKeyDownHandler} message={confirmPasswordErrorMessage}
                            />
                        </>
                    ) : (
                        <>
                            <InputBox
                                ref={nicknameInputBoxRef} name={'nickname'}
                                label={'닉네임*'} type={'text'} placeholder={'닉네임을 입력해주세요'} value={nickname}
                                onChange={onInputValueChangeHandler} error={nicknameError}
                                onKeyDown={onInputBoxKeyDownHandler} message={nicknameErrorMessage}
                            />
                            <InputBox
                                ref={telNumberInputBoxRef} name={'telNumber'}
                                label={'핸드폰 번호*'} type={'text'} placeholder={'핸드폰 번호를 입력해주세요'} value={telNumber}
                                onChange={onInputValueChangeHandler} error={telNumberError} 
                                onKeyDown={onInputBoxKeyDownHandler} message={telNumberErrorMessage}
                            />
                            <InputBox
                                ref={addressInputBoxRef} name={'address'} icon={'expand-right-light-icon'} onButtonClick={onAddressButtonClickHandler}
                                label={'주소*'} type={'text'} placeholder={'우편번호 찾기'} value={address}
                                onChange={onInputValueChangeHandler} error={addressError}
                                onKeyDown={onInputBoxKeyDownHandler} message={addressErrorMessage}
                            />
                            <InputBox
                                ref={addressDetailInputBoxRef} name={'addressDetail'}
                                label={'상세 주소'} type={'text'} placeholder={'상세 주소를 입력해주세요.'} value={addressDetail}
                                onChange={onInputValueChangeHandler} onKeyDown={onInputBoxKeyDownHandler}
                            />
                        </>
                    )}
                </div>
                <div className="auth-card-bottom">
            
                    {pageNum === 1 
                        ? (<div className="black-large-full-button" onClick={onNextButtonClickHandler}>{'다음 단계'}</div>)
                        : (
                            <>
                                <div className={`${agreedPersonalErrorAnimate ? 'auth-consent-box-blink' : 'auth-consent-box'}`}>
                                    <div className="auth-check-box icon-button" onClick={onConsentButtonClickHandler}>
                                        <div className={`icon ${agreedPersonal ? 'auth-check-round-fill-icon' : 'auth-check-ring-light-icon'}`}></div>
                                    </div>
                                    <div className={agreedPersonalError ? 'auth-consent-title-error' : 'auth-consent-title'}>
                                        {'개인정보동의'}
                                    </div>
                                    <div className="auth-consent-link">{'더보기 >'}</div>
                                </div>
                                <div className="black-large-full-button" onClick={onSignUpButtonClickHandler}>{'회원 가입'}</div>
                            </>
                        )
                    }
                    <div className="auth-description-box">
                        <div className="auth-description">
                            {'이미 계정이 있으신가요? '}<span className='auth-description-link' onClick={onSignInButtonClickHandler}>{'로그인'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };