import React, { ChangeEvent, forwardRef, KeyboardEvent, MouseEvent } from 'react';
import './style.css';
import { InputName } from 'views/Authentication/SignUpCard';

//                  Interface : Input Box 컴포넌트 Properties                    //
// * 외부에서 받아오는 데이터의 타입 정의
interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    // setValue: Dispatch<SetStateAction<string>>; // # onChange를 Props로 받는 것으로 수정
    onChange: (event:ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    message?: string;

    // ! 아이콘 버튼 관련
    icon?: 'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon';
    onButtonClick?: (event: MouseEvent<HTMLDivElement> | undefined) => void;


    // ! 키보드 Enter 키 처리 함수
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;

    // ! 회원가입 컴포넌트 전용 Props
    // # name 속성 값
    name?: keyof InputName;
}

//                  component : Input Box 컴포넌트                  //
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

    //                  State : properties                  //
    const { label, type, error, placeholder, value, icon, message, name } = props;
    const { onChange, onButtonClick, onKeyDown } = props;

    //                  Event Handler : input 키보드 입력 이벤트 처리 함수                  //
    const onKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if (!onKeyDown) return;
        onKeyDown(event);
    };



    //                  Render : Input Box 컴포넌트 렌더링                  //
    return (
        <div className='inputbox'>
            <div className='intpubox-label'>{label}</div>
            <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
                <input name={name} ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler}/>
                {/*  icon 버튼 */}
                {onButtonClick !== undefined && (
                    <div className='icon-button' onClick={onButtonClick}>
                        {icon !== undefined && (<div className={`icon ${icon}`}></div>)}
                    </div>
                )}
            </div>
            {message !== undefined && (<div className='inputbox-message'>{message}</div>)}
        </div>
    );
});

export default InputBox;