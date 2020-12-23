-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 10, 2020 at 10:00 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_noithat`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
CREATE TABLE IF NOT EXISTS `bill` (
  `id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `idUser` int(11) NOT NULL,
  `fullname` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dateOfSale` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `status` varchar(100) CHARACTER SET utf8 NOT NULL,
  `totalMoney` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `billdetail`
--

DROP TABLE IF EXISTS `billdetail`;
CREATE TABLE IF NOT EXISTS `billdetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idProduct` int(11) NOT NULL,
  `productName` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `idBill` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalMoney` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=282 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idProduct` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `fullname` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `picture` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` int(11) NOT NULL,
  `order_number` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `rating` int(11) NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
CREATE TABLE IF NOT EXISTS `discount` (
  `id` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `percentDiscount` int(11) NOT NULL,
  `deadline` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productdetails`
--

DROP TABLE IF EXISTS `productdetails`;
CREATE TABLE IF NOT EXISTS `productdetails` (
  `idProduct` int(11) NOT NULL,
  `material` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `trademark` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `price` float NOT NULL,
  `category` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `dateAdded` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(10) NOT NULL,
  `pictureProduct` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `productName`, `price`, `category`, `dateAdded`, `description`, `quantity`, `pictureProduct`) VALUES
(1, 'Ghế xoay văn phòng TP4', 470000, 'ghe', '2020-10-23 12:14:24', 'Ghế xoay văn phòng TP4 là dòng ghế lưng lưới mang đến cảm giác thoáng mát cho người sử dụng, thiết kế và kiểu dáng ghế đáp ứng nhu cầu sử dụng thuận tiện, hiện đại giúp không gian thông minh hơn.', 10, 'ghe-xoay-van-phong-TP4.jpg'),
(2, 'Ghế xoay văn phòng TP4-L', 470000, 'ghe', '2020-10-23 12:18:01', 'Ghế xoay văn phòng TP4-L là dòng ghế lưng lưới mang đến cảm giác thoáng mát cho người sử dụng, thiết kế và kiểu dáng ghế đáp ứng nhu cầu sử dụng thuận tiện, hiện đại giúp không gian thông minh hơn.', 100, 'ghe-xoay-van-phong-TP4-L.JPG'),
(3, 'Ghế xoay văn phòng XL1', 580000, 'ghe', '2020-10-23 12:20:43', 'Ghế xoay văn phòng XL1 là dòng ghế văn phòng kiểu dáng cách điệu, uốn cong đẹp mắt và nghệ thuật phù hợp với văn phòng… tạo cảm giác thoáng mát và thoải mái nhất cho người dùng.', 10, 'ghe-xoay-van-phong-XL1.JPG'),
(4, 'Ghế giám đốc GD03', 2900000, 'ghe', '2020-10-23 12:23:46', 'Ghế giám đốc GD03 được thiết kế bắt mắt là một trong những sản phẩm khẳng định đẳng cấp của sếp, giúp không gian văn phòng sếp hiện đại và tiện nghi hơn. Tận hưởng cảm giác êm ái và thư giãn ngay khi chọn ghế GD3 cho văn phòng.', 10, 'ghe-giam-doc-GD03.JPG'),
(5, 'Ghế giám đốc R07', 1620000, 'ghe', '2020-10-23 12:26:06', 'Ghế giám đốc R07 được sử dụng cho các văn phòng sếp giúp mang đến vẻ trẻ trung, năng động. Ghế có nhiều tính năng hữu ích chắc chắn sẽ khiến bạn hài lòng.', 10, 'ghe-giam-doc-R07.JPG'),
(6, 'Ghế chân quỳ Q13', 450000, 'ghe', '2020-10-23 12:28:25', 'Ghế chân quỳ Q13 là dòng ghế văn phòng kiểu dáng cách điệu, uốn cong đẹp mắt và nghệ thuật phù hợp với phòng họp, văn phòng… tạo cảm giác thoáng mát và thoải mái nhất cho người dùng.', 10, 'ghe-chan-quy-Q13.JPG'),
(7, 'Ghế chân quỳ Q2-N', 860000, 'ghe', '2020-10-23 12:32:45', 'Ghế chân quỳ da Q2-N là ghế phòng họp chất liệu da tạo sự sang trọng và uy nghiêm cho phòng họp của công ty, kiểu dáng độc đáo và mới lạ giúp không gian hài hòa, nâng tầm không gian văn phòng.', 10, 'ghe-chan-quy-Q2-N.JPG'),
(8, 'Ghế gấp GG2', 160000, 'ghe', '2020-10-23 12:34:44', 'Ghế gấp GG2 sẽ tạo sự êm ái thoải mái cho người ngồi. Sản phẩm thường được dùng trong văn phòng, phòng chờ, phòng tiếp dân hoặc những nơi có diện tích hẹp.', 10, 'ghe-gap-GG2.JPG'),
(9, 'Bàn giám đốc có hộc BGD1', 950000, 'ban', '2020-10-23 12:37:28', 'Bàn giám đốc có hộc BGD1 thiết kế hiện đại, mặt bàn hình chữ nhật, yếm bàn được trang trí hoa văn nổi bật mang lại không gian sang trọng cho căn phòng của bạn!', 10, 'ban-giam-doc-co-hoc-BGD1.JPG'),
(10, 'Bàn chân sắt chữ U 1m2 BNV7', 450000, 'ban', '2020-10-23 12:39:32', 'Bàn chân sắt chữ U 1m2 BNV7 thích hợp cho người sử dụng máy vi tính. Sản phẩm thường được dùng nhiều cho trong văn phòng, gia đình… tiết kiệm diện tích tối đa. Thiết kế với chân sắt phủ sơn tĩnh điện chống gỉ, ống chân sắt 40x40mm, giằng sắt 25x50mm.', 10, 'Ban-chan-sat-chu-U-1m2-BNV7.JPG'),
(11, 'Bàn giám đốc không hộc BGD17', 1750000, 'ban', '2020-10-23 12:46:38', 'Bàn giám đốc không hộc BGD17 có phần trang trí ở yếm rất đẹp mắt, kiểu dáng sang trọng, chất liệu cao cấp cùng sơn màu đỏ nâu phù hợp với những không gian phòng lãnh đạo trang trọng và quyền uy. Có thể sử dụng cùng tủ phụ – hộc di động để tăng thêm không gian làm việc, lưu trữ, bảo mật cho giám đốc.', 10, 'ban-giam-doc-khong-hoc-BGD17.JPG'),
(12, 'Bàn giám đốc không hộc BGD2', 1150000, 'ban', '2020-10-23 12:49:13', 'Bàn giám đốc không hộc BGD2 thiết kế sang trọng, đẳng cấp tính thẩm mỹ cao và giá trị sử dụng lâu dài, được nhiều cá nhân và tổ chức lựa chọn. Thường được dùng cho phòng giám đốc, trưởng phòng…', 10, 'ban-giam-doc-khong-hoc-BGD2.JPG'),
(13, 'Bàn giám đốc không hộc BGD13', 1750000, 'ban', '2020-10-23 12:51:54', 'Bàn giám đốc không hộc BGD13 thiết kế với phong cách hiện đại, họa tiết được trau chuốt tỉ mỉ, phù hợp với phong cách văn phòng giám đốc ngày nay. Bàn giám đốc  thiết kế hiện đại, mặt bàn hình chữ nhật, yếm bàn được chạm khắc sang trọng, tinh tế.', 10, 'ban-giam-doc-khong-hoc-BGD13.JPG'),
(14, 'Bàn làm việc di động BDD-01', 480000, 'ban', '2020-10-23 12:51:54', 'Bàn làm việc di động BDD-01 thích hợp cho người sử dụng máy vi tính. Sản phẩm thường được dùng nhiều cho trong văn phòng, gia đình… tiết kiệm diện tích tối đa. Mặt bàn làm bằng gỗ MFC bền đẹp, chắc chắn.', 10, 'Ban-lam-viec-di-dong-BDD-01.JPG'),
(15, 'Bàn làm việc BM3', 850000, 'ban', '2020-10-23 12:51:54', 'Bàn làm việc BM3 thích hợp cho người sử dụng máy vi tính. Sản phẩm thường được dùng nhiều cho trong văn phòng, gia đình… tiết kiệm diện tích tối đa. Mặt bàn làm bằng gỗ MFC bền đẹp, chắc chắn.', 10, 'Ban-lam-viec-BM3.JPG'),
(16, 'Bàn làm việc HOME2', 850000, 'ban', '2020-10-23 12:51:54', 'Bàn làm việc HOME2 thích hợp cho người sử dụng máy vi tính. Sản phẩm thường được dùng nhiều cho trong văn phòng, gia đình… tiết kiệm diện tích tối đa.', 10, 'BAn-lAm-viEc-HOME2.JPG'),
(17, 'Tủ tài liệu TL14', 850000, 'tu', '2020-10-23 12:51:54', 'Tủ tài liệu TL14 là dòng tủ gỗ được sử dụng nhiều trong các văn phòng hiện đại. Tủ gỗ có nhiều tính năng giúp văn phòng được nâng tầm, kiểu dáng đẹp và tiện ích.', 10, 'Documentcabinet-TL14.JPG'),
(18, 'Tủ tài liệu TL1', 550000, 'tu', '2020-10-23 12:51:54', 'Tủ tài liệu TL1 là dòng tủ gỗ được sử dụng nhiều trong các văn phòng hiện đại. Tủ gỗ có nhiều tính năng giúp văn phòng được nâng tầm, kiểu dáng đẹp và tiện ích.', 10, 'DocumentcabinetTL1.JPG'),
(19, 'Tủ tài liệu sắt TL09L', 1550000, 'tu', '2020-10-23 12:51:54', 'Tủ tài liệu sắt TL09L là sản phẩm được nhiều văn phòng lựa chọn bởi mang đến nhiều tiện ích. Tủ tài liệu sắt TL09L với thiết kế hiện đại, tối giản thích hợp cho không gian văn phòng nhỏ hẹp.', 10, 'IrondocumentcabinetTL09L.JPG'),
(20, 'Tủ sắt locker LK06', 1550000, 'tu', '2020-10-23 12:51:54', 'Tủ sắt locker LK06 là sản phẩm tiện ích được sử dụng phổ biến trong nhiều văn phòng. Tủ được làm từ sắt phun sơn tĩnh điện giúp chống oxy hóa, gỉ, tác động môi trường. Tủ thiết kế rộng rãi cho việc đựng tài liệu văn phòng, hồ sơ được cất giữ đảm bảo.', 10, 'IronLockercabinetLK06.JPG'),
(21, 'Tủ tài liệu sắt TL06', 3700000, 'tu', '2020-10-23 12:51:54', 'Sản phẩm tủ tài liệu sắt hiện đại thể hiện ở chất liệu mới, màu sắc hài hòa trang nhã là niềm cảm hứng cho sự đam mê sáng tạo trong công việc.', 10, 'IrondocumentcabinetTL06.JPG'),
(23, 'Tủ tài liệu sắt TL01K-T', 1800000, 'tu', '2020-10-23 12:51:54', 'Sản phẩm tủ tài liệu sắt hiện đại thể hiện ở chất liệu mới, màu sắc hài hòa trang nhã là niềm cảm hứng cho sự đam mê sáng tạo trong công việc.', 18, 'IrondocumentcabinetTL01K-T.JPG'),
(24, 'Tủ tài liệu sắt TL07L', 1450000, 'tu', '2020-10-23 12:51:54', 'Tủ được làm từ thép cuộn cán nguội, kết cấu thép trở nên cứng và khỏe hơn.\r\nSản phẩm phun sơn tĩnh điện ở nhiệt độ cao,', 18, 'IrondocumentcabinetTL07L.JPG'),
(25, 'Tủ giày TG04-100', 1500000, 'tu', '2020-10-23 12:51:54', 'Tủ giày TG04-100 có thiết kế chắc chắn, làm bằng gỗ công nghiệp phủ Melamine giúp bảo quản giày dép tránh khỏi bụi bẩn, côn trùng, hạn chế ẩm mốc.', 18, 'ShoecabineTG04-100.JPG'),
(26, 'Giường tầng sắt GT02', 1500000, 'giuong', '2020-10-23 12:51:54', 'Giường tầng sắt GT02 có thiết kế an toàn, chắc chắn và phù hợp với nhiều không gian, đặc biệt là ký túc xá học sinh, sinh viên, các đơn vị đào tạo, xuất khẩu lao động, dùng trong quân đội … Ba Huy đang cần thanh lý số lượng lớn mặt hàng giường sắt. Giường tầng sắt khung ống thép khung vuông 30×30 và vuông 25×50 sơn tĩnh điện, giát giường bằng gỗ công nghiệp.', 18, 'IronbunkbedGT02.JPG'),
(27, 'Giường sắt GS01', 1390000, 'giuong', '2020-10-23 12:51:54', 'Giường sắt GS01 có thiết kế an toàn, chắc chắn và phù hợp với nhiều không gian, đặc biệt là ký túc xá học sinh, sinh viên, các đơn vị đào tạo, xuất khẩu lao động, dùng trong quân đội … Ba Huy đang cần thanh lý số lượng lớn mặt hàng giường sắt. Giường tầng sắt khung ống thép khung vuông 30×30 và vuông 25×50 sơn tĩnh điện, giát giường bằng gỗ công nghiệp.', 18, 'IronbedGS01.JPG'),
(28, 'Giường tầng sắt GT40BH', 1800000, 'giuong', '2020-10-23 12:51:54', 'Giường tầng sắt GT40BH có thiết kế an toàn, chắc chắn và phù hợp với nhiều không gian, đặc biệt là ký túc xá học sinh, sinh viên, các đơn vị đào tạo, xuất khẩu lao động, dùng trong quân đội … Ba Huy đang cần thanh lý số lượng lớn mặt hàng giường sắt. Giường tầng sắt khung ống thép khung vuông 30×30 và vuông 25×50 sơn tĩnh điện, giát giường bằng gỗ công nghiệp.', 18, 'IronbunkbedGT40BH.JPG'),
(29, 'Giường tầng sắt GT40-DH', 1500000, 'giuong', '2020-10-23 12:51:54', 'Giường tầng sắt GT40-DH có thiết kế an toàn, chắc chắn và phù hợp với nhiều không gian, đặc biệt là ký túc xá học sinh, sinh viên, các đơn vị đào tạo, xuất khẩu lao động, dùng trong quân đội … Ba Huy đang cần thanh lý số lượng lớn mặt hàng giường sắt. Giường tầng sắt khung ống thép khung vuông 30×30 và vuông 25×50 sơn tĩnh điện, giát giường bằng gỗ công nghiệp.', 18, 'IronbunkbedGT40-DH.JPG'),
(30, 'Giường tầng sắt GT05', 1900000, 'giuong', '2020-10-23 12:51:54', 'Giường tầng sắt GT05 có thiết kế an toàn, chắc chắn và phù hợp với nhiều không gian, đặc biệt là ký túc xá học sinh, sinh viên, các đơn vị đào tạo, xuất khẩu lao động, dùng trong quân đội … Ba Huy đang cần thanh lý số lượng lớn mặt hàng giường sắt. Giường tầng sắt khung ống thép khung vuông 30×30 và vuông 25×50 sơn tĩnh điện, giát giường bằng gỗ công nghiệp.', 18, 'IronbunkbedGT05.JPG'),
(31, 'Giường tầng sắt GT03', 1900000, 'giuong', '2020-10-23 12:51:54', 'Giường tầng sắt GT03 có thiết kế an toàn, chắc chắn và phù hợp với nhiều không gian, đặc biệt là ký túc xá học sinh, sinh viên, các đơn vị đào tạo, xuất khẩu lao động, dùng trong quân đội … Ba Huy đang cần thanh lý số lượng lớn mặt hàng giường sắt. Giường tầng sắt khung ống thép khung vuông 30×30 và vuông 25×50 sơn tĩnh điện, giát giường bằng gỗ công nghiệp.', 18, 'IronbunkbedGT03.JPG'),
(32, 'Giường tầng sắt GT40 màu đen', 1900000, 'giuong', '2020-10-23 12:51:54', 'Giường tầng sắt GT40 màu đen có thiết kế an toàn, chắc chắn và phù hợp với nhiều không gian, đặc biệt là ký túc xá học sinh, sinh viên, các đơn vị đào tạo, xuất khẩu lao động, dùng trong quân đội … Ba Huy đang cần thanh lý số lượng lớn mặt hàng giường sắt. Giường tầng sắt khung ống thép khung vuông 30×30 và vuông 25×50 sơn tĩnh điện, giát giường bằng gỗ công nghiệp.', 18, 'GT40ironbunkbedblack.JPG');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `account` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `birthDay` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `phoneOrEmail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `adress` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `picture` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `position` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `account`, `password`, `birthDay`, `phoneOrEmail`, `adress`, `picture`, `position`) VALUES
(1, 'Bui Minh Tien', 'minhtien', '123456', '2020-12-09 17:00:00', '025649795', 'DakLak', 'abc', b'1'),
(2, 'Nguyen Thanh Hau', 'dinhthanh', '123456', '2020-12-05 04:34:16', '025649795', 'DakLak', NULL, b'0');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
