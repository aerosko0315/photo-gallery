-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 23, 2017 at 03:28 PM
-- Server version: 5.7.18-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `photo_gallery`
--

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(10) NOT NULL,
  `title` varchar(225) NOT NULL,
  `filename` varchar(225) NOT NULL,
  `filesize` varchar(12) NOT NULL,
  `height` int(10) NOT NULL,
  `width` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `title`, `filename`, `filesize`, `height`, `width`) VALUES
(1, 'DSC_0020', 'DSC_0020.jpg', '82738', 500, 752),
(2, 'DSC_0021', 'DSC_0021.jpg', '74597', 500, 752),
(3, 'DSC_0033', 'DSC_0033.jpg', '78894', 500, 752),
(4, 'DSC_0034', 'DSC_0034.jpg', '88694', 500, 752),
(5, 'DSC_0249', 'DSC_0249.jpg', '55551', 752, 500),
(6, 'DSC_0261', 'DSC_0261.jpg', '65762', 752, 500),
(7, 'DSC_0339', 'DSC_0339.jpg', '52028', 500, 752),
(8, 'DSC_0348', 'DSC_0348.jpg', '46032', 500, 752),
(9, 'DSC_0358', 'DSC_0358.jpg', '122311', 752, 500),
(10, 'DSC_0397', 'DSC_0397.jpg', '80074', 500, 752),
(11, 'DSC_0417', 'DSC_0417.jpg', '85956', 500, 752),
(12, 'DSC_0446', 'DSC_0446.jpg', '154531', 500, 752),
(13, 'DSC_0450', 'DSC_0450.jpg', '133664', 752, 500),
(14, 'DSC_0845', 'DSC_0845.jpg', '88422', 500, 752),
(15, 'DSC_0847', 'DSC_0847.jpg', '62999', 500, 752),
(16, 'DSC_0850', 'DSC_0850.jpg', '76065', 500, 752),
(17, 'DSC_0871', 'DSC_0871.jpg', '75912', 500, 752),
(18, 'DSC_0876', 'DSC_0876.jpg', '59987', 752, 500),
(19, 'DSC_0934', 'DSC_0934.jpg', '152469', 500, 752),
(20, 'DSC_1105', 'DSC_1105.jpg', '50075', 500, 752),
(21, 'DSC_1142', 'DSC_1142.jpg', '50157', 500, 752),
(22, 'DSC_2057m', 'DSC_2057m.jpg', '50843', 500, 752),
(23, 'DSC_2132', 'DSC_2132.jpg', '148733', 500, 752),
(24, 'DSC_2174', 'DSC_2174.jpg', '140209', 500, 752),
(25, 'DSC_2870', 'DSC_2870.jpg', '83335', 500, 752),
(26, 'DSC_2940', 'DSC_2940.jpg', '96054', 500, 752),
(27, 'DSC_4145', 'DSC_4145.jpg', '67161', 500, 752),
(28, 'DSC_4258', 'DSC_4258.jpg', '105039', 500, 752),
(29, 'DSC_4321', 'DSC_4321.jpg', '102209', 500, 752),
(30, 'DSC_4351', 'DSC_4351.jpg', '100738', 500, 752),
(31, 'DSC_4384', 'DSC_4384.jpg', '76389', 500, 752),
(32, 'DSC_4399', 'DSC_4399.jpg', '91516', 500, 752),
(33, 'DSC_4561', 'DSC_4561.jpg', '96441', 752, 500),
(34, 'DSC_4607', 'DSC_4607.jpg', '48775', 500, 752),
(35, 'DSC_5645', 'DSC_5645.jpg', '130074', 500, 752),
(36, 'DSC_5907', 'DSC_5907.jpg', '91607', 500, 752),
(37, 'DSC_6494', 'DSC_6494.jpg', '60279', 500, 752),
(38, 'DSC_6558', 'DSC_6558.jpg', '120338', 500, 752),
(39, 'DSC_6590', 'DSC_6590.jpg', '136606', 500, 752),
(40, 'DSC_6603', 'DSC_6603.jpg', '82053', 500, 752),
(41, 'DSC_6824', 'DSC_6824.jpg', '155162', 500, 752),
(42, 'DSC_6857', 'DSC_6857.jpg', '131043', 500, 752),
(43, 'DSC_8125', 'DSC_8125.jpg', '69628', 500, 752);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `photo_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
