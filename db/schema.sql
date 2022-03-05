DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE `new_schema`.`departments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `new_schema`.`roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `salary` DECIMAL NOT NULL,
  `department_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `foreignkey_roles_dept_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `foreignkey_roles_dept`
    FOREIGN KEY (`department_id`)
    REFERENCES `new_schema`.`departments` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);
);

CREATE TABLE `new_schema`.`employees` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `role_id` INT UNSIGNED NOT NULL,
  `manager_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_employees_role`
    FOREIGN KEY (`id`)
    REFERENCES `new_schema`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
);

ALTER TABLE `new_schema`.`employees` 
ADD INDEX `fk_employees_manager_idx` (`manager_id` ASC) VISIBLE;
;
ALTER TABLE `new_schema`.`employees` 
ADD CONSTRAINT `fk_employees_manager`
  FOREIGN KEY (`manager_id`)
  REFERENCES `new_schema`.`employees` (`id`)
  ON DELETE SET NULL
  ON UPDATE NO ACTION;
