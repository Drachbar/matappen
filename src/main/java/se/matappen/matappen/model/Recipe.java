package se.matappen.matappen.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "recipe")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id", nullable = false)
    private Integer id = 0;

    @Column(name = "name_recipe", nullable = false, length = 100)
    private String nameRecipe;

    @Lob
    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_creator_id", nullable = false)
    private User creator;

    @OneToMany(mappedBy = "fkRecipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeStep> steps = new ArrayList<>();

    @OneToMany(mappedBy = "fkRecipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IngredientSection> sections = new ArrayList<>();

}