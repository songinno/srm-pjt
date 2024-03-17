package com.srmpjt.boardback.service.implement;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class BoardServiceImplTest {
    @Test
    @DisplayName("현재 날짜 기준, 월초와 월말의 날짜 구하기")
    void getDateTest() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        // ! 초일
        int minimum = calendar.getActualMinimum(Calendar.DAY_OF_MONTH);
        // ! 말일
        int maximum = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

        calendar.set(Calendar.DAY_OF_MONTH, minimum);

        String firstDay = simpleDateFormat.format(calendar.getTime());
//        System.out.println("firstDay = " + firstDay);

        assertThat(firstDay).isEqualTo("2024-03-01");

        calendar.set(Calendar.DAY_OF_MONTH, maximum);

        String lastDay = simpleDateFormat.format(calendar.getTime());
//        System.out.println("lastDay = " + lastDay);
        assertThat(lastDay).isEqualTo("2024-03-31");

    }
}