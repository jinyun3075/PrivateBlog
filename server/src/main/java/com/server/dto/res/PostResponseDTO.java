package com.server.dto.res;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseDTO {
   private long post_id;
   private PostCategoryResponseDTO category;
   private PostContentResponseDTO content;   
   private PostViewResponseDTO postView;
   private String title;
   private String thumbnail;
   private int main_sort;
   private boolean use_yn;
   private String reg_user;
   private LocalDateTime regDate;
   private LocalDateTime modDate;
}