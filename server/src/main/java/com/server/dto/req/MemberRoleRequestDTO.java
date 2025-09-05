package com.server.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberRoleRequestDTO{
   private Long role_id;
   private String action;
   private boolean use_yn;
}