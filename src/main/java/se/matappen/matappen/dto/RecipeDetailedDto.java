package se.matappen.matappen.dto;

import java.util.List;

public record RecipeDetailedDto(RecipeDto recipeDto, List<RecipeStepDto> recipeStepsDto,
                                List<IngredientSectionDto> ingredientSectionsDto, List<ImagesDto> imagesDto) {
}
