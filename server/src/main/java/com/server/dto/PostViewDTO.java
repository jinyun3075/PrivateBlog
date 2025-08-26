package com.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostViewDTO {
   private long view_id;
   private long post_id;
   private long view;
   private long visite;
}