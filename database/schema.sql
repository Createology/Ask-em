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

ALTER TABLE `dummy`
ADD CONSTRAINT `dummy_ibfk_1` FOREIGN KEY
(`id_questions`) REFERENCES `questions`
(`id`),
ADD CONSTRAINT `dummy_ibfk_2` FOREIGN KEY
(`id_users`) REFERENCES `users`
(`id`),
ADD CONSTRAINT `dummy_ibfk_3` FOREIGN KEY
(`id_surveys`) REFERENCES `surveys`
(`id`);
------------------------

-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 28, 2018 at 03:40 AM
-- Server version: 8.0.13
-- PHP Version: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT
= 0;
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `askem_77`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--
-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 05, 2019 at 03:52 AM
-- Server version: 8.0.13
-- PHP Version: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT
= 0;
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `askem_77`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 06, 2019 at 02:03 AM
-- Server version: 8.0.13
-- PHP Version: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT
= 0;
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `askem_77`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers`
(
  `id` int
(11) NOT NULL,
  `answer` varchar
(225) CHARACTER
SET utf8mb4
COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `id_questions` int
(11) DEFAULT NULL,
  `id_users` int
(11) NOT NULL,
  `id_surveys` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`
id`,
`answer
`, `id_questions`, `id_users`, `id_surveys`) VALUES
(93, 'primary', 30, 44, 5),
(94, 'single', 37, 44, 5),
(127, 'master', 30, 45, 6),
(128, 'divorced', 37, 45, 6),
(161, 'master', 30, 1, 1),
(162, 'single', 37, 1, 1),
(187, 'bachelor', 30, 44, 7),
(188, 'seperated', 37, 44, 7),
(207, 'primary', 30, 2, 2),
(208, 'single', 37, 2, 2),
(209, 'primary', 30, 44, 10),
(210, 'single', 37, 44, 10),
(211, 'primary', 30, 44, 19),
(212, 'single', 37, 44, 19),
(213, 'primary', 30, 44, 15),
(214, 'single', 37, 44, 15),
(217, 'primary', 30, 44, 18),
(218, 'single', 37, 44, 18),
(225, 'primary', 30, 45, 26),
(226, 'single', 37, 45, 26),
(227, 'primary', 30, 44, 24),
(228, 'single', 37, 44, 24),
(229, 'bachelor', 30, 44, 27),
(230, 'seperated', 37, 44, 27),
(233, 'bachelor', 30, 44, 22),
(234, 'seperated', 37, 44, 22),
(239, 'primary', 30, 44, 28),
(240, 'single', 37, 44, 28),
(251, 'primary', 30, 44, 29),
(252, 'single', 37, 44, 29),
(257, 'primary', 30, 44, 25),
(258, 'single', 37, 44, 25),
(263, 'primary', 30, 70, 31),
(264, 'single', 37, 70, 31),
(265, 'primary', 30, 44, 30),
(266, 'single', 37, 44, 30),
(269, 'primary', 30, 70, 32),
(270, 'single', 37, 70, 32),
(279, 'primary', 30, 44, 23),
(280, 'single', 37, 44, 23),
(293, 'primary', 30, 45, 26),
(294, 'single', 37, 45, 26);

-- --------------------------------------------------------

--
-- Table structure for table `choices`
--

CREATE TABLE `choices`
(
  `id` int
(11) NOT NULL,
  `id_qustion` int
(11) NOT NULL,
  `id_suervey` int
(11) NOT NULL,
  `choice` varchar
(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custmoers`
--

CREATE TABLE `custmoers`
(
  `id` int
(11) NOT NULL,
  `id_user` int
(11) NOT NULL,
  `username` varchar
(11) NOT NULL,
  `phonenumber` varchar
(255) NOT NULL,
  `survey_desc` varchar
(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `custmoers`
--

INSERT INTO `custmoers` (`
id`,
`id_user
`, `username`, `phonenumber`, `survey_desc`) VALUES
(1, 44, 'read', '56789', 'dfghjk'),
(2, 44, 'read', '999', 'kjhg'),
(3, 44, 'read', '999', 'kjhg'),
(4, 44, 'read', '3333', 'ggg'),
(5, 44, 'read', 'gggg', '66666'),
(6, 44, 'read', '2345', 'jh'),
(7, 44, 'read', '0786927200', 'Ghadeer'),
(8, 44, 'read', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `dummy`
--

CREATE TABLE `dummy`
(
  `id` int
(11) NOT NULL,
  `answer` varchar
(225) CHARACTER
SET utf8mb4
COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `id_questions` int
(11) DEFAULT NULL,
  `id_users` int
(11) NOT NULL,
  `id_surveys` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dummy`
--

INSERT INTO `dummy` (`
id`,
`answer
`, `id_questions`, `id_users`, `id_surveys`) VALUES
(2, 'Hashmi', 67, 70, 36),
(3, 'Khalda', 67, 70, 36),
(4, 'Kursy', 67, 70, 36),
(5, 'Marka', 67, 70, 36),
(6, 'Shmiesani', 67, 70, 36),
(7, 'Tabarbour', 67, 70, 36),
(8, '3', 68, 70, 36),
(9, '4', 68, 70, 36),
(10, '7', 68, 70, 36),
(11, '2', 68, 70, 36),
(12, '5', 68, 70, 36),
(13, 'yes', 69, 70, 36),
(14, 'no', 69, 70, 36),
(15, 'yes', 69, 70, 36),
(16, 'yes', 69, 70, 36),
(17, 'no', 69, 70, 36),
(18, 'yes', 70, 70, 36),
(19, 'yes', 70, 70, 36),
(20, 'no', 70, 70, 36),
(21, 'yes', 70, 70, 36),
(22, 'no', 70, 70, 36);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions`
(
  `id` int
(11) NOT NULL,
  `id_surveys` int
(11) NOT NULL,
  `id_users` int
(11) NOT NULL,
  `question` varchar
(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`
id`,
`id_surveys
`, `id_users`, `question`) VALUES
(30, 1, 44, 'what is your education level?'),
(31, 2, 1, 'what is your education level?'),
(36, 2, 1, 'what is your marital status?'),
(37, 1, 44, 'what is your marital status?'),
(38, 6, 45, 'asdasdasdasdasdasdasd'),
(39, 7, 44, 'Suitable place to build a new mall'),
(40, 7, 44, 'Number of mall levels needed'),
(41, 7, 44, 'Is a new mall at dabouq a good idea'),
(45, 19, 44, 're'),
(65, 34, 70, 'Where is the suitable place to build a mall'),
(66, 34, 70, 'How many levels mall should have'),
(67, 36, 70, 'Suitabl place to build a mall in Amman'),
(68, 36, 70, 'How many levels for this mall'),
(69, 36, 70, 'Should the mall has a cinema'),
(70, 36, 70, 'Would you prefer see an entertainment section in the mall');

-- --------------------------------------------------------

--
-- Table structure for table `smart`
--

CREATE TABLE `smart`
(
  `id` int
(11) NOT NULL,
  `smartanswer` varchar
(225) CHARACTER
SET utf8mb4
COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `Truth` enum
('0','1') CHARACTER
SET utf8mb4
COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  `id_questions` int
(11) DEFAULT NULL,
  `id_users` int
(11) NOT NULL,
  `id_surveys` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `smart`
--

INSERT INTO `smart` (`
id`,
`smartanswer
`, `Truth`, `id_questions`, `id_users`, `id_surveys`) VALUES
(1, 'Jandaweel', '1', 39, 1, 7),
(2, 'Khalda', '1', 39, 2, 7),
(3, 'Dabouq', '1', 39, 6, 7),
(4, '6', '1', 40, 1, 7),
(5, '5', '1', 40, 2, 7),
(6, '3', '1', 40, 6, 7),
(7, 'Yes', '1', 41, 1, 7),
(8, 'Yes', '1', 41, 2, 7),
(9, 'Yes', '1', 41, 6, 7),
(10, 'Tabarbour', '1', 39, 9, 7),
(11, '1', '1', 40, 9, 7),
(12, 'No', '1', 41, 9, 7);

-- --------------------------------------------------------

--
-- Table structure for table `surveys`
--

CREATE TABLE `surveys`
(
  `id` int
(11) NOT NULL,
  `id_users` int
(11) NOT NULL,
  `survey_name` varchar
(30) CHARACTER
SET utf8mb4
COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `category` enum
('0','1','2','3','4','5','6','7') CHARACTER
SET utf8mb4
COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` mediumtext NOT NULL,
  `activated` enum
('0','1') CHARACTER
SET utf8mb4
COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `surveys`
--

INSERT INTO `surveys` (`
id`,
`id_users
`, `survey_name`, `category`, `description`, `activated`) VALUES
(1, 1, 'smar phone', '1', 'new style for smarts phone', '1'),
(2, 2, 'smart car', '3', 'smart car navigation ', '1'),
(5, 44, 'MAC usage in middle east', '2', 'The percentage of users using Apple\'s machines in the arab world.', '1'),
(6, 45, 'wow', '2', 'asdasdasdasdasd', '1'),
(7, 44, 'firstSmart', '7', 'first smart survey', '1'),
(8, 2, 'efe', '4', 'ecew', '1'),
(9, 44, 'kjhg', '0', 'mnbv', '1'),
(10, 44, 'kjhg', '0', 'mnbv', '1'),
(11, 44, 'something', '2', 'some', '0'),
(12, 44, 'something', '2', 'some', '0'),
(15, 44, 'Mohannad', '0', 'Mohannad', '1'),
(16, 44, 'IssaIss', '0', 'a', '1'),
(17, 44, 'lkjh', '0', 'lkj', '1'),
(18, 44, 'kj', '0', ',k', '1'),
(19, 44, 'cxzxcz', '0', 'xz', '1'),
(20, 44, 'Mohannad', '0', 'Mohannads', '1'),
(21, 44, 'Issa', '0', 'Issa', '1'),
(22, 44, 'bvcxrewq', '0', 'ewq', '1'),
(23, 44, 'l;kj', '0', 'lkj', '1'),
(24, 44, 'uiyhg', '0', 'bvfr', '1'),
(25, 44, 'uhjiu', '0', 'nghg', '1'),
(26, 45, 'Evgen Feedback', '2', 'What do you think of his technical skills and the freelance experiece he has?', '1'),
(27, 44, 'test', '0', 'test', '1'),
(28, 44, 'mnh', '0', 'mkjh', '1'),
(29, 44, 'test', '0', 'test', '1'),
(30, 44, 'test', '0', 'test', '1'),
(31, 70, 'test', '0', 'test', '1'),
(32, 70, 'test', '0', 'test', '1'),
(33, 70, 'test', '0', 'test', '1'),
(34, 70, 'test', '0', 'test', '1'),
(35, 70, 'Mohannad', '0', 'mO', '1'),
(36, 70, 'Mohannad', '0', 'Mo', '1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `firstname` varchar(25) NOT NULL,
  `midname` varchar(25) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `birthday` datetime NOT NULL,
  `gender` enum('0','1') NOT NULL,
  `country` varchar(30) NOT NULL,
  `email` varchar(75) NOT NULL,
  `password` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `midname`, `lastname`, `birthday`, `gender`, `country`, `email`, `password`) VALUES
(1, 'Mohannad', 'Mohannad', 'Bahaa', 'Al-musa', '2018-12-17 00:00:00', '1', 'Amman', 'mohbah026@gmail.com', '12345678'),
(2, 'issa', 'issa', 'ali', 'anagrah', '2017-08-15 00:00:00', '1', 'irbid', 'issa@issa.com', '12344321'),
(6, 'a', 'aa', 'a', 'aaa', '2017-08-15 00:00:00', '1', 'a', 'a.@a.com', '$2a$10$TKFWBsxW0GOfwJcunhrXMuhnJ//f9iA0rUUP8byNjCPG.FjsWb1Rq'),
(9, 'aa', 'aa', 'a', 'aaa', '2017-08-15 00:00:00', '1', 'a', 'aa.@aa.com', '$2a$10$zhHjc9jAGZfz7MBAUqSDr.iHVpV7zCeUrBAcb/y8ro74Upc/dfFne'),
(44, 'read', 'read', 'read', 'read', '1980-01-01 00:00:00', '0', 'Amman', 'read@read.com', '$2a$10$uiorq.Wn5pSDdVkMVJsMEecdC6FrawuebYwR4TjEeqtr1ytubeBa2'),
(45, 'write', 'write', 'write', 'write', '1980-01-01 00:00:00', '0', 'Amman', 'write@write.com', '$2a$10$lGax4Gr/wO2uprzCQuWz9OSWoqDI9SMVlOpJlZV7JTSpjikTXJfDW'),
(70, 'test', 'test', 'test', 'test', '1997-01-16 00:00:00', '0', 'Amman', 'test@test.com', '$2a$10$mTJMfCXVuM6MfDBeg5ggd.F6G64GwvaikXs6u.OobnNB9ifewaxSq'),
(71, 'aaaa', 'aaa', 'aaa', 'aaa', '1980-01-01 00:00:00', '0', 'Amman', 'aa@aa.com', '$2a$10$saAQgSm8XyiSdlwGPpsSc.exbjkXFdL3rn5nR1MzKs7xI9S.ORA2a');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `id_surveys` (`id_surveys`),
  ADD KEY `choices_ibfk_1` (`id_questions`);

--
-- Indexes for table `choices`
--
ALTER TABLE `choices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `choices_ibfk` (`id_qustion`),
  ADD KEY `choices_ibfk22` (`id_suervey`);

--
-- Indexes for table `custmoers`
--
ALTER TABLE `custmoers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `custmoersfk1` (`id_user`),
  ADD KEY `custmoersfk2` (`username`);

--
-- Indexes for table `dummy`
--
ALTER TABLE `dummy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dummy_ibfk_1` (`id_questions`),
  ADD KEY `dummy_ibfk_2` (`id_users`),
  ADD KEY `dummy_ibfk_3` (`id_surveys`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_surveys` (`id_surveys`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `smart`
--
ALTER TABLE `smart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `smart_fbk1` (`id_questions`),
  ADD KEY `smart_fbk2` (`id_users`),
  ADD KEY `smart_fbk3` (`id_surveys`);

--
-- Indexes for table `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`username`) USING BTREE,
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=295;

--
-- AUTO_INCREMENT for table `choices`
--
ALTER TABLE `choices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `custmoers`
--
ALTER TABLE `custmoers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `dummy`
--
ALTER TABLE `dummy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `smart`
--
ALTER TABLE `smart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`id_questions`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `answers_ibfk_3` FOREIGN KEY (`id_surveys`) REFERENCES `surveys` (`id`),
  ADD CONSTRAINT `choices_ibfk_1` FOREIGN KEY (`id_questions`) REFERENCES `questions` (`id`);

--
-- Constraints for table `choices`
--
ALTER TABLE `choices`
  ADD CONSTRAINT `choices_ibfk` FOREIGN KEY (`id_qustion`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `choices_ibfk22` FOREIGN KEY (`id_suervey`) REFERENCES `surveys` (`id`);

--
-- Constraints for table `custmoers`
--
ALTER TABLE `custmoers`
  ADD CONSTRAINT `custmoersfk1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `custmoersfk2` FOREIGN KEY (`username`) REFERENCES `users` (`username`);

--
-- Constraints for table `dummy`
--
ALTER TABLE `dummy`
  ADD CONSTRAINT `dummy_ibfk_1` FOREIGN KEY (`id_questions`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `dummy_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `dummy_ibfk_3` FOREIGN KEY (`id_surveys`) REFERENCES `surveys` (`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`id_surveys`) REFERENCES `surveys` (`id`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`);

--
-- Constraints for table `smart`
--
ALTER TABLE `smart`
  ADD CONSTRAINT `smart_fbk1` FOREIGN KEY (`id_questions`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `smart_fbk2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `smart_fbk3` FOREIGN KEY (`id_surveys`) REFERENCES `surveys` (`id`);

--
-- Constraints for table `surveys`
--
ALTER TABLE `surveys`
  ADD CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
