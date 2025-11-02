-- Insert sample sweets
INSERT INTO sweets (name, description, price, quantity, category, image_url) VALUES
('Gulab Jamun', 'Soft, melt-in-your-mouth dough balls soaked in rose-scented sugar syrup', 150.00, 100, 'Traditional', 'https://example.com/images/gulab-jamun.jpg'),
('Rasgulla', 'Spongy milk dumplings soaked in light sugar syrup', 140.00, 80, 'Bengali Sweets', 'https://example.com/images/rasgulla.jpg'),
('Kaju Katli', 'Diamond-shaped cashew fudge with silver coating', 800.00, 50, 'Dry Fruits', 'https://example.com/images/kaju-katli.jpg'),
('Rasmalai', 'Soft cottage cheese dumplings in creamy saffron milk', 200.00, 60, 'Bengali Sweets', 'https://example.com/images/rasmalai.jpg'),
('Milk Peda', 'Traditional Indian milk fudge', 400.00, 70, 'Milk Sweets', 'https://example.com/images/peda.jpg'),
('Besan Ladoo', 'Sweet balls made from gram flour and ghee', 350.00, 90, 'Traditional', 'https://example.com/images/besan-ladoo.jpg'),
('Kheer', 'Rich and creamy rice pudding with dry fruits', 180.00, 40, 'Milk Sweets', 'https://example.com/images/kheer.jpg'),
('Jalebi', 'Crispy, syrup-soaked spiral sweets', 200.00, 75, 'Traditional', 'https://example.com/images/jalebi.jpg');

-- Insert sample order
INSERT INTO orders (customer_name, customer_phone, customer_email, total_amount, order_date, status) VALUES
('John Doe', '1234567890', 'john@example.com', 490.00, datetime('now'), 'CONFIRMED');

-- Insert sample order items
INSERT INTO order_items (order_id, sweet_id, quantity, unit_price, subtotal) VALUES
(1, 1, 2, 150.00, 300.00),
(1, 2, 1, 140.00, 140.00),
(1, 5, 1, 50.00, 50.00);