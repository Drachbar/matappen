package se.matappen.matappen.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "recipe_images")
@Setter
@Getter
public class RecipeImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer imageId;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe fkRecipe;

    @Column(name = "image_order", nullable = false)
    private int order;
    private String name;
    private int width;
}
