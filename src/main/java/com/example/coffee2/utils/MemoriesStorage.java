package com.example.coffee2.utils;

import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public class MemoriesStorage {
    public static List<String> offensive_words = new ArrayList<>();

    public static boolean contain(String str) {
        boolean isContain = false;
        for (String s : offensive_words) {
            if (str.contains(s) && s.length() > 1) {
                isContain = true;
                break;
            }
        }
        return isContain;
    }
}
