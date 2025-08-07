package com.patientportal.backend.service;

import com.patientportal.backend.model.Document;
import com.patientportal.backend.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final DocumentRepository repository;

    public DocumentService(DocumentRepository repository) {
        this.repository = repository;
    }

    public Document uploadFile(MultipartFile file) throws IOException {
        if (!file.getContentType().equals("application/pdf")) {
            throw new IOException("Only PDF files are allowed.");
        }

        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        Path path = Paths.get(uploadDir, file.getOriginalFilename());
        Files.write(path, file.getBytes());

        Document doc = new Document();
        doc.setFilename(file.getOriginalFilename());
        doc.setFilepath(path.toString());
        doc.setFilesize(file.getSize());

        return repository.save(doc);
    }

    public List<Document> listFiles() {
        return repository.findAll();
    }

    public Optional<Document> getFile(Long id) {
        return repository.findById(id);
    }

    public void deleteFile(Long id) throws IOException {
        Optional<Document> doc = repository.findById(id);
        if (doc.isPresent()) {
            Files.deleteIfExists(Paths.get(doc.get().getFilepath()));
            repository.deleteById(id);
        }
    }
}
