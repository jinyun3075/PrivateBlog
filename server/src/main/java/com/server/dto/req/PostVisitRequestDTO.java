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
public class PostVisitRequestDTO {
   private long visit_id;
   private long visit;
   private LocalDateTime regDate;
}
