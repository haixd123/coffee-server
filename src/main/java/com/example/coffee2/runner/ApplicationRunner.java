package com.example.coffee2.runner;

import com.example.coffee2.utils.FileUtil;
import com.example.coffee2.utils.MemoriesStorage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
@Slf4j
public class ApplicationRunner implements CommandLineRunner {
    private final FileUtil fileUtil;

    @Override
    public void run(String... args) throws Exception {
        MemoriesStorage.offensive_words = Arrays.stream(fileUtil.readFileUsingInputStream("data.txt").split(",")).collect(Collectors.toList());
    }
}
