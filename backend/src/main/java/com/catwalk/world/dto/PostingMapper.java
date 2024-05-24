package com.catwalk.world.dto;

import org.springframework.stereotype.Component;

import com.catwalk.world.model.Posting;

@Component
public class PostingMapper {

    /**
     * @param id
     * @param postingData
     * @param imageName
     * @param langs
     * @return Posting type
     */
    public static Posting toPosting (Long id, PostingDto postingData, String imageName, String langs) {
        Posting posting = new Posting();
        posting.setId(postingData.getId());
        posting.setType(postingData.getType());
        posting.setTitle(postingData.getTitle());
        posting.setCount(postingData.getCount());
        posting.setLangs(langs);
        posting.setContent(postingData.getContent());
        posting.setLink(postingData.getLink().trim());
        posting.setGithub(postingData.getGithub());
        posting.setImage(imageName);
        return posting;
    }
}
