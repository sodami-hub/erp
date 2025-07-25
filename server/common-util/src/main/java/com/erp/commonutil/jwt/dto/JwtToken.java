package com.erp.commonutil.jwt.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@NoArgsConstructor
@Getter
@Setter
@ToString
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
