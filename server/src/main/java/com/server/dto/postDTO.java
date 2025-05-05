package com.server.dto;

import lombok.Data;

@Data
public class PostDTO {
   private long id;
   private String tag_id;
   private String title;
   private String content;
}