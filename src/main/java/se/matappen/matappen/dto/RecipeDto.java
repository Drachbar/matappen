package se.matappen.matappen.dto;

import java.util.Optional;

public record RecipeDto(Integer id, String nameRecipe, String description, String creatorName, Optional<String> imageUrl) {
}
