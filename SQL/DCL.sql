-- Active: 1695274471172@@127.0.0.1@3306@board
CREATE USER 'developer'@'%' IDENTIFIED BY 'askl3114';
-- developer라는 유저 생성
-- 모든 원격지에서 접속 허용

GRANT SELECT, UPDATE, DELETE, INSERT
ON board.*
TO 'developer'@'%';
-- SELECT, UPDATE, DELETE, INSERT 명령어에 대한 권한 설정
-- board 데이터베이스에 있는 모든 테이블에 명령 가능
-- TO 뒤에 @'%'를 안붙이니 실행 안됨 (You are not allowed to create a user with GRANT)