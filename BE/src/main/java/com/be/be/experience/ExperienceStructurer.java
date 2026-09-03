package com.be.be.experience;

import com.be.be.experience.ExperienceDtos.StructureResponse;

public interface ExperienceStructurer {
    StructureResponse structure(String originalText);
}
