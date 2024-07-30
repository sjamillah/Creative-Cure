CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(15),
  lastname VARCHAR(30),
  username VARCHAR(30) UNIQUE,
  phone VARCHAR(10) UNIQUE,
  email VARCHAR(30) UNIQUE,
  userType ENUM('patient', 'therapist'),
  yearsExperience INT,
  sessionCost DECIMAL(10, 2),
  password VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
