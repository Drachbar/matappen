package se.matappen.matappen.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "ingredient")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_section_id", nullable = false)
    private IngredientSection fkSection;

    @Column(name = "ingredient_order", nullable = false)
    private Integer ingredientOrder;

    @Column(name = "unit", length = 200)
    private String unit;

    @Column(name = "amount", precision = 6, scale = 2)
    private BigDecimal amount;

}