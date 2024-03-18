-- database 생성
create database board;

-- DDL
CREATE TABLE board.board
(
  board_number   INT         NOT NULL AUTO_INCREMENT COMMENT '게시물 번호',
  title          TEXT        NOT NULL COMMENT '게시물 제목',
  content        TEXT        NOT NULL COMMENT '게시물 내용',
  write_datetime DATETIME    NOT NULL COMMENT '게시물 작성 일자',
  favorite_count INT         NOT null default 0 COMMENT '게시물 좋아요 수',
  comment_count  INT         NOT NULL DEFAULT 0 COMMENT '게시물 댓글 수',
  view_count     INT         NOT NULL DEFAULT 0 COMMENT '게시물 조회 수',
  writer_email   VARCHAR(50) NOT NULL COMMENT '작성자 이메일',
  PRIMARY KEY (board_number)
) COMMENT '게시물 테이블';

CREATE TABLE board.comment
(
  comment_number INT         NOT NULL AUTO_INCREMENT COMMENT '댓글 번호',
  user_email     VARCHAR(50) NOT NULL COMMENT '사용자 이메일',
  board_number   INT         NOT NULL COMMENT '게시물 번호',
  content        TEXT        NOT NULL COMMENT '댓글 내용',
  write_datetime DATETIME    NOT NULL COMMENT '작성 일자',
  PRIMARY KEY (comment_number)
) COMMENT '댓글 테이블';

CREATE TABLE board.favorite
(
  user_email   VARCHAR(50) NOT NULL COMMENT '사용자 이메일',
  board_number INT         NOT NULL COMMENT '게시물 번호',
  PRIMARY KEY (user_email, board_number)
) COMMENT '좋아요 테이블';

CREATE TABLE board.image
(
  board_number INT  NOT NULL COMMENT '게시물 번호',
  image        TEXT NOT NULL COMMENT '게시물 이미지 URL'
) COMMENT '게시물 이미지 테이블';

CREATE TABLE board.search_log
(
  sequence      INT     NOT null AUTO_INCREMENT COMMENT '시퀀스',
  search_word   TEXT    NOT NULL COMMENT '검색어',
  relation_word TEXT    NULL     COMMENT '관련 검색어',
  relation      BOOLEAN NOT NULL COMMENT '관련 검색어 여부',
  PRIMARY KEY (sequence)
) COMMENT '검색 기록 테이블';

CREATE TABLE board.user
(
  email          VARCHAR(50)  NOT NULL COMMENT '사용자 이메일',
  password       VARCHAR(100) NOT NULL COMMENT '사용자 비밀번호',
  nickname       VARCHAR(20)  unique NOT null COMMENT '사용자 닉네임',
  tel_number    VARCHAR(15)  unique NOT NULL COMMENT '사용자 휴대폰번호',
  address        TEXT         NOT NULL COMMENT '사용자 주소',
  address_detail TEXT         NULL     COMMENT '사용자 상세 주소',
  profile_image  TEXT         NULL     COMMENT '사용자 프로필사진 URL',
  PRIMARY KEY (email)
) COMMENT '사용자 테이블';

ALTER TABLE board.image
  ADD CONSTRAINT FK_board_TO_image
    FOREIGN KEY (board_number)
    REFERENCES board (board_number);

ALTER TABLE board.board
  ADD CONSTRAINT FK_user_TO_board
    FOREIGN KEY (writer_email)
    REFERENCES user (email);

ALTER TABLE board.favorite
  ADD CONSTRAINT FK_user_TO_favorite
    FOREIGN KEY (user_email)
    REFERENCES user (email);

ALTER TABLE board.favorite
  ADD CONSTRAINT FK_board_TO_favorite
    FOREIGN KEY (board_number)
    REFERENCES board (board_number);

ALTER TABLE board.comment
  ADD CONSTRAINT FK_user_TO_comment
    FOREIGN KEY (user_email)
    REFERENCES user (email);

ALTER TABLE board.comment
  ADD CONSTRAINT FK_board_TO_comment
    FOREIGN KEY (board_number)
    REFERENCES board (board_number);

CREATE VIEW board_list_view AS
SELECT 
    B.board_number AS board_number,
    B.title AS title,
    B.content AS content,
    I.image AS title_image,
    B.favorite_count as favorite_count,
    B.comment_count as comment_count,
    B.view_count AS view_count,
    B.write_datetime AS write_datetime,
    U.nickname AS writer_nickname,
    U.profile_image AS writer_profile_image,
    B.writer_email AS writer_email
FROM board AS B
INNER JOIN user as U
ON B.writer_email = U.email
LEFT JOIN (SELECT board_number, ANY_VALUE(image) AS image FROM image GROUP BY board_number) AS I -- 서브쿼리 : 중복 제거
ON B.board_number = I.board_number;

ALTER TABLE board.image ADD COLUMN sequence INT PRIMARY KEY AUTO_INCREMENT COMMENT '이미지 번호';

ALTER TABLE board.user ADD COLUMN agreed_personal BOOLEAN NOT NULL COMMENT '개인정보 동의 여부';