package se.matappen.matappen.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Profile("dev")
@RestController
@RequestMapping("/images")
public class ImageController {

    @Value("${upload.path}")
    private String uploadPath;

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        File file = new File(uploadPath + File.separator + filename);

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new UrlResource(file.toURI());

        if (!resource.exists() || !resource.isReadable()) {
            throw new IOException("Kan inte läsa filen: " + filename);
        }

        String contentType = Files.probeContentType(file.toPath());
        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(resource);
    }
}
