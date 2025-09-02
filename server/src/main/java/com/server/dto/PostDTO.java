package com.server.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {
   private long post_id;
   private long category_id;
   private PostContentDTO content;
   private String title;
   private String thumbnail;
   private int main_sort;
   private boolean use_yn;
   private String reg_user;
   private LocalDateTime regDate;
   private LocalDateTime modDate;
}