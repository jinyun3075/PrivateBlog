package com.server.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.server.adapter.in.Service.UploadService;
import com.server.dto.res.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/upload")
public class UploadController {
    private final UploadService service;

    @PostMapping("")
    public ResponseEntity<List<UploadResponseDTO>> uploadFile(@RequestParam("uploadFiles") MultipartFile[] uploadFiles) throws Exception {
        return new ResponseEntity<>(service.uploadFile(uploadFiles), HttpStatus.OK);
    }
}
