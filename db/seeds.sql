INSERT INTO department (name) VALUES ('Department1');
INSERT INTO department (name) VALUES ('Department2');

INSERT INTO role (title, salary, department_id) VALUES ('Manager', '85000', '1');
INSERT INTO role (title, salary, department_id) VALUES ('Manager', '75000', '2');
INSERT INTO role (title, salary, department_id) VALUES ('Engineer1', '65000', '1');
INSERT INTO role (title, salary, department_id) VALUES ('Engineer2', '55000', '2');

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', '1', '1');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Doe', '2', '2');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Simon', 'Lane', '3', '1');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Thomas', 'Mills', '4', '2');



