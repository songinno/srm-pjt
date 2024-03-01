import InputBox from "components/InputBox";
import React, { ChangeEvent, KeyboardEvent, MouseEvent, MouseEventHandler, useRef, useState } from "react";

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
};

//          Component : 회원가입 카드 컴포넌트         //
export const SignUpCard = () => {

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
            addressDetailError: false,
        },
        inputErrorMessage: {
            emailErrorMessage: '',
            passwordErrorMessage: '',
            confirmPasswordErrorMessage: '',
            nicknameErrorMessage: '',
            telNumberErrorMessage: '',
            addressErrorMessage: '',
            addressDetailErrorMessage: '',
        },
        inputView: {
            passwordView: 'password',
            confirmPasswordView: 'password'
        },
        inputViewIcon: {
            passwordIcon: 'eye-light-off-icon',
            confirmPasswordIcon: 'eye-light-off-icon'
        },
        
    });

    const { 
        email, password, confirmPassword, 
        nickname, telNumber, address, addressDetail 
    } = signUpCardStates.inputValue;

    const {
         emailError, passwordError, confirmPasswordError,
         nicknameError, telNumberError, addressError, addressDetailError
    } = signUpCardStates.inputError;

    const { pageNum } = signUpCardStates;

    const { passwordView, confirmPasswordView } = signUpCardStates.inputView;

    const { passwordIcon, confirmPasswordIcon } = signUpCardStates.inputViewIcon;

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
        
        setSignUpCardStates(prev => ({
            ...prev,
            inputValue: newInputValue,
            // ! 입력하는 동안에는 error 상태 아니도록 처리
            inputError: newInputError
        }));
    };

    //                  Event Handler : InputBox 키보드 이벤트(keyDown) 처리                    //
    const onInputBoxKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        // * 모든 요소에 ref가 걸려있는지 확인
        const unRefencedCount = inputBoxRefArray.filter(ref => !ref.current).length;
        // if (!unRefencedCount) return; // TODO : InputBox 모두 만들고 주석 해제

        // * InputBox 위치(name)에 따른 동작 구분
        const { name } = event.currentTarget; // # KeyboardEvent에서는 currentTarget으로 참조
        
        for (const indexStr in inputBoxRefArray) {
            const indexNum: number = Number(indexStr);
            let inputBoxName = inputBoxRefArray[indexNum].current?.name;
            
            if (!(name === inputBoxName)) continue;

            // ! 비밀번호 확인 -> 다음 단계 버튼 클릭
            if (name === 'confirmPassword') {
                onNextButtonClickHandler();
                break;
            }
            // TODO : 상세 주소 -> 개인정보동의 클릭 버튼에 focus??
            if (name === 'addressDetail') {
                console.log("개인정보 동의 버튼에 포커스!");
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
                const isSuitablePassword = password.trim().length > 8;
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

    //          Event Handler : 회원 가입 버튼 클릭 이벤트 처리 함수         //
    const onSignUpButtonClickHandler = () => {
        console.log("회원 가입 버튼 클릭!");
        // TODO
    };

    //          Event Handler : 로그인 버튼 클릭 이벤트 처리 함수         //
    const onSignInButtonClickHandler = () => {
        console.log("로그인 버튼 클릭!");
        // TODO
    };

    //          Render : 회원가입 카드 컴포넌트 렌더링         //
    return (
        <div className='auth-card'>
            <div className="auth-card-box">
                <div className="auth-card-top">
                    <div className="auth-card-title-box">
                        <div className="auth-card-title">{'회원가입'}</div>
                        <div className="auth-card-page">{`${pageNum}/2`}</div>
                    </div>
                    <InputBox 
                        ref={emailInputBoxRef}
                        label={'이메일 주소*'} type={'text'} placeholder={'이메일 주소를 입력해주세요'}
                        name={'email'} value={email} onChange={onInputValueChangeHandler} error={emailError}
                        onKeyDown={onInputBoxKeyDownHandler}
                    />
                    <InputBox 
                        ref={passwordInputBoxRef} icon={passwordIcon} onButtonClick={onPasswordViewIconClickHandler}
                        label={'비밀번호*'} type={passwordView} placeholder={'비밀번호를 입력해주세요'}
                        name={'password'} value={password} onChange={onInputValueChangeHandler} error={passwordError}
                        onKeyDown={onInputBoxKeyDownHandler}
                    />
                    <InputBox 
                        ref={confirmPasswordInputBoxRef} icon={confirmPasswordIcon} onButtonClick={onPasswordViewIconClickHandler}
                        label={'비밀번호 확인*'} type={confirmPasswordView} placeholder={'비밀번호를 다시 입력해주세요'}
                        name={'confirmPassword'} value={confirmPassword} onChange={onInputValueChangeHandler} error={confirmPasswordError}
                        onKeyDown={onInputBoxKeyDownHandler}
                    />
                </div>
                <div className="auth-card-bottom">
                    <div className="black-large-full-button" onClick={onNextButtonClickHandler}>{'다음 단계'}</div>
                    <div className="auth-description-box">
                        <div className="auth-description">
                            {'이미 계정이 있으신가요? '}<span className='auth-description-link' onClick={() => {}}>{'로그인'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };