-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema auction
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema auction
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `auction` DEFAULT CHARACTER SET utf8 ;
USE `auction` ;

-- -----------------------------------------------------
-- Table `auction`.`auctions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `auction`.`auctions` (
  `auc_Id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `start_time` VARCHAR(45) NULL DEFAULT NULL,
  `end_time` VARCHAR(36) NULL DEFAULT NULL,
  `winner_id` VARCHAR(36) NULL DEFAULT NULL,
  `min_bid_value` INT(11) NULL DEFAULT NULL,
  `auc_status` INT(11) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `item_id` VARCHAR(36) NOT NULL,
  `item_quantity` INT(11) NULL DEFAULT NULL,
  `win_bid_value` INT(11) NULL DEFAULT NULL,
  `item_img` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`auc_Id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `auction`.`bids`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `auction`.`bids` (
  `b_Id` VARCHAR(36) NOT NULL,
  `auc_id` VARCHAR(36) NOT NULL,
  `bider_id` VARCHAR(36) NOT NULL,
  `bid_value` INT(11) NOT NULL,
  `bid_time` DATE NOT NULL,
  PRIMARY KEY (`b_Id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `auction`.`inventories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `auction`.`inventories` (
  `inv_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `quantity` INT(11) NOT NULL,
  `image_url` VARCHAR(45) NULL DEFAULT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`inv_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `auction`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `auction`.`users` (
  `uid` VARCHAR(36) NOT NULL,
  `userName` VARCHAR(255) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` TINYINT(1) NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `coins` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE INDEX `uid` (`uid` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
