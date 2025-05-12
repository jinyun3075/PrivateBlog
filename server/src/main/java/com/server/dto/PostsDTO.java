package com.server.dto;

import lombok.Data;

@Data
public class PostsDTO {
   private long id;
   private String tag_id;
   private String title;
   private String content;
}