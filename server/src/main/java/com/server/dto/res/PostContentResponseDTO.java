package com.server.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostContentResponseDTO {
   private long content_id;
   private String post_id;
   private PostStateResponseDTO state;
   private String content;
}