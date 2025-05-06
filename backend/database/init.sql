-- Script de inicialización para la base de datos 'vitepelis'
-- Incluye creación de tablas y datos de ejemplo

SET NAMES 'utf8mb4';

CREATE DATABASE IF NOT EXISTS vitepelis;
USE vitepelis;

CREATE TABLE `users` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`email` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`card` VARCHAR(16) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`date` DATE NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `email` (`email`) USING BTREE,
	UNIQUE INDEX `card` (`card`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=11
;

CREATE TABLE `movies` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`description` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`routeImg` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`routeImgSlider` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`duration` INT(10) NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=7
;

CREATE TABLE `seats` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`idPeli` INT(10) NOT NULL,
	`idUser` INT(10) NULL DEFAULT NULL,
	`state` VARCHAR(20) NOT NULL DEFAULT 'disponible' COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `idUser` (`idUser`) USING BTREE,
	INDEX `idPeli` (`idPeli`) USING BTREE,
	CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `seats_ibfk_2` FOREIGN KEY (`idPeli`) REFERENCES `movies` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=121
;

CREATE TABLE `comments` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`nameuser` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`idpeli` INT(10) NOT NULL,
	`comment` TEXT NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `idpeli` (`idpeli`) USING BTREE,
	CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`idpeli`) REFERENCES `movies` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=13
;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `card`, `date`) VALUES
	(1, 'Diana', 'diana@gmail.com', '$2b$10$Xk5nJwH6KTq29RAVyGAD7uArtPALU1Wa.K3dL5RqSDct6fBOMM2ku', '1234567891234567', '2004-10-25'),
	(2, 'Justin', 'justin@gmail.com', '$2b$10$KdcZILrIEZNYdBUBhIwVf.WPV670RrlZT7MOsrcZ5Z4yjzHxRWjzi', '7272727272727272', '2006-09-20'),
	(3, 'Erik', 'erik@gmail.com', '$2b$10$VB.0mw9PnwilAkqdz7UWxOu1odNtUB5jtG7ZT3581i6WL2EbF.Is2', '1111111111111111', '2000-01-02'),
	(4, 'Alex', 'alex@gmail.com', '$2b$10$serBB14Iws1TVmssQnbQCemiu0Tiz3rwq.6sDDqcORe7McpjNpvOu', '1111111111111112', '2005-01-01'),
	(5, 'Jessica', 'jessi@gmali.com', '$2b$10$s0.TTbS2WSuM2k6M81df.uPB7rOPZ1qBHSHtH.VD23YF.k0lJzJby', '1231212312312312', '1995-01-01'),
	(6, 'Darwin', 'darwin@gmail.com', '$2b$10$ZVCOnPjcmOTbRM4YnhXwVeMT5SaBh9qGeOdfzcA5wTA7mq6g00rF6', '2378964237846234', '1972-01-01'),
	(7, 'Alexander', 'alexander@gmail.com', '$2b$10$3BMBCH4RnOelVD6CrqOWWOjT46goZduHdDELQlzD9cJPEFyM9z59G', '2343664567846234', '1972-01-01'),
	(8, 'Ana', 'ana@gmail.com', '$2b$10$juhGmVjusDLfZX6rUUHfNe6N/RBWNVFVkjTWfYf0O8/2TWsJl85FW', '1231231231231231', '2000-01-01'),
	(9, 'Pepe', 'pepe@gmail.com', '$2b$10$ucQ1ZZ3IbTwm1k3h/rPc0uS4bORw6GFuOBdFFXOu.2DbVqspHUkt6', '2398472389428965', '2002-01-01'),
	(10, 'Pepito', 'pepito@gmail.com', '$2b$10$iXm46Wk3T45G3FUd.hCW.O.MC5GyKoYAkRyMR2vSw2cUOekivOzyG', '8623783645784365', '2001-01-01');

INSERT INTO `movies` (`id`, `name`, `description`, `routeImg`, `routeImgSlider`, `duration`) VALUES
	(1, 'Capitan America', 'Tras reunirse con el recien elegido presidente de Estados Unidos Thaddeus Ross, Sam se encuentra en medio de un incidente internacional. Debe descubrir la razon detras de un nefasto complot global antes de que la verdadera mente maestra tenga al mundo entero viendo rojo.', '/img/portada/cAmerica.jpg', '/img/slider/Capitan-America.webp', 118),
	(2, 'Monkey', 'Cuando los gemelos Hal y Bill descubren el antiguo mono de juguete de su padre en el atico, una serie de truculentas muertes comienzan a ocurrir a su alrededor. Los hermanos deciden tirar el mono y continuar con sus vidas, distanciandose con el paso de los anos. Pero cuando las misteriosas muertes vuelven a sucederse, los hermanos deberan reunirse para destruir el mono antes de que acabe con las vidas de todos a su alrededor.', '/img/portada/monkey2.jpg', '/img/slider/The-monkey.webp', 98),
	(3, 'Paddington', 'Cuando Paddington descubre que su querida tia Lucy ha desaparecido del Hogar para Osos Jubilados, el y la familia Brown se dirigen a las selvas de Peru para buscarla, siendo la unica pista de su paradero un punto marcado en un enigmatico mapa. Decidido a resolver el misterio, Paddington se embarca en una emocionante busqueda a traves de las selvas tropicales del Amazonas para encontrar a su tia... y puede que tambien descubra uno de los tesoros mas legendarios del mundo.', '/img/portada/osito.jpg', '/img/slider/osito.webp', 119),
	(4, 'La ultima reina', 'Ambientada en la sangrienta corte Tudor del infame rey Enrique VIII de Inglaterra y contada desde el punto de vista de la reina Catalina Parr, la sexta y ultima esposa de Enrique y la unica que evito el destierro o la muerte.', '/img/portada/reina.jpg', '/img/slider/La-ultima-reina.webp', 120),
	(5, 'Thunderbolts', 'Thunderbolts* reune un equipo poco convencional de antiheroes: Yelena Belova, Bucky Barnes, Red Guardian, Ghost, Taskmaster y John Walker. Despues de verse atrapados en una trampa mortal urdida por Valentina Allegra de Fontaine, estos marginados deben embarcarse en una peligrosa mision que les obligara a enfrentarse a los recovecos mas oscuros', '/img/portada/thunderbolts.jpg', '/img/slider/thunderbotls.webp', 90),
	(6, 'Confidencial', 'Fascinante drama de espionaje sobre los legendarios agentes de inteligencia George Woodhouse y su amada esposa Kathryn. Cuando surgen sospechas de que Kathryn ha podido traicionar a la nacion, George debera afrontar el reto definitivo: elegir entre lealtad al pais o a su matrimonio.', '/img/portada/confidential.jpg', '/img/slider/Confidencial.webp', 93);

INSERT INTO `seats` (`id`, `idPeli`, `idUser`, `state`) VALUES
	(1, 1, NULL, 'disponible'),
	(2, 1, 2, 'ocupado'),
	(3, 1, 2, 'ocupado'),
	(4, 1, NULL, 'disponible'),
	(5, 1, NULL, 'disponible'),
	(6, 1, NULL, 'disponible'),
	(7, 1, NULL, 'disponible'),
	(8, 1, NULL, 'disponible'),
	(9, 1, NULL, 'disponible'),
	(10, 1, NULL, 'disponible'),
	(11, 1, NULL, 'disponible'),
	(12, 1, NULL, 'disponible'),
	(13, 1, NULL, 'disponible'),
	(14, 1, NULL, 'disponible'),
	(15, 1, NULL, 'disponible'),
	(16, 1, 1, 'ocupado'),
	(17, 1, 1, 'ocupado'),
	(18, 1, 1, 'ocupado'),
	(19, 1, NULL, 'disponible'),
	(20, 1, NULL, 'disponible'),
	(21, 2, 1, 'ocupado'),
	(22, 2, 2, 'ocupado'),
	(23, 2, 2, 'ocupado'),
	(24, 2, 2, 'ocupado'),
	(25, 2, 2, 'ocupado'),
	(26, 2, 2, 'ocupado'),
	(27, 2, 2, 'ocupado'),
	(28, 2, 2, 'ocupado'),
	(29, 2, 2, 'ocupado'),
	(30, 2, 2, 'ocupado'),
	(31, 2, 2, 'ocupado'),
	(32, 2, NULL, 'disponible'),
	(33, 2, 2, 'ocupado'),
	(34, 2, 2, 'ocupado'),
	(35, 2, NULL, 'disponible'),
	(36, 2, NULL, 'disponible'),
	(37, 2, NULL, 'disponible'),
	(38, 2, NULL, 'disponible'),
	(39, 2, NULL, 'disponible'),
	(40, 2, 2, 'ocupado'),
	(41, 3, 2, 'ocupado'),
	(42, 3, NULL, 'disponible'),
	(43, 3, 2, 'ocupado'),
	(44, 3, NULL, 'disponible'),
	(45, 3, 4, 'ocupado'),
	(46, 3, NULL, 'disponible'),
	(47, 3, 2, 'ocupado'),
	(48, 3, NULL, 'disponible'),
	(49, 3, NULL, 'disponible'),
	(50, 3, NULL, 'disponible'),
	(51, 3, 2, 'ocupado'),
	(52, 3, NULL, 'disponible'),
	(53, 3, NULL, 'disponible'),
	(54, 3, NULL, 'disponible'),
	(55, 3, 2, 'ocupado'),
	(56, 3, NULL, 'disponible'),
	(57, 3, 2, 'ocupado'),
	(58, 3, 2, 'ocupado'),
	(59, 3, NULL, 'disponible'),
	(60, 3, 2, 'ocupado'),
	(61, 4, 2, 'ocupado'),
	(62, 4, 2, 'ocupado'),
	(63, 4, 2, 'ocupado'),
	(64, 4, NULL, 'disponible'),
	(65, 4, NULL, 'disponible'),
	(66, 4, NULL, 'disponible'),
	(67, 4, NULL, 'disponible'),
	(68, 4, NULL, 'disponible'),
	(69, 4, NULL, 'disponible'),
	(70, 4, NULL, 'disponible'),
	(71, 4, NULL, 'disponible'),
	(72, 4, NULL, 'disponible'),
	(73, 4, NULL, 'disponible'),
	(74, 4, NULL, 'disponible'),
	(75, 4, NULL, 'disponible'),
	(76, 4, NULL, 'disponible'),
	(77, 4, NULL, 'disponible'),
	(78, 4, NULL, 'disponible'),
	(79, 4, NULL, 'disponible'),
	(80, 4, NULL, 'disponible'),
	(81, 5, 2, 'ocupado'),
	(82, 5, 2, 'ocupado'),
	(83, 5, NULL, 'disponible'),
	(84, 5, NULL, 'disponible'),
	(85, 5, NULL, 'disponible'),
	(86, 5, NULL, 'disponible'),
	(87, 5, NULL, 'disponible'),
	(88, 5, NULL, 'disponible'),
	(89, 5, NULL, 'disponible'),
	(90, 5, NULL, 'disponible'),
	(91, 5, NULL, 'disponible'),
	(92, 5, NULL, 'disponible'),
	(93, 5, NULL, 'disponible'),
	(94, 5, NULL, 'disponible'),
	(95, 5, NULL, 'disponible'),
	(96, 5, NULL, 'disponible'),
	(97, 5, NULL, 'disponible'),
	(98, 5, NULL, 'disponible'),
	(99, 5, NULL, 'disponible'),
	(100, 5, NULL, 'disponible'),
	(101, 6, NULL, 'disponible'),
	(102, 6, NULL, 'disponible'),
	(103, 6, NULL, 'disponible'),
	(104, 6, NULL, 'disponible'),
	(105, 6, NULL, 'disponible'),
	(106, 6, NULL, 'disponible'),
	(107, 6, NULL, 'disponible'),
	(108, 6, NULL, 'disponible'),
	(109, 6, NULL, 'disponible'),
	(110, 6, NULL, 'disponible'),
	(111, 6, NULL, 'disponible'),
	(112, 6, NULL, 'disponible'),
	(113, 6, NULL, 'disponible'),
	(114, 6, NULL, 'disponible'),
	(115, 6, NULL, 'disponible'),
	(116, 6, NULL, 'disponible'),
	(117, 6, NULL, 'disponible'),
	(118, 6, NULL, 'disponible'),
	(119, 6, NULL, 'disponible'),
	(120, 6, NULL, 'disponible');

INSERT INTO `comments` (`id`, `user_id`, `movie_id`, `description`, `date`) VALUES
	(1, 1, 1, 'Excelente pelicula, me gusto mucho la trama y los efectos especiales.', '2024-05-01 14:30:00'),
	(2, 2, 3, 'Muy divertida para ver en familia, los ninos la disfrutaron bastante.', '2024-05-02 10:15:00'),
	(3, 3, 2, 'Un poco aterradora, pero muy bien hecha. Recomendable.', '2024-05-03 18:45:00'),
	(4, 4, 4, 'Buena ambientacion historica, pero algo lenta en algunas partes.', '2024-05-04 16:20:00'),
	(5, 5, 6, 'Intrigante y bien actuada. Me mantuvo interesado hasta el final.', '2024-05-05 12:05:00');