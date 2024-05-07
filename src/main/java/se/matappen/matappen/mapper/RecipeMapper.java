package se.matappen.matappen.mapper;

import org.springframework.stereotype.Component;
import se.matappen.matappen.dto.*;
import se.matappen.matappen.model.Ingredient;
import se.matappen.matappen.model.IngredientSection;
import se.matappen.matappen.model.Recipe;
import se.matappen.matappen.model.RecipeStep;

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

        return new RecipeDetailedDto(recipeDto, steps, sections);
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
}
