-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2019 at 06:56 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gallary`
--

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `email` varchar(40) NOT NULL,
  `Name` char(10) NOT NULL,
  `Image` varchar(500) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `Liked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `collection`
--

INSERT INTO `collection` (`email`, `Name`, `Image`, `Description`, `Liked`) VALUES
('ankith.b01@gmail.com', 'fsmily', 'https://images.pexels.com/photos/1832097/pexels-photo-1832097.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 'mothers love', 0),
('ankith.b01@gmail.com', 'study', 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'preparing for exam', 0),
('ankith.b01@gmail.com', 'study', 'https://images.pexels.com/photos/1166657/pexels-photo-1166657.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'library books to use', 0),
('ankith.b01@gmail.com', 'student', 'https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'student in library', 0),
('ankith.b01@gmail.com', 'work', 'https://images.pexels.com/photos/442574/pexels-photo-442574.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'diary', 0),
('ankith.b01@gmail.com', 'family', 'https://images.pexels.com/photos/1266007/pexels-photo-1266007.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'random', 0),
('ankith.b01@gmail.com', 'roaming', 'https://images.pexels.com/photos/1081111/pexels-photo-1081111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'roamed around', 0),
('ankith.b01@gmail.com', 'roaming', 'https://images.pexels.com/photos/91223/pexels-photo-91223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'outside', 0),
('ankith.b01@gmail.com', 'animals', 'https://images.freeimages.com/images/large-previews/72c/fox-1522156.jpg', 'fox', 0),
('abc@def.com', 'animals', 'https://images.freeimages.com/images/large-previews/8cc/playing-on-the-beach-1577767.jpg', 'dog', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `name` char(10) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `email`, `password`) VALUES
('ankith', 'ankith.b01@gmail.com', '1234'),
('anku', 'abcd@efg.com', '1234'),
('abc', 'abc@def.com', '1234');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
