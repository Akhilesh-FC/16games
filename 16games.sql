-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2026 at 10:50 AM
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
-- Database: `16games`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminuser`
--

CREATE TABLE `adminuser` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `session_token` varchar(100) DEFAULT NULL,
  `password_version` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adminuser`
--

INSERT INTO `adminuser` (`id`, `name`, `email`, `password`, `image`, `created_at`, `session_token`, `password_version`) VALUES
(1, 'Admin User', 'admin@gmail.com', '12345678', NULL, '2025-12-04 05:00:20', '93442a6d4f93607c808c5bd530a7c35e6bce8eb677524e1e8c6889e386940fe0', 1);

-- --------------------------------------------------------

--
-- Table structure for table `betlogs`
--

CREATE TABLE `betlogs` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `games_no` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `betlogs`
--

INSERT INTO `betlogs` (`id`, `game_id`, `games_no`, `amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'RED', 100.00, 0, '2026-01-15 08:17:58', '2026-01-15 08:17:58');

-- --------------------------------------------------------

--
-- Table structure for table `bets`
--

CREATE TABLE `bets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `games_no` varchar(50) NOT NULL,
  `win_number` varchar(50) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `commission` decimal(10,2) DEFAULT 0.00,
  `trade_amount` decimal(10,2) NOT NULL,
  `win_amount` decimal(10,2) DEFAULT 0.00,
  `order_id` varchar(100) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bets`
--

INSERT INTO `bets` (`id`, `user_id`, `game_id`, `games_no`, `win_number`, `amount`, `commission`, `trade_amount`, `win_amount`, `order_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'RED', NULL, 100.00, 5.00, 95.00, 0.00, 'ORD123456', 0, '2026-01-15 08:20:12', '2026-01-15 08:20:12');

-- --------------------------------------------------------

--
-- Table structure for table `bet_result`
--

CREATE TABLE `bet_result` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `games_no` varchar(50) NOT NULL,
  `number` varchar(50) DEFAULT NULL,
  `win_number` varchar(50) DEFAULT NULL,
  `multiplier` decimal(10,2) DEFAULT 1.00,
  `card_id` int(11) DEFAULT NULL,
  `card_name` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `random_card` varchar(100) DEFAULT NULL,
  `json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`json`)),
  `status` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bet_result`
--

INSERT INTO `bet_result` (`id`, `game_id`, `games_no`, `number`, `win_number`, `multiplier`, `card_id`, `card_name`, `image`, `random_card`, `json`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'RED', '3', '7', 2.00, NULL, 'King', 'king.png', 'King', '{\"color\":\"red\"}', 1, '2026-01-15 08:22:57', '2026-01-15 08:22:57');

-- --------------------------------------------------------

--
-- Table structure for table `games_list`
--

CREATE TABLE `games_list` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` tinyint(4) DEFAULT 1 COMMENT '1 = active, 0 = inactive',
  `game_link` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games_list`
--

INSERT INTO `games_list` (`id`, `name`, `status`, `game_link`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Pyramid Slots', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:00:49'),
(2, 'Greedy Box', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:00:49'),
(3, 'Pirate King', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:00:49'),
(4, 'Greedy Lion', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:00:49'),
(5, 'Football Club', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:00:49'),
(6, 'Crash', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:00:49'),
(7, 'Fruit Party', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:00:49'),
(8, 'Struge', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:01:28'),
(9, 'Lucky Slot', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:00:49'),
(10, 'Sea Hunter', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:00:49'),
(11, 'Bonus', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:00:49'),
(12, 'InOut', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:00:49'),
(13, 'Rulet', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:01:56'),
(14, 'Super Car', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:00:49'),
(15, 'Gate of Olimpos', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-13 04:02:12'),
(16, 'Yummy', 1, NULL, NULL, '2026-01-13 04:00:49', '2026-01-15 07:54:46');

-- --------------------------------------------------------

--
-- Table structure for table `login_policy`
--

CREATE TABLE `login_policy` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` int(10) DEFAULT NULL COMMENT '1 = for driver\r\n2 = for User',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `login_policy`
--

INSERT INTO `login_policy` (`id`, `title`, `description`, `type`, `created_at`) VALUES
(1, 'Privacy Policy', '<article>\n  <h1>Privacy Policy</h1>\n\n  <h2>Your Privacy Matters to Us</h2>\n  <p>We are committed to protecting your personal information and ensuring that your data is handled lawfully and transparently.</p>\n\n  <h2>1. Information We Collect</h2>\n  <p>We may collect information such as your name, phone number, email, location, and device details while you are using the app.</p>\n\n  <h2>2. How We Use Your Information</h2>\n  <p>Your information is used to improve app performance, enhance security, provide a better user experience, and enable service features like ride booking and service appointments.</p>\n\n  <h2>3. Location Access</h2>\n  <p>Location data helps us find nearby service providers, calculate distance, estimate arrival time, and ensure accurate pickups and deliveries.</p>\n\n  <h2>4. Third-Party Services</h2>\n  <p>We may share limited information with trusted partners such as payment gateways and mapping providers to complete specific operations.</p>\n\n  <h2>5. Data Protection</h2>\n  <p>Your data is stored securely. Unauthorized access, misuse, or disclosure is strictly prohibited. We regularly update our security measures.</p>\n\n  <h2>6. Your Rights</h2>\n  <p>You may request deletion of your data, update your account details, or contact support for any privacy-related concerns.</p>\n\n  <h2>7. Updates to This Policy</h2>\n  <p>We may revise this Privacy Policy from time to time. Continued use of the app signifies your acceptance of the updated terms.</p>\n\n  <footer>\n    <p style=\"text-align:center; margin-top:20px;\">❤️ Thank you for trusting Rainbow!</p>\n  </footer>\n</article>\n', 2, '2025-12-04 04:39:29'),
(2, 'Terms of Login', '<article>\n  <h1>Terms of Login</h1>\n\n  <h2>Secure and Responsible Account Access</h2>\n  <p>By logging into the app, you agree to follow the guidelines below to ensure safe, secure, and responsible access to your account.</p>\n\n  <h2>1. Accurate Login Information</h2>\n  <p>You must provide correct and updated information, including your mobile number or email, to access your account without restrictions.</p>\n\n  <h2>2. Protection of Login Credentials</h2>\n  <p>You are responsible for keeping your login details confidential. Do not share your OTP, password, or access details with anyone.</p>\n\n  <h2>3. OTP-Based Verification</h2>\n  <p>Login may require OTP verification. By using our app, you agree to receive OTPs on your registered number for authentication and security purposes.</p>\n\n  <h2>4. Prevention of Unauthorized Access</h2>\n  <p>If you observe any unusual or unauthorized login attempts, report it to our support team immediately to safeguard your account.</p>\n\n  <h2>5. Device Security Requirements</h2>\n  <p>Ensure your device is protected with a lock screen and avoid logging in on untrusted or public devices to prevent unauthorized use.</p>\n\n  <h2>6. Misuse of Account</h2>\n  <p>Engaging in fraudulent activity, impersonation, harmful actions, or violating community rules may result in account suspension or termination.</p>\n\n  <h2>7. Updates to Terms of Login</h2>\n  <p>We may modify these Terms of Login from time to time. Continued use of the app after an update indicates your acceptance of the revised terms.</p>\n\n  <footer>\n    <p style=\"text-align:center; margin-top:20px;\">🔐 Thank you for accessing your account responsibly!</p>\n  </footer>\n</article>\n', 2, '2025-12-04 04:39:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `password`, `status`, `created_at`) VALUES
(2, 'Akhilesh', 'akhileshyadav1@gmail.com', '7800302707', '12345678', 1, '2026-01-15 07:27:46');

-- --------------------------------------------------------

--
-- Table structure for table `virtual_games`
--

CREATE TABLE `virtual_games` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `number` varchar(50) NOT NULL,
  `actual_number` varchar(50) NOT NULL,
  `multiplier` decimal(10,2) DEFAULT 1.00,
  `type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `virtual_games`
--

INSERT INTO `virtual_games` (`id`, `game_id`, `name`, `number`, `actual_number`, `multiplier`, `type`, `created_at`, `updated_at`) VALUES
(1, 1, 'Red', '1', '7', 2.00, 'color', '2026-01-15 08:15:54', '2026-01-15 08:15:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminuser`
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `betlogs`
--
ALTER TABLE `betlogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `bets`
--
ALTER TABLE `bets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `order_id_2` (`order_id`);

--
-- Indexes for table `bet_result`
--
ALTER TABLE `bet_result`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `games_list`
--
ALTER TABLE `games_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_policy`
--
ALTER TABLE `login_policy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `virtual_games`
--
ALTER TABLE `virtual_games`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_id` (`game_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminuser`
--
ALTER TABLE `adminuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `betlogs`
--
ALTER TABLE `betlogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bets`
--
ALTER TABLE `bets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bet_result`
--
ALTER TABLE `bet_result`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `games_list`
--
ALTER TABLE `games_list`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `login_policy`
--
ALTER TABLE `login_policy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `virtual_games`
--
ALTER TABLE `virtual_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
