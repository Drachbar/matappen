package se.matappen.matappen.mapper;

import org.springframework.stereotype.Component;
import se.matappen.matappen.dto.*;
import se.matappen.matappen.model.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class RecipeMapper {
    public RecipeDetailedDto toRecipeDetailedDto(Recipe recipe) {
        final RecipeDto recipeDto = toRecipeDto(recipe);

        final List<RecipeStepDto> steps = recipe.getSteps().stream()
                .map(this::toRecipeStepDto)
                .collect(Collectors.toList());

        final List<IngredientSectionDto> sections = recipe.getSections().stream()
                .map(this::toIngredientSectionDto)
                .collect(Collectors.toList());
        final List<ImagesDto> images = recipe.getImages().stream().map(this::toImagesDto).toList();

        return new RecipeDetailedDto(recipeDto, steps, sections, images);
    }

    public RecipeDto toRecipeDto(Recipe recipe) {
        final Optional<String> imageUrl = recipe.getImages() != null && !recipe.getImages().isEmpty()
                ? Optional.of(recipe.getImages().getFirst().getName())
                : Optional.empty();

        return new RecipeDto(
                recipe.getId(),
                recipe.getNameRecipe(),
                recipe.getDescription(),
                recipe.getCreator().getName(),
                imageUrl
        );
    }

    public RecipeStepDto toRecipeStepDto(RecipeStep step) {
        return new RecipeStepDto(step.getDescription(), step.getStepOrder(), step.getId());
    }

    public IngredientSectionDto toIngredientSectionDto(IngredientSection section) {
        List<IngredientDto> ingredients = section.getIngredients().stream()
                .map(this::toIngredientDto)
                .collect(Collectors.toList());

        return new IngredientSectionDto(
                section.getName(),
                section.getSectionOrder(),
                ingredients, section.getId());
    }

    public IngredientDto toIngredientDto(Ingredient ingredient) {
        return new IngredientDto(
                ingredient.getName(),
                ingredient.getUnit(),
                ingredient.getIngredientOrder(),
                ingredient.getAmount(),
                ingredient.getId());
    }

    public ImagesDto toImagesDto(RecipeImage image) {
        return new ImagesDto(image.getName(), image.getWidth(), image.getHeight(), image.getOrder(), image.getImageId());
    }
}
