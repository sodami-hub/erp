package com.erp.server.util;

import java.time.format.DateTimeFormatter;

public class DateFormatUtil {

  public static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(
      "yyyy-MM-dd HH:mm:ss");
}
