package se.matappen.matappen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.matappen.matappen.model.Recipe;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findByNameRecipeContaining(String name);
    List<Recipe> findByCreatorId(Integer creatorId);
}