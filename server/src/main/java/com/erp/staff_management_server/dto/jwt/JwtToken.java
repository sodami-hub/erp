package com.erp.staff_management_server.dto.jwt;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@Getter
@Setter
public class JwtToken {

  private String grantType;
  private String accessToken;
  private String refreshToken;


  @JsonCreator
  public JwtToken(
      @JsonProperty("grantType") String grantType,
      @JsonProperty("accessToken") String accessToken,
      @JsonProperty("refreshToken") String refreshToken
  ) {
    this.grantType = grantType;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
