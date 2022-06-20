INSERT INTO department(department_name)
VALUES 
    ('Marketing'),
    ('Operations'),
    ('Sales');

INSERT INTO roles (role_title, role_salary, department_id)
VALUES 
    ('Manager', '75000', 1),
    ('Assistant Manager', '50000', 2),
    ('Supervisor', '30000', 3),
    ('Employee', '25000', 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Bob', 'Bobbafer', 1, NULL),
    ('Bobbafina', 'Bobbafer', 2, 1),
    ('Bobbafet', 'Bubba', 3, 1),