DROP TABLE IF EXIST department;
DROP TABLE IF EXIST role;
DROP TABLE IF EXIST employee;


CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)  NOT NULL
);

CREATE TABLE role ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30)  NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
    manager_id INT NULL
    CONSTRAINT fk_manager FOREIGN KEY (manger_id) REFERENCES employee(id) ON DELETE CASCADE
)