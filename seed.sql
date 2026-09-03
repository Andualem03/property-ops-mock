INSERT INTO users (email, password_hash, role) VALUES
  ('admin@calnan-mock.test', '$2b$10$YsIzoPnNk.0RbOCM0i8qEulT7kUaqEx9QGK/qxdFNUuR.zmUAk.3.', 'admin');
-- password for the demo user above is: password123

INSERT INTO properties (name, address, status) VALUES
  ('Maple Court', '12 Maple St', 'occupied'),
  ('Birch Residences', '88 Birch Ave', 'vacant'),
  ('Cedar Heights', '4 Cedar Rd', 'occupied');

INSERT INTO tenants (property_id, name, email, rent_cents) VALUES
  (1, 'J. Alvarez', 'j.alvarez@example.test', 125000),
  (1, 'R. Nguyen', 'r.nguyen@example.test', 98000),
  (3, 'S. Bekele', 's.bekele@example.test', 210000),
  (3, 'T. Okafor', 't.okafor@example.test', 89000);

INSERT INTO maintenance_requests (property_id, description, status) VALUES
  (1, 'Leaking kitchen faucet', 'open'),
  (3, 'Broken hallway light', 'open'),
  (1, 'AC not cooling on 3rd floor', 'in_progress');
