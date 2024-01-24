package com.example.coffee2.utils;

import java.util.ArrayList;
import java.util.List;

public class MemoriesStorage {
    public static List<String> offensive_words = new ArrayList<>();

    public static boolean contain(String str) {
        boolean isContain = false;
        for (String s : offensive_words) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            if (str.contains(s) && s.length() > 1) {
                isContain = true;
                break;
=======
            if (str.contains(s)) {
                isContain = true;
>>>>>>> Stashed changes
=======
            if (str.contains(s)) {
                isContain = true;
>>>>>>> Stashed changes
            }
        }
        return isContain;
    }
}
