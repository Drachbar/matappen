package se.matappen.matappen.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "ingredient_section")
public class IngredientSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_section_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_recipe_id", nullable = false)
    private Recipe fkRecipe;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "section_order", nullable = false)
    private Integer sectionOrder;

    @OneToMany(mappedBy = "fkSection", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingredient> ingredients = new ArrayList<>();

}