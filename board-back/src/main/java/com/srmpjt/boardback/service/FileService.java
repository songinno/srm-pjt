package com.srmpjt.boardback.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    // * 파일 업로드
    String upload(MultipartFile file); // # URL 리턴

    // * 파일(이미지) 얻기
    Resource getImage(String fileName);
}
