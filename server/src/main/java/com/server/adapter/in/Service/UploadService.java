package com.server.adapter.in.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.server.dto.res.UploadResponseDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UploadService {
    private final String uploadDir = "/upload/";
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    public List<UploadResponseDTO> uploadFile(MultipartFile[] uploadFiles) throws Exception {
        List<UploadResponseDTO> resultDTOList = new ArrayList<>();
        
        for(MultipartFile file : uploadFiles){
            if(file.isEmpty()) continue;

            // 파일 크기 체크
            if(file.getSize() > MAX_FILE_SIZE) {
                throw new RuntimeException("파일 크기가 너무 큽니다. 최대 10MB까지 업로드 가능합니다: " + file.getOriginalFilename());
            }

            try{
                String originalFilename = file.getOriginalFilename();
                String str_UUID = UUID.randomUUID() + "_";
                String uniqueFilename = str_UUID + originalFilename;

                File destFile = new File(uploadDir + uniqueFilename);
                file.transferTo(destFile);
                UploadResponseDTO result = new UploadResponseDTO(uniqueFilename, str_UUID, uploadDir, "api/image/" + uniqueFilename);
                resultDTOList.add(result);
            } catch (IOException e) {
                throw new RuntimeException("파일 업로드 실패: " + file.getOriginalFilename(), e);
            }
        }
        return resultDTOList;
    }
}
