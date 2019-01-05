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
(119, 'single', 37, 2, 2),
(121, 'high', 30, 2, 2),
(122, 'single', 37, 2, 2),
(123, 'doctoral', 30, 2, 2),
(124, 'divorced', 37, 2, 2),
(125, 'master', 30, 2, 2),
(126, 'single', 37, 2, 2),
(127, 'master', 30, 45, 6),
(128, 'divorced', 37, 45, 6),
(129, 'primary', 30, 45, 6),
(130, 'single', 37, 45, 6),
(131, 'primary', 30, 45, 6),
(132, 'single', 37, 45, 6),
(133, 'primary', 30, 2, 2),
(134, 'single', 37, 2, 2),
(135, 'primary', 30, 45, 6),
(136, 'single', 37, 45, 6),
(137, 'primary', 30, 2, 2),
(138, 'single', 37, 2, 2),
(139, 'primary', 30, 45, 6),
(140, 'single', 37, 45, 6),
(141, 'primary', 30, 45, 6),
(142, 'single', 37, 45, 6),
(143, 'primary', 30, 2, 2),
(144, 'single', 37, 2, 2),
(145, 'primary', 30, 45, 6),
(146, 'single', 37, 45, 6),
(147, 'primary', 30, 2, 2),
(148, 'single', 37, 2, 2),
(149, 'primary', 30, 2, 2),
(150, 'single', 37, 2, 2),
(151, 'primary', 30, 45, 6),
(152, 'single', 37, 45, 6),
(153, 'primary', 30, 2, 2),
(154, 'single', 37, 2, 2),
(155, 'primary', 30, 45, 6),
(156, 'single', 37, 45, 6),
(157, 'primary', 30, 2, 2),
(158, 'single', 37, 2, 2),
(159, 'primary', 30, 2, 2),
(160, 'single', 37, 2, 2),
(161, 'master', 30, 1, 1),
(162, 'single', 37, 1, 1),
(163, 'primary', 30, 45, 6),
(164, 'single', 37, 45, 6),
(165, 'primary', 30, 2, 2),
(166, 'single', 37, 2, 2),
(167, 'primary', 30, 45, 6),
(168, 'single', 37, 45, 6),
(169, 'primary', 30, 45, 6),
(170, 'single', 37, 45, 6),
(171, 'primary', 30, 2, 2),
(172, 'single', 37, 2, 2),
(173, 'primary', 30, 45, 6),
(174, 'single', 37, 45, 6),
(175, 'primary', 30, 2, 2),
(176, 'single', 37, 2, 2),
(177, 'primary', 30, 45, 6),
(178, 'single', 37, 45, 6),
(179, 'master', 30, 2, 2),
(180, 'seperated', 37, 2, 2),
(181, 'primary', 30, 45, 6),
(182, 'single', 37, 45, 6),
(183, 'master', 30, 2, 2),
(184, 'married', 37, 2, 2),
(185, 'primary', 30, 45, 6),
(186, 'single', 37, 45, 6),
(187, 'bachelor', 30, 44, 7),
(188, 'seperated', 37, 44, 7),
(189, 'primary', 30, 2, 2),
(190, 'single', 37, 2, 2),
(191, 'primary', 30, 45, 6),
(192, 'single', 37, 45, 6),
(193, 'primary', 30, 45, 6),
(194, 'single', 37, 45, 6),
(195, 'primary', 30, 2, 2),
(196, 'single', 37, 2, 2),
(197, 'primary', 30, 2, 2),
(198, 'single', 37, 2, 2),
(199, 'primary', 30, 2, 2),
(200, 'single', 37, 2, 2),
(201, 'primary', 30, 45, 6),
(202, 'single', 37, 45, 6),
(203, 'primary', 30, 2, 2),
(204, 'single', 37, 2, 2),
(205, 'primary', 30, 45, 6),
(206, 'single', 37, 45, 6),
(207, 'primary', 30, 2, 2),
(208, 'single', 37, 2, 2);

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
(5, 44, 'read', 'gggg', '66666');

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
(41, 7, 44, 'Is a new mall at dabouq a good idea');

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

--
-- Dumping data for table `smart`
--

INSERT INTO `smart` (`
id`,
`smartanswer
`, `id_questions`, `id_users`, `id_surveys`) VALUES
(1, 'Jandaweel', 39, 1, 7),
(2, 'Khalda', 39, 2, 7),
(3, 'Dabouq', 39, 6, 7),
(4, '6', 40, 1, 7),
(5, '5', 40, 2, 7),
(6, '3', 40, 6, 7),
(7, 'Yes', 41, 1, 7),
(8, 'Yes', 41, 2, 7),
(9, 'Yes', 41, 6, 7),
(10, 'Tabarbour', 39, 9, 7),
(11, '1', 40, 9, 7),
(12, 'No', 41, 9, 7);

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
(7, 44, 'firstSmart', '7', 'first smart survey', '1');

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
-- Indexes for table `custmoers`
--
ALTER TABLE `custmoers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `custmoersfk1` (`id_user`),
  ADD KEY `custmoersfk2` (`username`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- AUTO_INCREMENT for table `custmoers`
--
ALTER TABLE `custmoers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `smart`
--
ALTER TABLE `smart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

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
