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
  `votes` int(11) DEFAULT 0,
  `blocked` tinyint(1) DEFAULT 0,
  `date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `forums` (
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Insert data */
INSERT INTO `users` (`uid`, `email`, `password`, `userType`, `picture`, `username`) VALUES
(1, 'alpha@domain.com', '$2a$10$wqOUJNcHEcWNG6komVIuje8vy9eApdIYlOhepuxp2as1FFje0Ib5i', 'admin', 'http://localhost:8081/images/pwGpFjVCW3mvdEd4l1Xvk0kivcIrpx6S.jpg', 'Alpha'),
(2, 'bravo@domain.com', '$2a$10$7hYSy1tcV.JsstDLZNRsEefsoZlnESLxs2wk3uz.losnjxgVN606C', 'moderator', 'http://localhost:8081/images/flTefRKtcFNpBNBUGTYrKlFAXdHuDqCn.jpg', 'Bravo'),
(3, 'charlie@domain.com', '$2a$10$1VaF/qbfoi05D.St7jACOe1e1j6e/unzCUKlhEoGNb/KZerO2HG/m', 'user', 'http://localhost:8081/images/Vpnp0PjXwlOeh8OazzxNpKaMg6gPgUXR.jpg', 'Charlie'),
(4, 'delta@domain.com', '$2a$10$dRiRaQ/QAt6mNMjMhmW9.uOgHHe69uR7teV4Oz5b3D5KoP4mcmtGm', 'user', 'http://localhost:8081/images/zegwwogW93om8MOM6BYGnMiD21IV5UR7.jpg', 'Delta');

INSERT INTO `requests` (`rid`, `user`, `userType`) VALUES
(1, 3, 'user');

INSERT INTO `forums` (`name`, `title`) VALUES
('Trains', 'Train Appreciation Society'),
('games', 'The Game Station'),
('lumberboys', 'Lumberjacking Enthusiasts');

INSERT INTO `posts` (`pid`, `forum`, `uid`, `title`, `content`, `votes`, `blocked`, `date`) VALUES
(2, 'lumberboys', 1, 'I speak for the trees', 'They say good work, kid', 12, 0, '2020-11-27 14:25:24'),
(3, 'Trains', 1, 'I speak for the trains', 'They are very rude', -3, 0, '2020-11-27 14:26:17'),
(4, 'games', 4, 'Games are pretty cool', 'Title says it all', 6, 0, '2020-11-27 14:31:03'),
(5, 'lumberboys', 4, 'Trees are alright I guess', 'Meh', 1, 0, '2020-11-27 14:31:52'),
(6, 'games', 2, 'what are good gems wit birds', 'help', -1, 0, '2020-11-27 14:33:36'),
(7, 'Trains', 2, 'trains scare me', 'help', -1, 1, '2020-11-27 14:34:14'),
(8, 'lumberboys', 3, 'i climb trees', 'its everyday bro', -3, 0, '2020-11-27 14:36:58'),
(9, 'games', 3, 'where is elden ring man', 'forget cyberpunk why is elden ring gone', 33, 0, '2020-11-27 14:37:59');

INSERT INTO `comments` (`cid`, `pid`, `uid`, `content`, `votes`, `blocked`, `date`) VALUES
(2, 1, 1, 'cool', 0, 0, '2020-11-27 14:15:47'),
(3, 1, 1, 'a', 0, 0, '2020-11-27 14:16:52'),
(4, 1, 1, 'b', 0, 0, '2020-11-27 14:17:55'),
(5, 2, 1, 'Its true', 3, 0, '2020-11-27 14:25:38'),
(7, 3, 4, 'You lie', 1, 0, '2020-11-27 14:30:21'),
(8, 3, 2, 'trais can talk??', -2, 0, '2020-11-27 14:32:45'),
(9, 6, 2, 'pls answer', -1, 0, '2020-11-27 14:33:49'),
(10, 7, 3, 'no fear i am here', 2, 0, '2020-11-27 14:35:03'),
(11, 7, 3, 'dm me', 1, 0, '2020-11-27 14:35:12'),
(13, 6, 3, 'there are none birds suck', 24, 0, '2020-11-27 14:35:46'),
(14, 4, 3, 'hard agree games are cool', 2, 0, '2020-11-27 14:36:15'),
(15, 8, 3, 'inb4 downvoted to oblivion', 0, 0, '2020-11-27 14:37:20');

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

