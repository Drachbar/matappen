package se.matappen.matappen.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import se.matappen.matappen.dto.*;
import se.matappen.matappen.mapper.RecipeMapper;
import se.matappen.matappen.model.Recipe;
import se.matappen.matappen.model.User;
import se.matappen.matappen.repository.RecipeRepository;
import se.matappen.matappen.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recipe")
@AllArgsConstructor
public class RecepieController {

    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final RecipeMapper recipeMapper;

    @PostMapping("/add")
    public ResponseEntity<Void> addRecipe(@RequestBody Recipe recipe) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName());
        recipe.setCreator(user);

        recipe.getSteps().forEach(step -> step.setFkRecipe(recipe));
        recipe.getSections().forEach(section -> {
            section.setFkRecipe(recipe);
            section.getIngredients().forEach(ingredient -> ingredient.setFkSection(section));
        });

        recipeRepository.save(recipe);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/getRecipes")
    public ResponseEntity<List<RecipeDto>> getRecipesByName(@RequestParam final String name) {
        List<Recipe> recipes = recipeRepository.findByNameRecipeContaining(name);
        List<RecipeDto> recipeDtos = recipes.stream()
                .map(recipeMapper::toRecipeDto).toList();
        return ResponseEntity.ok(recipeDtos);
    }

    @GetMapping("/getRecipeById")
    public ResponseEntity<RecipeDetailedDto> getRecipeById(@RequestParam final int id) {
        return recipeRepository.findById(id)
                .map(recipeMapper::toRecipeDetailedDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
