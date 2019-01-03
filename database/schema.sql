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
(1, 'yes', 1, 1, 1);

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
(1, 1, 1, 'do you want smart phone');

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
COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `surveys`
--

INSERT INTO `surveys` (`
id`,
`id_users
`, `survey_name`, `category`, `description`, `activated`) VALUES
(1, 1, 'smar phone', '1', 'new style for smarts phone', '0'),
(2, 2, 'smart car', '3', 'smart car navigation ', '1'),
(3, 1, 'enviourmant issue ', '2', 'gas smile ', '0');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users`
(
  `id` int
(11) NOT NULL,
  `username` varchar
(25) NOT NULL,
  `firstname` varchar
(25) NOT NULL,
  `midname` varchar
(25) NOT NULL,
  `lastname` varchar
(25) NOT NULL,
  `birthday` datetime NOT NULL,
  `gender` enum
('0','1') NOT NULL,
  `country` varchar
(30) NOT NULL,
  `email` varchar
(75) NOT NULL,
  `password` varchar
(555) CHARACTER
SET utf8mb4
COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`
id`,
`username
`, `firstname`, `midname`, `lastname`, `birthday`, `gender`, `country`, `email`, `password`) VALUES
(1, 'Mohannad', 'Mohannad', 'Bahaa', 'Al-musa', '2018-12-17 00:00:00', '1', 'Amman', 'mohbah026@gmail.com', '12345678'),
(2, 'issa', 'issa', 'ali', 'anagrah', '2017-08-15 00:00:00', '1', 'irbid', 'issa@issa.com', '12344321'),
(3, 'omar', 'omar', 'asd', 'asd', '2018-12-25 00:00:00', '1', 'Amman', 'asdasd@kh.com', '12345678'),
(6, 'a', 'aa', 'a', 'aaa', '2017-08-15 00:00:00', '1', 'a', 'a.@a.com', '$2a$10$TKFWBsxW0GOfwJcunhrXMuhnJ//f9iA0rUUP8byNjCPG.FjsWb1Rq'),
(9, 'aa', 'aa', 'a', 'aaa', '2017-08-15 00:00:00', '1', 'a', 'aa.@aa.com', '$2a$10$zhHjc9jAGZfz7MBAUqSDr.iHVpV7zCeUrBAcb/y8ro74Upc/dfFne');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
ADD PRIMARY KEY
(`id`),
ADD KEY `id_questions`
(`id_questions`),
ADD KEY `id_users`
(`id_users`),
ADD KEY `id_surveys`
(`id_surveys`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
ADD PRIMARY KEY
(`id`),
ADD KEY `id_surveys`
(`id_surveys`),
ADD KEY `id_users`
(`id_users`);

--
-- Indexes for table `surveys`
--
ALTER TABLE `surveys`
ADD PRIMARY KEY
(`id`),
ADD KEY `id_users`
(`id_users`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
ADD PRIMARY KEY
(`id`,`username`) USING BTREE,
ADD UNIQUE KEY `username`
(`username`),
ADD UNIQUE KEY `email`
(`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY
(`id_questions`) REFERENCES `questions`
(`id`),
ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY
(`id_users`) REFERENCES `users`
(`id`),
ADD CONSTRAINT `answers_ibfk_3` FOREIGN KEY
(`id_surveys`) REFERENCES `surveys`
(`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY
(`id_surveys`) REFERENCES `surveys`
(`id`),
ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY
(`id_users`) REFERENCES `users`
(`id`);

--
-- Constraints for table `surveys`
--
ALTER TABLE `surveys`
ADD CONSTRAINT `surveys_ibfk_1` FOREIGN KEY
(`id_users`) REFERENCES `users`
(`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;




-- INSERT INTO `users` (`
-- id`,
-- `username
-- `, `firstname`, `midname`, `lastname`, `birthday`, `gender`, `country`, `email`, `password`, `createdAt`) VALUES
-- (NULL, 'Mohannad', 'Mohannad', 'Bahaa', 'Al-musa', '2018-12-17', '0', 'Amman', 'mohbah026@gmail.com', '12345678', CURRENT_TIMESTAMP);



-- new version off our schema 
-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 02, 2019 at 11:22 PM
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
(95, 'asd', 30, 44, 1),
(96, 'primary', 30, 1, 1),
(97, 'single', 37, 1, 1),
(98, 'primary', 30, 2, 2),
(99, 'single', 37, 2, 2),
(100, 'primary', 30, 44, 5),
(101, 'single', 37, 44, 5),
(102, 'primary', 30, 44, 5),
(103, 'single', 37, 44, 5),
(104, 'primary', 30, 44, 5),
(105, 'single', 37, 44, 5),
(106, 'primary', 30, 1, 1),
(107, 'single', 37, 1, 1),
(108, 'primary', 30, 44, 5),
(109, 'single', 37, 44, 5),
(110, 'primary', 30, 2, 2),
(111, 'single', 37, 2, 2),
(112, 'primary', 30, 1, 1),
(113, 'single', 37, 1, 1),
(114, 'primary', 30, 44, 5),
(115, 'single', 37, 44, 5),
(116, 'primary', 30, 44, 5),
(117, 'single', 37, 44, 5),
(118, 'primary', 30, 2, 2),
(119, 'single', 37, 2, 2);

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
-- Table structure for table `customers`
--

CREATE TABLE `customers`
(
  `id` int
(11) NOT NULL,
  `id_users` int
(11) NOT NULL,
  `usersname` varchar
(255) NOT NULL,
  `phonenumber` varchar
(255) NOT NULL,
  `suervey_description` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(37, 1, 44, 'what is your marital status?');

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
  `id_questions` int
(11) DEFAULT NULL,
  `id_users` int
(11) NOT NULL,
  `id_surveys` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `surveys`
--

INSERT INTO `surveys` (`
id`,
`id_users
`, `survey_name`, `category`, `description`, `activated`) VALUES
(1, 1, 'smar phone', '1', 'new style for smarts phone', '0'),
(2, 2, 'smart car', '3', 'smart car navigation ', '1'),
(5, 44, 'MAC usage in middle east', '2', 'The percentage of users using Apple\'s machines in the arab world.', '0');

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
(16, 'b', 'b', 'b', 'b', '1980-01-01 00:00:00', '0', 'Amman', 'b@b.com', '$2a$10$CMPs0I3XDLhWg5cQlofng.aTdyyGiIXbu0D6PUpSsQ.g4./NTuWDa'),
(22, 'ee', 'ee', 'ee', 'ee', '1980-01-01 00:00:00', '0', 'Amman', 'ee@ee.com', '$2a$10$97rBwsDbutXOu7IvIhhOGO3gzzJ.UfoeMjhLn2CeVV6e4fmYuKhem'),
(23, 'qq', 'qq', 'qq', 'qq', '1980-01-01 00:00:00', '0', 'Amman', 'qq@aa.com', '$2a$10$5uERs9yTMvB2R22O5d5CxehebHH38/G75KdJT3gP6QSaujqIKvzBC'),
(32, 'rr', 'rr', 'rr', 'rr', '1980-01-01 00:00:00', '0', 'Amman', 'isa.anagreh@gmail.com', '$2a$10$T93tutMn0CR/hUQRPpdVR.Xy0kQvb0oEkr9B1kBNHkjGrfuOWUPza'),
(33, 'm', 'm', 'm', 'm', '1980-01-01 00:00:00', '0', 'Amman', 'm@m.com', '$2a$10$vIfRiApxfaCIsG2VAKLmgOTdf7EzQh8jzM9c9S2i14wiaT9VgLg/m'),
(34, 'bb', 'bb', 'bb', 'bb', '1980-01-01 00:00:00', '0', 'Amman', 'bb', '$2a$10$3BezpjvDUuYjO9dgl3wz9uMPTuyJiYIs/b7FIJLX8d1GuIETSwgpS'),
(35, '', '', '', '', '1980-01-01 00:00:00', '0', 'Amman', '', '$2a$10$nsKH39/nvadEWrmV0RI9/uiLVDGCnZrbIQlRAHrW9G0RjIRuC.DXa'),
(37, 'll', 'kl', 'll', 'll', '1980-01-01 00:00:00', '0', 'Amman', 'll@ll.com', '$2a$10$jG3EB.4nDzLemKU0ODtaNOA9FQGIXxc7S6Y14IglRnOe2d5IT9/lW'),
(39, 'ert', 'erter', 'tert', 'tert', '1980-01-01 00:00:00', '0', 'Amman', 'tert@erge.com', '$2a$10$oKB1S8RJ7oinWh0iGuDYk.YwTRM.Patuj1EnaooVW0l3CfKixSp4q'),
(40, 'ertert', 'ertertr', 'tert', 'ertert', '1980-01-01 00:00:00', '0', 'Amman', 'ertretert@ewr.com', '$2a$10$VWEGBoVHV88HXODFCkOl3Omx8v4dhKTNgKzXiQIFoQLPf8dl2YQdu'),
(41, 'jytj', 'yjy', 'jtyj', 'jtyj', '1980-01-01 00:00:00', '0', 'Amman', 'jtyj@fwefwef.com', '$2a$10$ZpIB4FFIME9eK6sQTzZcmOs2nFdIgJuB83PtWlRlPy3Mko7tMPGWO'),
(42, 'mn', 'mn', 'mn', 'mn', '1980-01-01 00:00:00', '0', 'Amman', 'mn@mn.com', '$2a$10$fS9CIp28XiUempgNbs1vseh71sWGh7tw6JBlLPlF3Vu6dHqtusDdW'),
(43, 'moh', 'moh', 'moh', 'moh', '1980-01-01 00:00:00', '0', 'Amman', 'moh@som.com', '$2a$10$bULJKoX0cfcceQOv8P9aqOSVoodIHaLZTJuekWECsjUjIrea9W6J6'),
(44, 'read', 'read', 'read', 'read', '1980-01-01 00:00:00', '0', 'Amman', 'read@read.com', '$2a$10$uiorq.Wn5pSDdVkMVJsMEecdC6FrawuebYwR4TjEeqtr1ytubeBa2'),
(45, 'write', 'write', 'write', 'write', '1980-01-01 00:00:00', '0', 'Amman', 'write@write.com', '$2a$10$lGax4Gr/wO2uprzCQuWz9OSWoqDI9SMVlOpJlZV7JTSpjikTXJfDW'),
(46, 'rewrite', 'rewrite', 'rewrite', 'rewrite', '1980-01-01 00:00:00', '0', 'Amman', 'rewrite@rewrite.com', '$2a$10$N603anFbH4lywgn8fnJKX.rVIQfXxSV9wufdVvfqUCEKPDWc51F6q'),
(47, 'reread', 'reread', 'reread', 'reread', '1980-01-01 00:00:00', '0', 'Amman', 'reread', '$2a$10$k2xD1EPf6WejzOoN8c1SFutBB3l6arpLvEiqQnsDkj6HLSA57ORE6'),
(50, 'qqq', 'qqq', 'qqq', 'qqq', '1980-01-01 00:00:00', '0', 'Amman', 'qqqq@q.com', '$2a$10$WitGh9kkNMEt5TZWc3SlnebJ10ZKFhPaggelfg61KcCzzrE5Hzjq6');

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
  ADD KEY `choices_ibfk` (`id_qustion`),
  ADD KEY `choices_ibfk22` (`id_suervey`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customers_ibfk_1` (`id_users`),
  ADD KEY `customers_ibfk_2` (`usersname`);

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
  ADD KEY `id_questions` (`id_questions`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `id_surveys` (`id_surveys`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

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
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `customers_ibfk_2` FOREIGN KEY (`usersname`) REFERENCES `users` (`username`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`id_surveys`) REFERENCES `surveys` (`id`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`);

--
-- Constraints for table `surveys`
--
ALTER TABLE `surveys`
  ADD CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
