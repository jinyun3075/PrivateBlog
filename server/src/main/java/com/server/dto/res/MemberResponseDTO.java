package com.server.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDTO{
   private Long user_id;
   private Long role_id;
   private String role_action;
   private String Token;
   private String name;
   private String password;
   private String reg_user;
}