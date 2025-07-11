package com.erp.commonutil.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class DateTimeUtil {

  public static LocalDateTime nowFromZone() {
    return ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();
  }
}
