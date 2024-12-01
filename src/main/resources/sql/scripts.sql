create
database matappen;

use
matappen;

CREATE TABLE `user`
(
    `user_id`   int          NOT NULL AUTO_INCREMENT,
    `name`      varchar(100) NOT NULL,
    `email`     varchar(254) NOT NULL,
    `password`  varchar(500) NOT NULL,
    `role`      varchar(100) NOT NULL DEFAULT 'user',
    `create_dt` datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `activated` tinyint               DEFAULT '0',
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `email` (`email`)
);

-- Lösen: 12345
INSERT INTO user(name, email, password)
values ("Mattias", "matte@andersson.se", "$2a$10$klNU4q0egP.93Kp97ad4quDnmK7Oxz6xJQDmeedMdWnc6ALnEVSFi");

CREATE TABLE `recipe`
(
    `recipe_id`     int          NOT NULL AUTO_INCREMENT,
    `name_recipe`   varchar(100) NOT NULL,
    `description`   text,
    `fk_creator_id` int          NOT NULL,
    PRIMARY KEY (`recipe_id`),
    UNIQUE KEY `recepie_id_UNIQUE` (`recipe_id`),
    KEY             `creator_id` (`fk_creator_id`),
    CONSTRAINT `creator_id` FOREIGN KEY (`fk_creator_id`) REFERENCES `user` (`user_id`)
)

CREATE TABLE `recipe_step`
(
    `recipe_step_id` int           NOT NULL AUTO_INCREMENT,
    `fk_recipe_id`   int           NOT NULL,
    `description`    varchar(1000) NOT NULL,
    `step_order`     int           NOT NULL,
    PRIMARY KEY (`recipe_step_id`),
    KEY              `step-recipe` (`fk_recipe_id`),
    CONSTRAINT `fk_recipe_step_recipe` FOREIGN KEY (`fk_recipe_id`) REFERENCES `recipe` (`recipe_id`)
);

CREATE TABLE `ingredient_section`
(
    `ingredient_section_id` int          NOT NULL AUTO_INCREMENT,
    `fk_recipe_id`          int          NOT NULL,
    `name`                  varchar(100) NOT NULL,
    `section_order`         int          NOT NULL,
    PRIMARY KEY (`ingredient_section_id`),
    KEY                     `recipe-ingredient_section` (`fk_recipe_id`),
    CONSTRAINT `recipe-ingredient_section` FOREIGN KEY (`fk_recipe_id`) REFERENCES `recipe` (`recipe_id`)
);

CREATE TABLE `ingredient`
(
    `ingredient_id`    int          NOT NULL AUTO_INCREMENT,
    `name`             varchar(200) NOT NULL,
    `fk_section_id`    int          NOT NULL,
    `ingredient_order` int          NOT NULL,
    `unit`             varchar(200)  DEFAULT NULL,
    `amount`           decimal(6, 2) DEFAULT NULL,
    PRIMARY KEY (`ingredient_id`),
    KEY                `ingredient-ingredient_section_id` (`fk_section_id`),
    CONSTRAINT `ingredient-ingredient_section` FOREIGN KEY (`fk_section_id`) REFERENCES `ingredient_section` (`ingredient_section_id`)
);

CREATE TABLE `recipe_images`
(
    `image_id`  int          NOT NULL AUTO_INCREMENT,
    `recipe_id` int          NOT NULL,
    `order`     int          NOT NULL,
    `name`      varchar(200) NOT NULL,
    `width`     int          NOT NULL,
    PRIMARY KEY (`image_id`),
    UNIQUE KEY `unique_recipe_image` (`recipe_id`, `order`, `width`),
    CONSTRAINT `fk_recipe_images_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`)
);