package se.matappen.matappen.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.matappen.matappen.dto.RecipeDetailedDto;
import se.matappen.matappen.dto.RecipeDto;
import se.matappen.matappen.mapper.RecipeMapper;
import se.matappen.matappen.model.Recipe;
import se.matappen.matappen.model.RecipeImage;
import se.matappen.matappen.model.User;
import se.matappen.matappen.repository.RecipeRepository;
import se.matappen.matappen.repository.UserRepository;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/recipe")
@RequiredArgsConstructor
public class RecepieController {

    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final RecipeMapper recipeMapper;

    @Value("${upload.path}") // Ladda upp bilder till en konfigurerad mapp
    private String uploadPath;

    @PostMapping("/add")
    public ResponseEntity<Void> addRecipe(
            @RequestPart("recipe") Recipe recipe,
            @RequestPart("images") List<MultipartFile> images) throws IOException {

        // Hämta den inloggade användaren
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName());
        recipe.setCreator(user);

        recipe.getSteps().forEach(step -> step.setFkRecipe(recipe));
        recipe.getSections().forEach(section -> {
            section.setFkRecipe(recipe);
            section.getIngredients().forEach(ingredient -> ingredient.setFkSection(section));
        });

        // Hantera bilduppladdning
        int order = 1;
        for (MultipartFile image : images) {
            if (!image.isEmpty()) {
                String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
                File targetFile = new File(uploadPath + File.separator + filename);
                image.transferTo(targetFile);

                BufferedImage bufferedImage = ImageIO.read(targetFile);
                if (bufferedImage == null) {
                    throw new IOException("Kan inte läsa bildfilen: " + targetFile.getName());
                }
                // Returnera bildens bredd
                bufferedImage.getWidth();

                RecipeImage recipeImage = new RecipeImage();
                recipeImage.setFkRecipe(recipe);
                recipeImage.setOrder(order++);
                recipeImage.setName(filename);
                recipeImage.setWidth(bufferedImage.getWidth());

                recipe.getImages().add(recipeImage); // Lägg till bilder i receptet
            }
        }

        // Spara recept med bilder
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
