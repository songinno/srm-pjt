const enum ResponseCode {
    // HTTP Status 200
    SUCCESS = "SU",
    // public static final 생략 가능

    // HTTP Status 400
    VALIDATION_FAILED = "VF",
    DUPLICATE_EMAIL = "DE",
    DUPLICATE_NICKNAME = "DN",
    DUPLICATE_TEL_NUMBER = "DT",
    NOT_EXISTED_USER = "NU",
    NOT_EXISTED_BOARD = "NB",

    // HTTP Status 401
    SIGN_IN_FAIL = "SF",
    AUTHORIZATION_FAIL = "AF",

    // HTTP Status 403
    NO_PERMISSION = "NP",

    // HTTP Status 500
    DATABASE_ERROR = "DBE"
}

export default ResponseCode;