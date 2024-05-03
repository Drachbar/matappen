create
database matappen;

use
matappen;

CREATE TABLE `user`
(
    `user_id`   int          NOT NULL AUTO_INCREMENT,
    `name`      varchar(100) NOT NULL,
    `email`     varchar(100) NOT NULL,
    `password`  varchar(500) NOT NULL,
    `role`      varchar(100) NOT NULL,
    `create_dt` date DEFAULT NULL,
    PRIMARY KEY (`user_id`)
);