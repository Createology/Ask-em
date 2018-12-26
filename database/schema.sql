DROP DATABASE IF EXISTS ask;

CREATE DATABASE ask;

USE ask;

-- database tables 
-- +---------------+
-- | answers       |
-- | questions     |
-- | surveys       |
-- | users         |
-- +---------------+

-- INSERT INTO `users` (`
-- id`,
-- `username
-- `, `firstname`, `midname`, `lastname`, `birthday`, `gender`, `country`, `email`, `password`, `createdAt`) VALUES
-- (NULL, 'Mohannad', 'Mohannad', 'Bahaa', 'Al-musa', '2018-12-17', '0', 'Amman', 'mohbah026@gmail.com', '12345678', CURRENT_TIMESTAMP);

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users`
(
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR
(25) NOT NULL,
  `firstname` VARCHAR
(25) NOT NULL,
  `midname` VARCHAR
(25) NOT NULL,
  `lastname` VARCHAR
(25) NOT NULL,
  `age` INTEGER
(11) NOT NULL,
  `gender` ENUM
( '0', '1' )  NOT NULL,
  `country` VARCHAR
(30) NOT NULL,
  `email` VARCHAR
(75) NOT NULL,
  `password` VARCHAR
(16) NOT NULL,
  `createdAt` timestamp default current_timestamp NOT NULL,
  PRIMARY KEY
(`id`, `username`)
);

-- ---
-- Table 'surveys'
-- 
-- ---

DROP TABLE IF EXISTS `surveys`;

CREATE TABLE `surveys`
(
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_users` INTEGER NOT NULL,
  `category` VARCHAR
(50) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `activate` BINARY NOT NULL,
  `createdAt` timestamp default current_timestamp NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY
(`id`)
);

-- ---
-- Table 'questions'
-- 
-- ---

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions`
(
  `id` INTEGER  AUTO_INCREMENT NOT NULL,
  `id_surveys` INTEGER NOT NULL,
  `id_users` INTEGER NOT NULL,
  `question` VARCHAR
(255) NOT NULL,
  `createdAt` timestamp default current_timestamp NOT NULL,
  PRIMARY KEY
(`id`)
);

-- ---
-- Table 'answers'
-- 
-- ---

DROP TABLE IF EXISTS `answers`;

CREATE TABLE `answers`
(
  `id` INTEGER  AUTO_INCREMENT NOT NULL ,
  `agree` INTEGER NOT NULL DEFAULT 0,
  `disagree` INTEGER NOT NULL DEFAULT 0,
  `id_questions` INTEGER NULL DEFAULT NULL,
  `id_users` INTEGER NOT NULL,
  `id_surveys` INTEGER NOT NULL,
  PRIMARY KEY
(`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `surveys`
ADD FOREIGN KEY
(id_users) REFERENCES `users`
(`id`);
ALTER TABLE `questions`
ADD FOREIGN KEY
(id_surveys) REFERENCES `surveys`
(`id`);
ALTER TABLE `questions`
ADD FOREIGN KEY
(id_users) REFERENCES `users`
(`id`);
ALTER TABLE `answers`
ADD FOREIGN KEY
(id_questions) REFERENCES `questions`
(`id`);
ALTER TABLE `answers`
ADD FOREIGN KEY
(id_users) REFERENCES `users`
(`id`);
ALTER TABLE `answers`
ADD FOREIGN KEY
(id_surveys) REFERENCES `surveys`
(`id`);



-- INSERT INTO `users` (`
-- id`,
-- `username
-- `, `firstname`, `midname`, `lastname`, `birthday`, `gender`, `country`, `email`, `password`, `createdAt`) VALUES
-- (NULL, 'Mohannad', 'Mohannad', 'Bahaa', 'Al-musa', '2018-12-17', '0', 'Amman', 'mohbah026@gmail.com', '12345678', CURRENT_TIMESTAMP);