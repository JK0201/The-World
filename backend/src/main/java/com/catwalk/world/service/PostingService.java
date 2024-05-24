package com.catwalk.world.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.catwalk.world.dto.PostingDto;
import com.catwalk.world.dto.PostingMapper;
import com.catwalk.world.model.Admin;
import com.catwalk.world.model.Posting;
import com.catwalk.world.repository.AdminRepository;
import com.catwalk.world.repository.PostingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostingService {
    
    @Value("${upload.path}")
    private String uploadPath;
    private final PostingRepository postingRepository;
    private final AdminRepository adminRepository;

    public List<Posting> loadList() {
        return postingRepository.findAllByOrderByIdDesc();
    }

    public void adminCheck (String password) {
        if(password.isEmpty()) throw new IllegalArgumentException("비밀번호를 입력해주세요");

        Admin admin = adminRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("사용자가 존재하지 않습니다"));
        Boolean result = BCrypt.checkpw(password, admin.getPassword());
        if(!result) {
            throw new IllegalArgumentException("비밀번호를 확인 해주세요");
        }
    }

    public void validation (PostingDto postingData) {
        String type = postingData.getType();
        String title = postingData.getTitle().trim();
        String count = postingData.getCount().toString().trim();
        List<String> langs = postingData.getLangs();
        String content = postingData.getContent().trim().replaceAll("\r\n", "\n");
        String github = postingData.getGithub().trim();

        if(type.isEmpty() || title.isEmpty() || count.isEmpty() || langs.size() == 0 || content.isEmpty() || github.isEmpty()) {
            throw new IllegalArgumentException("모든 입력란을 작성 해주세요");
        }

        if(title.length() > 14) {
            throw new IllegalArgumentException("제목은 최대 14자까지 입니다");
        }

        if(content.length() > 1000) {
            throw new IllegalArgumentException("내용은 최대 1000자까지 입니다");
        }

        if(postingData.getCount() > 100 || postingData.getCount() < 1) {
            throw new IllegalArgumentException("인원은 1~99까지 숫자만 입력해주세요");
        }
    }

    /**
     * @param image MultipartFile
     * @return image name changed to UUID || ""
     */
    public String uploadImage(MultipartFile image) {
        try{
            String originalImageName = image.getOriginalFilename();
            if(!originalImageName.contains(".")) {
                throw new IllegalArgumentException("파일 이름에 확장자가 포함되어 있지 않습니다"); 
            }
            String ext = originalImageName.substring(originalImageName.lastIndexOf(".") + 1);
            String imageName = UUID.randomUUID().toString() + "." + ext;
            image.transferTo(new File(uploadPath + imageName));
            return imageName;
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드에 실패하였습니다", e);
        }
    }

    public void addPost (PostingDto postingData) {
        String password = postingData.getPassword();
        adminCheck(password);
        validation(postingData);
        
        String imageName;
        MultipartFile file = postingData.getImage();
        if(file == null || file.isEmpty()) {
            imageName = "";
        } else {
            imageName = uploadImage(file);
        }
        
        List<String> langsArray = postingData.getLangs();
        String langs = String.join(",", langsArray);
        Posting posting = PostingMapper.toPosting(null, postingData, imageName, langs);
        postingRepository.save(posting);
    }

    public void delPost (Long id, String password) {
        adminCheck(password);
        Posting posting = postingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 존재 하지 않습니다"));
        
        File oldImage = new File(uploadPath + posting.getImage());
        if(oldImage.exists()) oldImage.delete();
                
        postingRepository.deleteById(id);
    }

    public void updatePost(Long id, PostingDto postingData) {
        String password = postingData.getPassword();
        adminCheck(password);
        validation(postingData);
        
        Posting posting = postingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 존재 하지않습니다"));
        
        String imageName;
        MultipartFile file = postingData.getImage();
        if(file == null || file.isEmpty()) {
            imageName = posting.getImage();
        } else {
            imageName = uploadImage(file);
            File oldImage = new File(uploadPath + posting.getImage());
            if(oldImage.exists()) oldImage.delete();
        }

        List<String> langsArray = postingData.getLangs();
        String langs = String.join(",", langsArray);
        Posting update = PostingMapper.toPosting(id, postingData, imageName, langs);
        postingRepository.save(update);
    }
}
