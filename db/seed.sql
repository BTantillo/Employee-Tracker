/*dept data*/
INSERT INTO department ( name)
VALUES 
('Sales'),
('Finance'),
( 'Engineering'),
( 'Maintenance');

/*role data*/
INSERT INTO role ( title, salary, department_id)
VALUES
('Salesperson', 50000, 1),
( 'Accountant', 70000, 2),
( 'Programmer', 100000, 3),
( 'Technicen', 65000, 4),
( 'Retail-Sales', 75000, 1),
( 'Bookkeeper', 100000, 2),
( 'Developer', 120000, 3),
( 'Tester', 65000, 4);

/*employee data */
INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES
('Derek', 'Jeter', 1, 1),
( 'Alex', 'Rodrigez', 2, NULL),
( 'CC', 'Sabathia', 3, 2),
( 'Aaron', 'Judge', 4, NULL),
( 'Jimmy', 'Crickets', 5, 3),
( 'Jorge', 'Posada', 6, NULL),
( 'Gary', 'Sandchez', 7, 4),
( 'George', 'Steinbrenner', 8, NULL);
