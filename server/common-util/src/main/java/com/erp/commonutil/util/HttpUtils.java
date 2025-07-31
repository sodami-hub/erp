package com.erp.commonutil.util;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * HTTP 관련 유틸리티 클래스
 */
public class HttpUtils {

  private static final String HEADER_USER_AGENT = "User-Agent";
  private static final String UNKNOWN_BROWSER = "Unknown";
  private static final String HEADER_X_FORWARDED_FOR = "X-Forwarded-For";

  /**
   * Header UserAgent 에서 브라우저 정보 반환
   *
   * @return 브라우저 이름
   */
  public static String getRequestBrowser() {
    HttpServletRequest httpServletRequest = getHttpServletRequest();

    String userAgent = httpServletRequest.getHeader(HEADER_USER_AGENT);
    if (StringUtils.hasText(userAgent)) {
      return parseBrowser(userAgent);
    }

    return UNKNOWN_BROWSER;
  }

  /**
   * User-Agent 헤더에서 브라우저 정보를 파싱
   *
   * @param agent
   * @return 브라우저 이름
   */
  private static String parseBrowser(String agent) {
      if (agent.contains("trident/7.0")) {
          return "IE11";
      }
      if (agent.contains("msie 10")) {
          return "IE10";
      }
      if (agent.contains("msie 9")) {
          return "IE9";
      }
      if (agent.contains("msie 8")) {
          return "IE8";
      }
      if (agent.contains("edg")) {
          return "Edge";
      }
      if (agent.contains("chrome")) {
          return "Chrome";
      }
      if (!agent.contains("chrome") && agent.contains("safari")) {
          return "Safari";
      }
      if (agent.contains("firefox")) {
          return "Firefox";
      }

    return UNKNOWN_BROWSER;
  }

  public static String getRequestIp() {
    HttpServletRequest httpServletRequest = getHttpServletRequest();
    String ip = httpServletRequest.getHeader(HEADER_X_FORWARDED_FOR);
    if (StringUtils.hasText(ip)) {
      // X-Forwarded-For 헤더가 존재하면, 클라이언트 IP를 반환
      return ip;
    }

    // TODO X-Forwarded-For 없을 경우 프록시 IP 추가
    return httpServletRequest.getRemoteAddr();
  }

  /**
   * 현재 HttpServletRequest 반환
   *
   * @return HttpServletRequest
   */
  public static HttpServletRequest getHttpServletRequest() {
    RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();

    if (requestAttributes == null || !(requestAttributes instanceof ServletRequestAttributes)) {
      // TODO 에러코드 처리 필요
      throw new IllegalStateException("HTTP 없음");
    }

    return ((ServletRequestAttributes) requestAttributes).getRequest();
  }
}
