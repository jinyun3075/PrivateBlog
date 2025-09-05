package com.server.dto.res;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class UploadResponseDTO implements Serializable {
    private String fileName;
    private String uuid;
    private String folderPath;
    private String imageUrl;
}
