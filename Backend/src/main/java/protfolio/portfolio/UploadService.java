package protfolio.portfolio;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.common.collect.ImmutableMap;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class UploadService {
    public String uploadFile(MultipartFile multipartFile) throws IOException {
        // Generate the object name for the uploaded file
        String objectName = generateFileName(multipartFile);

        // Load Firebase credentials
        FileInputStream serviceAccount = new FileInputStream("your_service_account");
        File file = convertMultiPartToFile(multipartFile);
        Path filePath = file.toPath();

        // Initialize Firebase Storage
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setProjectId("your_projectid")
                .build()
                .getService();

        // Generate a unique download token
        String downloadToken = UUID.randomUUID().toString();

        // Define the BlobId and BlobInfo for the upload, including the download token in metadata
        BlobId blobId = BlobId.of("your_blobid", objectName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(multipartFile.getContentType())
                .setMetadata(ImmutableMap.of("firebaseStorageDownloadTokens", downloadToken))
                .build();

        // Upload the file to Firebase Storage
        storage.create(blobInfo, Files.readAllBytes(filePath));

        // Construct the download URL
        String imageUrl = "https://firebasestorage.googleapis.com/v0/b/"
                + "url"
                + "/o/"
                + objectName
                + "?alt=media&token="
                + downloadToken;

        return imageUrl;  // Return the public URL with token
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());
        fos.close();
        return convertedFile;
    }

    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + Objects.requireNonNull(multiPart.getOriginalFilename()).replace(" ", "_");
    }

    public void saveData(ProjectData projectData) {
        Firestore firestore = FirestoreClient.getFirestore();
        firestore.collection("projects").document().set(projectData);
    }

    public List<ProjectData> getAllProjects() {
        Firestore db = FirestoreClient.getFirestore();
        List<ProjectData> projectDataList = new ArrayList<>();

        try {
            db.collection("projects")
                    .get()
                    .get()
                    .getDocuments()
                    .forEach(document -> {
                        ProjectData projectData = document.toObject(ProjectData.class);
                        projectDataList.add(projectData);
                    });
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return projectDataList;
    }
}
