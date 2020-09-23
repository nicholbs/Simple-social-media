/* Create database */
CREATE DATABASE IF NOT EXISTS `prog2053-proj`;

/* Create tables */
CREATE TABLE `users` (
  `uid` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(128) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `userType` ENUM('admin', 'moderator', 'user') DEFAULT "user" NOT NULL,
  `picture` LONGBLOB DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE = InnoDB CHARSET = utf8 COLLATE utf8_bin;

CREATE TABLE `posts` (
`pid` BIGINT(8) NOT NULL AUTO_INCREMENT,
`user` BIGINT(8) NOT NULL,
`title` VARCHAR(200) NOT NULL, 
`content` VARCHAR(20000) NOT NULL,
PRIMARY KEY (`pid`),
FOREIGN KEY (`user`) REFERENCES users(`uid`)
) ENGINE = InnoDB CHARSET = utf8 COLLATE utf8_bin;

CREATE TABLE `comments` (
`cid` BIGINT(8) NOT NULL AUTO_INCREMENT,
`post` BIGINT(8) NOT NULL,
`user` BIGINT(8) NOT NULL,
`comment` VARCHAR(20000),
PRIMARY KEY (`cid`),
FOREIGN KEY (`user`) REFERENCES users(`uid`),
FOREIGN KEY(`post`) REFERENCES posts(`pid`)
) ENGINE = InnoDB CHARSET = utf8 COLLATE utf8_bin;

/* Insert data */
INSERT INTO `users` (`uid`, `email`, `password`, `userType`) VALUES ('1','bartell.martine@example.com','40bcc6f6193986153cae1bb1c36668650a3d5f97','admin'),
('2','zcrona@example.net','1f66d81577cd95514cedc8504d65ec8eff9c336a','moderator'),
('3','wgaylord@example.com','3fcba21eebd2d09681515b4849d2bbeae566451e','user');

INSERT INTO `posts` VALUES ('1','3','Animi ut occaecati omnis iure magnam aliquam quam.','Dolorum beatae porro autem et possimus qui eum. Et facilis soluta quo distinctio. Voluptatem quam quia fugiat quaerat dolore aut. Autem autem aut minus quia optio.'),
('2','2','Nobis laboriosam totam labore aut possimus pariatur recusandae.','Accusantium unde dignissimos quia ab quas corporis. Impedit possimus rerum ut ratione qui et a. Illum cum fugit atque.'),
('3','1','Optio consequuntur sint tempore molestiae aut esse.','Modi quia eius natus consectetur ab ut. Animi facilis quam placeat. Illo nulla autem ut qui voluptate aut.');

INSERT INTO `comments` VALUES ('1','1','2','Possimus nesciunt dicta neque. Sint voluptatem sequi aliquid voluptas beatae. Sed incidunt ad voluptas ut facere. Molestiae id qui commodi molestiae mollitia dolorum voluptatem eos.'),
('2','2','1','Modi ut et soluta deserunt. Saepe qui nesciunt illum quis in est. Quia dignissimos tenetur nam accusantium accusantium vitae libero.'),
('3','3','3','Repudiandae officia tempora dolore illum. Quis perspiciatis fugiat maiores inventore. Ut sit et velit debitis doloribus error. Culpa reiciendis soluta dolores libero fugit explicabo.');
