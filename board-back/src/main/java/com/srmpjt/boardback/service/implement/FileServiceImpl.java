package com.srmpjt.boardback.service.implement;

import com.srmpjt.boardback.service.FileService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
@Getter
@Setter // ! properties 값 바인딩을 위해 필수
@ConfigurationProperties(prefix = "com.srmpjt.boardback.file")
public class FileServiceImpl implements FileService {

    // * application.properties
    private String filePath;
    private String fileUrl;

    @Override
    public String upload(MultipartFile file) {
        if (file.isEmpty()) return null;

        System.out.println("filePath : " + filePath);
        System.out.println("fileUrl : " + fileUrl);

        // ! 오리지널 파일명
        String originalFileName = file.getOriginalFilename();
        // ! 파일 확장자
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        // ! UUID
        String uuid = UUID.randomUUID().toString();
        // ! 새로운 저장 파일명
        String saveFileName = uuid + extension;
        // ! 최종 저장 경로 = 파일 저장 경로 + 파일명
        String savePath = filePath + saveFileName;

        try {
            // ! 파일 저장 경로 확인 및 생성
            File dir = new File(filePath);
            if (!dir.exists()) {
                dir.mkdir();
            }

            // ! 파일 저장
            file.transferTo(new File(savePath));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        // ! 파일 접근 경로
        String url = fileUrl + saveFileName;
        return url;
    }

    @Override
    public Resource getImage(String fileName) {
        // ! 반환해 줄 리소스
        Resource resource;

        try {
            resource = new UrlResource("file:" + filePath + fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return resource;
    }
}
