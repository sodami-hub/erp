package com.erp.commonutil.jwt;

import com.erp.commonutil.jwt.dto.JwtToken;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToJwtTokenConverter implements Converter<String, JwtToken> {

  private final ObjectMapper objectMapper = new ObjectMapper();

  @Override
  public JwtToken convert(String source) {
    try {
      return objectMapper.readValue(source, JwtToken.class);
    } catch (Exception e) {
      throw new IllegalArgumentException("Invalid JWT Token format", e);
    }
  }
}
