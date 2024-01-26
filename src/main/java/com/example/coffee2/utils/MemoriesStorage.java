package com.example.coffee2.utils;

import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public class MemoriesStorage {
    public static List<String> offensive_words = new ArrayList<>();

    public static boolean contain(String str) {
        boolean isContain = false;
        String[] sSplit = str.split("[\\\\.,s!;?:\"]+");
        for (String s : offensive_words) {
            for (String split_s : sSplit) {
                if (split_s.equals(s)) {
                    log.info(split_s);
                    isContain = true;
                    break;
                }
            }
        }
        return isContain;
    }
}
