---------------------------------xXx----------xXx----------xXx--------------

-- basic helper  query for database

---------------------------------xXx----------xXx----------xXx--------------

-- database tables 
-- +---------------+
-- | answers       |
-- | questions     |
-- | surveys       |
-- | users         |
-- +---------------+
-- 
----- users ----------
--* insert user

-- INSERT INTO `users` (`
-- id`,
-- `username
-- `, `firstname`, `midname`, `lastname`, `birthday`, `gender`, `country`, `email`, `password`, `createdAt`) VALUES
-- (NULL, 'issa', 'issa', 'ali', 'anagrah', '2017-08-15', '0', 'irbid', 'issa@issa.com', '12344321', CURRENT_TIMESTAMP);
---
-------
---

-- update record 
-- UPDATE `users` SET `id`=[value-1],`username`=[value-2],`firstname`=[value-3],`midname`=[value-4],`lastname`=[value-5],`birthday`=[value-6],`gender`=[value-7],`country`=[value-8],`email`=[value-9],`password`=[value-10],`createdAt`=[value-11] WHERE 1

---
-------
---

-- select user and check also where or like sql query
--- SELECT `id`, `username`, `firstname`, `midname`, `lastname`, `birthday`, `gender`, `country`, `email`, `password`, `createdAt` FROM `users` 

---
-------
---

-- DELETE FROM `users` WHERE xXXXXX --> insted of XXXXXX but the condation you want 

---
-------
---


----- survey ----------
-- insert servey 

-- INSERT INTO `surveys` (`id`, `id_users`, `suervey_name`, `category`, `description`, `deactivate`, `createdAt`) VALUES ('3', '1', 'enviourmant issue ', '2', 'gas smile ', '0', CURRENT_TIMESTAMP);
-- select servey 

---
-------
---

-- SELECT * FROM `surveys select ; "all info"
-- SELECT `id`, `id_users`, `suervey_name`, `category`, `description`, `deactivate`, `createdAt` FROM `surveys`

---
-------
---

-- update servey
-- UPDATE `surveys` SET `id`=[value-1],`id_users`=[value-2],`suervey_name`=[value-3],`category`=[value-4],`description`=[value-5],`deactivate`=[value-6],`createdAt`=[value-7] WHERE ;

---
-------
---

-- delete servey 

-- DELETE FROM `surveys` WHERE 

---
-------
---

----- qustion ----------

-- insert qustion

-- insert qustion
-- INSERT INTO `questions`(`id`, `id_surveys`, `id_users`, `question`, `createdAt`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5])

---
-------
---

-- select qustion 
-- SELECT `id`, `id_surveys`, `id_users`, `question`, `createdAt` FROM `questions` WHERE ;

---
-------
---

-- update qustion 

-- UPDATE `questions` SET `id`=[value-1],`id_surveys`=[value-2],`id_users`=[value-3],`question`=[value-4],`createdAt`=[value-5] WHERE 1

---
-------
---

-- delete qustion 

-- DELETE FROM `questions` WHERE 

---
-------
---

----- answers ----------
-- insert answer 
-- INSERT INTO `answers`(`id`, `answer`, `id_questions`, `id_users`, `id_surveys`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5])

---
-------
---

-- select answer
-- SELECT `id`, `answer`, `id_questions`, `id_users`, `id_surveys` FROM `answers` WHERE 

---
-------
---

-- update answer
-- UPDATE `answers` SET `id`=[value-1],`answer`=[value-2],`id_questions`=[value-3],`id_users`=[value-4],`id_surveys`=[value-5] WHERE 1

---
-------
---

-- delete answer
-- DELETE FROM `answers` WHERE 
--
---------------------------------xXx----------xXx----------xXx-----------------------------------------------xXx----------xXx----------xXx--------------


------------------------

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