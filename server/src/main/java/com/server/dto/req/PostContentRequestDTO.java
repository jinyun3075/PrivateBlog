package com.server.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostContentRequestDTO {
   private long content_id;
   private long post_id;
   private long state_id;
   private String content;
}