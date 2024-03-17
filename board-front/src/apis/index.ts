import axios from 'axios';
import { SignInRequestDto, SignUpRequestDto } from './request/auth';
import { SignInResponseDto, SignUpResponseDto } from './response/auth';
import { ResponseDto } from './response';
import { GetSignInUserResponseDto } from './response/user';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './request/board';
import { DeleteBoardResponseDto, GetBoardResponseDto, GetCommentResponseDto, GetFavoriteListResponseDto, GetLatestBoardListResponseDto, GetTop3BoardListResponseDto, PatchBoardResponseDto, PostBoardResponseDto, PostCommentResponseDto, PutFavoriteResponseDto, ViewCountUpResponseDto } from './response/board';
import { t } from 'i18next';
import GetPopularListResponseDto from './response/search/get-popular-list.response.dto';
import { GetRelationListResponseDto } from './response/search';

// TODO : 모든 요청에서, 각 error 상태에 따라 alert 다르게 해야함

// *** 서버 요청 URL 정보
const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1`;

// *** 로그인 및 회원가입 요청

// Description : 파라미터가 있을 경우, URL에 넣기 위해 함수로 정의
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

// ! 로그인 요청
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response => {
            const responseBody: SignInResponseDto = response.data;
            
            return responseBody;
        })
        .catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
};

// ! 회원가입 요청
export const signUpRequest: (arg: SignUpRequestDto) => Promise<ResponseDto | SignUpResponseDto | null> = async function (requestBody) { // # 함수식 표현
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
};

// *** 로그인 유저 정보 요청 //
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

const authorization = (accessToken: string) => {
    return { headers: {Authorization: `Bearer ${accessToken}`} }
};

export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
        .then(response => {
            const responseBody: GetSignInUserResponseDto = response.data;
            return responseBody;
        }).catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

// *** 파일 업로드 요청
const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

// ! HTTP 헤더 - 필드(Content-Type), MIME 타입(multipart/form-data) 설정
const fileUploadRequestHeader = {'Content-Type': 'multipart/form-data'};

export const fileUploadRequest = async (data: FormData) => {
    const result = await axios.post(FILE_UPLOAD_URL(), data, { headers: fileUploadRequestHeader })
        .then(response => {
            const responseBody: string = response.data;
            return responseBody;
        }).catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
                return null;
            }
        })
    return result;
};

// *** 게시물 상세 불러오기 요청
const GET_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;

export const getBoardRequest: (arg: number | string) => Promise<ResponseDto | GetBoardResponseDto | null> 
    = async function (boardNumber) {
        const result = await axios.get(GET_BOARD_URL(boardNumber))
            .then(response => {
                const responseBody: GetBoardResponseDto = response.data;
                return responseBody;
            })
            .catch(error => {
                if (!error.response) {
                    alert(t('response-message.Network Error.'));
                    return null;
                }
                const responseBody: ResponseDto = error.response.data;
                return responseBody;
            })
        return result;
};

// *** 조회수 카운트업 요청
const VIEW_COUNT_UP_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/viewCountUp`;

export const viewCountUpRuquest: (arg: number | string) => Promise<ResponseDto | ViewCountUpResponseDto | null>
    = async function (boardNumber) {
        const result = await axios.patch(VIEW_COUNT_UP_URL(boardNumber))
            .then(response => {
                const responseBody: ViewCountUpResponseDto = response.data;
                return responseBody;
            })
            .catch(error => {
                if (!error.response) {
                    alert(t('response-message.Network Error.'));
                    return null;
                }
                const responseBody: ResponseDto = error.response.data;
                return responseBody;
            })
        return result;
};

// *** 게시물 등록 요청
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;

export const postBoardRequest = async (requestBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(accessToken)) // # 인증 관련 헤더 정보는 로그인 정보 가져오기에서 이전에 정의
        .then(response => {
            const responseBody: PostBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
};

// *** 게시물 삭제 요청
const DELETE_BOARD_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}`;

export const deleteBoardRequest = async (boardNumber: string | number, accessToken: string) => {
    const result = await axios.delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
        .then(response => {
            const responseBody: DeleteBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
                return null;
            }
            
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
};

// *** 게시물 수정 요청
const PATCH_BOARD_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}`;

export const patchBoardRequest = async (requestBody: PatchBoardRequestDto, boardNumber: string | number, accessToken: string) => {
    const result = await axios.patch(PATCH_BOARD_URL(boardNumber), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PatchBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
                return null;
            }

            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
};

// *** 좋아요 리스트 불러오기 요청
const GET_FAVORITE_LIST_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}/favorite-list`;

export const getFavoriteListRequest: (arg: string | number) => Promise<ResponseDto | GetFavoriteListResponseDto | null>
    = async function(boardNumber) {
        const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
            .then(response => {
                const responseBody: GetFavoriteListResponseDto = response.data;
                return responseBody;
            })
            .catch(error => {
                if (!error.response) {
                    alert(t('response-message.Network Error.'));
                    return null;
                }

                const responseBody: ResponseDto = error.response.data;
                return responseBody;
            })
        return result;
}

// *** 댓글 리스트 불러오기 요청
const GET_COMMENT_LIST_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}/comment-list`;

export const getCommentListRequest = async (boardNumber: string | number) => {
    const result = await axios.get(GET_COMMENT_LIST_URL(boardNumber))
        .then(response => {
            const responseBody: GetCommentResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
                return null;
            }

            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

// *** 좋아요 기능 요청
const PUT_FAVORITE_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}/favorite`;

export const putFavoriteRequest = async (boardNumber: string| number, accessToken: string) => {
    const result = await axios.put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken)) // # 2번째 파라미터 : data
        .then(response => {
            const responseBody: PutFavoriteResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
                return null;
            }

            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
};

// *** 댓글 등록 요청
const POST_COMMENT_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}/comment`;

export const postCommentRequest 
    = async (boardNumber: string | number, requestBody:PostCommentRequestDto, accessToken: string) => {
        const result = await axios.post(POST_COMMENT_URL(boardNumber), requestBody, authorization(accessToken))
            .then(response => {
                const responseBody: PostCommentResponseDto = response.data;
                return responseBody;
            })
            .catch(error => {
                if (!error.response) {
                    alert(t('response-message.Network Error.'));
                    return null;
                }

                const responseBody: ResponseDto = error.response.data;
                return responseBody;
            })
        return result;
};

// *** 월간 TOP3 게시물 리스트 요청
const GET_TOP3_BOARD_LIST_URL = () => `${API_DOMAIN}/board/top3-list`;

export const getTop3BoardListRequest: () => Promise<GetTop3BoardListResponseDto | ResponseDto | null> = async function () {
    const result = await axios.get(GET_TOP3_BOARD_LIST_URL())
        .then(response => {
            const responseBody: GetTop3BoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
                return null;
            }

            const responseBody: ResponseDto = error.responseBody.data;
            return responseBody;
        })
    return result;
}

// *** 최근 게시물 리스트 요청
const GET_LATEST_BOARD_LIST_URL = () => `${API_DOMAIN}/board/latest-list`;

export const getLatestBoardListRequest: () => Promise<GetLatestBoardListResponseDto | ResponseDto | null> = async function () {
    const result = await axios.get(GET_LATEST_BOARD_LIST_URL())
        .then(response => {
            const responseBody: GetLatestBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
                return null;
            }

            const responseBody: ResponseDto = error.responseBody.data;
            return responseBody;
        })
    return result;
}

// *** 인기 검색어 리스트 요청
const GET_POPULAR_LIST_URL = () => `${API_DOMAIN}/search/popular-list`;

export const getPopularListRequest: () => Promise<GetPopularListResponseDto | ResponseDto | null> = async function () {
    const result = await axios.get(GET_POPULAR_LIST_URL())
        .then(response => {
            const responseBody: GetPopularListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
                return null;
            }

            const responseBody:ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

// *** 검색 게시물 리스트 요청
const GET_SEARCH_LIST_URL = (searchWord: string, preSearchWord?: string) => 
    `${API_DOMAIN}/board/search-list/${searchWord}${preSearchWord ? '/' + preSearchWord : ''}`;

export const getSearchListRequest = async (searchWord: string, preSearchWord?: string) => {
    const result = await axios.get(GET_SEARCH_LIST_URL(searchWord, preSearchWord))
        .then(response => {
            const responseBody = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) {
                alert(t('response-message.Network Error.'));
            return null;
            }

            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
};

// *** 연관 검색어 리스트 요청
const GET_RELATION_LIST_URL = (searchWord: string) => `${API_DOMAIN}/search/${searchWord}/relation-list`;

export const getRelationListRequest: (arg: string) => Promise<GetRelationListResponseDto | ResponseDto | null> 
    = async function(searchWord: string) {
        const result = await axios.get(GET_RELATION_LIST_URL(searchWord))
            .then(response => {
                const responseBody: GetRelationListResponseDto = response.data;
                return responseBody;
            })
            .catch(error => {
                if (!error.response) {
                    alert(t('response-message.Network Error.'));
                return null;
                }

                const responseBody: ResponseDto = error.response.data;
                return responseBody;
            })
        return result;
}