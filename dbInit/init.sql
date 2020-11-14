/* Create database */
CREATE DATABASE IF NOT EXISTS `prog2053-proj`;

/* Create tables */
CREATE TABLE `users` (
  `uid` bigint(8) NOT NULL,
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


CREATE TABLE `posts` (
  `pid` bigint(8) NOT NULL,
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
(1, 'bartell.martine@example.com', '40bcc6f6193986153cae1bb1c36668650a3d5f97', 'admin', NULL, ''),
(2, 'zcrona@example.net', '1f66d81577cd95514cedc8504d65ec8eff9c336a', 'moderator', NULL, ''),
(3, 'wgaylord@example.com', '3fcba21eebd2d09681515b4849d2bbeae566451e', 'user', NULL, '');

INSERT INTO `forums` (`name`, `title`, `banner`, `icon`) VALUES
('Trains', 'Train Appreciation Society', 'https://www.greenbiz.com/sites/default/files/images/articles/featured/highspeedrailsstock.jpg', 'https://images.unsplash.com/photo-1530563639148-3c83980fe6ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
('games', 'The Game Station', 'https://www.ubp.com/files/live/sites/ubp/files/banner_newsroom/200124_Vignette_Web_Detail.jpg', 'https://media.wired.com/photos/5926c126af95806129f50868/master/w_1334,c_limit/SuperMarioRunTA.jpg');

INSERT INTO `posts` (`pid`, `forum`, `uid`, `title`, `content`, `image`, `votes`, `blocked`) VALUES
(4, 'Trains', 1, 'God I love trains', 'Aren\'t they beautiful', 'https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1382&q=80', 0, 0),
(5, 'Trains', 3, 'Now this is a good-ass train', '', 'https://images.unsplash.com/photo-1555124618-81b95d0e5892?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 0, 0);
ALTER TABLE `posts`
  MODIFY `pid` bigint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `users`
  MODIFY `uid` bigint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `posts`
  ADD KEY `FK_PostForum` (`forum`),
  ADD KEY `FK_PostUser` (`uid`),
  ADD CONSTRAINT `FK_PostForum` FOREIGN KEY (`forum`) REFERENCES `forums` (`name`),
  ADD CONSTRAINT `FK_PostUser` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);

COMMIT;