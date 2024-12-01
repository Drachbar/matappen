package se.matappen.matappen.model;

import jakarta.persistence.*;

@Entity
@Table(name = "recipe_images")
public class RecipeImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer imageId;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    private int order;
    private String name;
    private int width;
}
