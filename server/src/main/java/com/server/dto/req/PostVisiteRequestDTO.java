package com.server.dto.req;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostVisiteRequestDTO {
   private long visite_id;
   private long visite;
   private LocalDateTime regDate;
}