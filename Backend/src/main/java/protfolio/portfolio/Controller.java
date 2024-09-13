package protfolio.portfolio;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/project")
public class Controller {

    private final UploadService uploadService;

    public Controller(UploadService uploadService) {
        this.uploadService = uploadService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFileWithData(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("desc") String desc,
            @RequestParam("link") String link,
            @RequestParam("body") String body
    ) throws IOException {
        // Upload the file and get the public URL
        String imgUrl = uploadService.uploadFile(file);

        // Create ProjectData object with image URL
        ProjectData projectData = new ProjectData();
        projectData.setImageUrl(imgUrl);  // Set the image URL here
        projectData.setTitle(title);
        projectData.setDesc(desc);
        projectData.setLink(link);
        projectData.setBody(body);

        // Save project data to Firestore
        uploadService.saveData(projectData);

        return ResponseEntity.ok("File and Data uploaded successfully");
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectData>> getAllProjects(){
        List<ProjectData> projectDataList = uploadService.getAllProjects();
        return ResponseEntity.ok(projectDataList);
    }

    }

