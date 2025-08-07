package com.patientportal.backend.controller;

import com.patientportal.backend.model.Document;
import com.patientportal.backend.service.DocumentService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*") // Allow frontend access
public class DocumentController {

    private final DocumentService service;

    public DocumentController(DocumentService service) {
        this.service = service;
    }


    @PostMapping("/upload")
    public ResponseEntity<Document> upload(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(service.uploadFile(file));
    }


    @GetMapping
    public ResponseEntity<List<Document>> listAll() {
        return ResponseEntity.ok(service.listFiles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> download(@PathVariable Long id) throws IOException {
        Document doc = service.getFile(id).orElseThrow();
        FileSystemResource resource = new FileSystemResource(doc.getFilepath());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + doc.getFilename());

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(doc.getFilesize())
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws IOException {
        service.deleteFile(id);
        return ResponseEntity.noContent().build();
    }
}

