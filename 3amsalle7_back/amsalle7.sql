-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2024 at 01:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amsalle7`
--

-- --------------------------------------------------------

--
-- Table structure for table `objects`
--

CREATE TABLE `objects` (
  `id` int(11) NOT NULL,
  `objectif` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `secteurs`
--

CREATE TABLE `secteurs` (
  `id` int(11) NOT NULL,
  `sect` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `secteurs`
--

INSERT INTO `secteurs` (`id`, `sect`, `createdAt`, `updatedAt`) VALUES
(1, 'plombie', '2024-12-08 18:21:29', '2024-12-08 18:21:29'),
(2, 'Électricien', '2024-12-08 18:21:50', '2024-12-08 18:21:50'),
(3, 'Mécanicien', '2024-12-08 18:21:50', '2024-12-08 18:21:50');

-- --------------------------------------------------------

--
-- Table structure for table `supports`
--

CREATE TABLE `supports` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `cin` varchar(255) NOT NULL,
  `numTel` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supports`
--

INSERT INTO `supports` (`id`, `nom`, `prenom`, `cin`, `numTel`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'hacen', 'aidi', '14712870', '28389204', 'hacenaidi4455@gmail.com', '$2b$10$M6jW8EkIN5dHmgu1tp9DieW0KdKclV12C3pd6t..kFnm3Qu5UzWLK', '2024-12-08 13:46:17', '2024-12-08 13:46:17'),
(2, 'hacen', 'aidi', '14712870', '28389204', 'hacenaidi4255@gmail.com', '$2b$10$OC3q9YtuGI9YjFrSRGqFN.RM9Uz8aGwL.m0UN5/KYRZ7O3UhMSR/G', '2024-12-09 21:28:21', '2024-12-09 21:28:21');

-- --------------------------------------------------------

--
-- Table structure for table `techniciens`
--

CREATE TABLE `techniciens` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `cin` varchar(255) NOT NULL,
  `numTel` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `zone` varchar(255) NOT NULL,
  `secteur` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `techniciens`
--

INSERT INTO `techniciens` (`id`, `nom`, `prenom`, `cin`, `numTel`, `email`, `zone`, `secteur`, `createdAt`, `updatedAt`) VALUES
(1, 'iyed', 'bencheikh', '14725836', '28356245', 'iyedbencheikh@gamil.com', 'nabuel', '1', '2024-12-08 18:23:27', '2024-12-08 18:23:27'),
(2, 'houcien', 'aidi', '14715874', '25836147', 'houcienaidi@gmail.com', 'nabeul', '3', '2024-12-08 18:23:27', '2024-12-08 18:23:27'),
(3, 'folen', 'folen', '12345678', '12345678', 'foulenbenfolen@gmail.com', 'tunis', '1', '2024-12-08 18:25:34', '2024-12-08 18:25:34'),
(4, 'test', 'test', '12345678', '12345678', 'test@gmail.com', 'gafsa', '2', '2024-12-08 18:25:34', '2024-12-08 18:25:34');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `nomClient` varchar(255) NOT NULL,
  `prenomClient` varchar(255) NOT NULL,
  `numTelClient` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `zone` varchar(255) NOT NULL,
  `montant` float NOT NULL,
  `secteur` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `etat` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `SupportId` int(11) DEFAULT NULL,
  `TechnicienId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `nomClient`, `prenomClient`, `numTelClient`, `adresse`, `zone`, `montant`, `secteur`, `description`, `etat`, `createdAt`, `updatedAt`, `SupportId`, `TechnicienId`) VALUES
(1, 'test', 'tickets', '12345678', 'monastir', 'beja', 150, '1', 'need to plombie ', 'En cours', '2024-12-08 17:35:41', '2024-12-09 14:51:27', 1, 3),
(9, 'hacen', 'aidi', '23432387', 'city nour', '.......', 150, '1', 'ecec', 'En cours', '2024-12-09 14:46:23', '2024-12-09 14:47:59', 1, 1),
(10, 'nour', 'guedri', '12365487', 'nabeul', 'manzel boselfa', 305, '3', '7ajtek be bechir ', 'Accomplie', '2024-12-09 21:32:16', '2024-12-09 21:32:41', 1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `objects`
--
ALTER TABLE `objects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `secteurs`
--
ALTER TABLE `secteurs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supports`
--
ALTER TABLE `supports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `techniciens`
--
ALTER TABLE `techniciens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SupportId` (`SupportId`),
  ADD KEY `TechnicienId` (`TechnicienId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `objects`
--
ALTER TABLE `objects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `secteurs`
--
ALTER TABLE `secteurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `supports`
--
ALTER TABLE `supports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `techniciens`
--
ALTER TABLE `techniciens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`SupportId`) REFERENCES `supports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`TechnicienId`) REFERENCES `techniciens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
