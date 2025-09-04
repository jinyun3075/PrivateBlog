package com.server.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberRequestDTO{
   private Long user_id;
   private Long role_id;
   private String role_name;
   private String name;
   private String password;
   private String reg_user;
}