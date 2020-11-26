/* Create database */
CREATE DATABASE IF NOT EXISTS `prog2053-proj`;

/* Create tables */
CREATE TABLE `users` (
  `uid` bigint(8) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) COLLATE utf8_bin NOT NULL,
  `password` varchar(128) COLLATE utf8_bin NOT NULL,
  `userType` enum('admin','moderator','user') COLLATE utf8_bin NOT NULL DEFAULT 'user',
  `picture` varchar(128) COLLATE utf8_bin DEFAULT 'http://localhost:8081/images/userStandardPic.png',
  `username` varchar(128) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `requests` (
  `rid` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `user` BIGINT(8) NOT NULL,
  `userType` ENUM('admin', 'moderator', 'user') DEFAULT "user" NOT NULL,
  PRIMARY KEY (`rid`)
) ENGINE = InnoDB CHARSET = utf8 COLLATE utf8_bin;

CREATE TABLE `comments` (
  `cid` bigint(8) NOT NULL AUTO_INCREMENT,
  `pid` bigint(8) NOT NULL,
  `uid` bigint(8) NOT NULL,
  `content` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `votes` int(11) DEFAULT 0,
  `blocked` tinyint(1) DEFAULT 0,
  `date` datetime DEFAULT current_timestamp(),
   PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `posts` (
  `pid` bigint(8) NOT NULL AUTO_INCREMENT,
  `forum` varchar(20) COLLATE utf8_bin NOT NULL,
  `uid` bigint(8) NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `content` varchar(500) CHARACTER SET utf8 NOT NULL,
  `image` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `votes` int(11) DEFAULT 0,
  `blocked` tinyint(1) DEFAULT 0,
  `date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `forums` (
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `banner` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `icon` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Insert data */
INSERT INTO `users` (`uid`, `email`, `password`, `userType`, `picture`, `username`) VALUES
(1, 'alpha@domain.com', '$2a$10$wqOUJNcHEcWNG6komVIuje8vy9eApdIYlOhepuxp2as1FFje0Ib5i', 'admin', 'http://localhost:8081/images/userStandardPic.png', 'Alpha'),
(2, 'bravo@domain.com', '$2a$10$7hYSy1tcV.JsstDLZNRsEefsoZlnESLxs2wk3uz.losnjxgVN606C', 'moderator', 'http://localhost:8081/images/userStandardPic.png', 'Bravo'),
(3, 'charlie@domain.com', '$2a$10$1VaF/qbfoi05D.St7jACOe1e1j6e/unzCUKlhEoGNb/KZerO2HG/m', 'user', 'http://localhost:8081/images/userStandardPic.png', 'Charlie');

INSERT INTO `requests`(`rid`, `user`, `userType`) VALUES 
(1,2,"moderator"),
(2,3,"moderator");

INSERT INTO `forums` (`name`, `title`, `banner`, `icon`) VALUES
('Trains', 'Train Appreciation Society', 'https://www.greenbiz.com/sites/default/files/images/articles/featured/highspeedrailsstock.jpg', 'https://images.unsplash.com/photo-1530563639148-3c83980fe6ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
('games', 'The Game Station', 'https://specials-images.forbesimg.com/imageserve/5f37e9a0a040c1461e6da898/960x0.jpg?cropX1=0&cropX2=1024&cropY1=221&cropY2=797', 'https://media.wired.com/photos/5926c126af95806129f50868/master/w_1334,c_limit/SuperMarioRunTA.jpg');

INSERT INTO `posts` (`pid`, `forum`, `uid`, `title`, `content`, `image`, `votes`, `blocked`) VALUES
(1, 'Trains', 1, 'God I love trains', 'Aren\'t they beautiful', 'https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1382&q=80', 0, 0),
(2, 'Trains', 3, 'Now this is a good-ass train', '', 'https://images.unsplash.com/photo-1555124618-81b95d0e5892?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 0, 0);


ALTER TABLE `posts`
  ADD KEY `FK_PostForum` (`forum`),
  ADD KEY `FK_PostUser` (`uid`),
  ADD CONSTRAINT `FK_PostForum` FOREIGN KEY (`forum`) REFERENCES `forums` (`name`),
  ADD CONSTRAINT `FK_PostUser` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);

ALTER TABLE `comments`
  ADD KEY `FK_CommentUser` (`uid`),
  ADD KEY `FK_CommentPost` (`pid`),
  ADD CONSTRAINT `FK_CommentPost` FOREIGN KEY (`pid`) REFERENCES `posts` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_CommentUser` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

  
COMMIT;

