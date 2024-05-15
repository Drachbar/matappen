package se.matappen.matappen.dto;

import java.util.List;

public record IngredientSectionDto(String name, Integer sectionOrder, List<IngredientDto> ingredients) {
}
