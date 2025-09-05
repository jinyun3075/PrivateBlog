package com.server.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostRequestDTO {
   private String post_id;
   private Long category_id;
   private Long state_id;
   private String reg_user;
   private String thumbnail;
   private String title;
   private String content;
   private int main_sort;
   private boolean use_yn;
}