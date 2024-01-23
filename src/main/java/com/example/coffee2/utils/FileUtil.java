package com.example.coffee2.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Scanner;

@Service
@RequiredArgsConstructor
public class FileUtil {
    private final ResourceLoader resourceLoader;

    public String readFileUsingInputStream(String filePath) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:" + filePath);

        try (InputStream inputStream = resource.getInputStream()) {
            Scanner scanner = new Scanner(inputStream).useDelimiter("\\A");
            return scanner.hasNext() ? scanner.next() : "";
        }
    }
}
