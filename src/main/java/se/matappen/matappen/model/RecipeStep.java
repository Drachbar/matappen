package se.matappen.matappen.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "recipe_step")
public class RecipeStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_step_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_recipe_id", nullable = false)
    private Recipe fkRecipe;

    @Column(name = "description", nullable = false, length = 1000)
    private String description;

    @Column(name = "step_order", nullable = false)
    private Integer stepOrder;

}