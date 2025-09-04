package com.server.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostCategoryResponseDTO{
   private Long category_id;
   private String name;
   private String reg_user;
   private String mod_user;
   private int sort;
}