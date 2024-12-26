package se.matappen.matappen.dto;

import java.math.BigDecimal;

public record IngredientDto(String name, String unit, Integer ingredientOrder, BigDecimal amount, Integer id) {
}
