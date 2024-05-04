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
)