package se.matappen.matappen.mapper;

import org.springframework.stereotype.Component;
import se.matappen.matappen.dto.*;
import se.matappen.matappen.model.*;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RecipeMapper {
    public RecipeDetailedDto toRecipeDetailedDto(Recipe recipe) {
        RecipeDto recipeDto = toRecipeDto(recipe);

        List<RecipeStepDto> steps = recipe.getSteps().stream()
                .map(this::toRecipeStepDto)
                .collect(Collectors.toList());

        List<IngredientSectionDto> sections = recipe.getSections().stream()
                .map(this::toIngredientSectionDto)
                .collect(Collectors.toList());
        List<ImagesDto> images = recipe.getImages().stream().map(this::toImagesDto).toList();

        return new RecipeDetailedDto(recipeDto, steps, sections, images);
    }

    public RecipeDto toRecipeDto(Recipe recipe) {
        return new RecipeDto(
                recipe.getId(),
                recipe.getNameRecipe(),
                recipe.getDescription(),
                recipe.getCreator().getName());
    }

    public RecipeStepDto toRecipeStepDto(RecipeStep step) {
        return new RecipeStepDto(step.getDescription(), step.getId());
    }

    public IngredientSectionDto toIngredientSectionDto(IngredientSection section) {
        List<IngredientDto> ingredients = section.getIngredients().stream()
                .map(this::toIngredientDto)
                .collect(Collectors.toList());

        return new IngredientSectionDto(
                section.getName(),
                section.getSectionOrder(),
                ingredients);
    }

    public IngredientDto toIngredientDto(Ingredient ingredient) {
        return new IngredientDto(
                ingredient.getName(),
                ingredient.getUnit(),
                ingredient.getIngredientOrder(),
                ingredient.getAmount());
    }

    public ImagesDto toImagesDto(RecipeImage image) {
        return new ImagesDto(image.getName(), image.getWidth(), image.getHeight(), image.getOrder());
    }
}
