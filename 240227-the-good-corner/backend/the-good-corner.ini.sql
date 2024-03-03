-- SQLite
DROP TABLE ads;

CREATE TABLE IF NOT EXISTS ads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  owner TEXT NOT NULL,
  price INT,
  picture TEXT,
  location TEXT,
  createdAt DATE
) ;

INSERT INTO ads (title, description, owner, price, picture, location, createdAt) VALUES ('iPhone 12', 'Brand new iPhone 12 with 128GB storage', 'John Doe', 1000, 'iphone12.jpg', 'Paris', '2024-02-28'),('Toyota Camry', '2018 Toyota Camry in excellent condition', 'Jane Smith', 15000, 'camry.jpg', 'Paris', '2024-02-28'),('Gaming PC', 'High-performance gaming PC with RTX 3080', 'Mike Johnson', 2500, 'gamingpc.jpg', 'Paris', '2024-02-28'),('Apartment for Rent', 'Spacious 2-bedroom apartment with great amenities', 'Emily Davis', 2000, 'apartment.jpg', 'Paris', '2024-02-28'),('Mountain Bike', 'Specialized mountain bike with full suspension', 'Alex Wilson', 1200, 'mountainbike.jpg', 'Paris', '2024-02-28'),('Designer Handbag', 'Gucci handbag in excellent condition', 'Sarah Thompson', 800, 'handbag.jpg', 'Paris', '2024-02-28'),('Electric Scooter', 'Foldable electric scooter with long battery life', 'Robert Lee', 500, 'scooter.jpg', 'Lyon', '2024-02-28'),('Vintage Vinyl Records', 'Collection of classic vinyl records from the 70s', 'Karen Brown', 300, 'vinylrecords.jpg', 'Lyon', '2024-02-28'),('Fitness Tracker', 'Fitbit fitness tracker with heart rate monitor', 'Michael Wilson', 100, 'fitnesstracker.jpg', 'Lyon', '2024-02-28'),('Dining Table Set', 'Solid wood dining table set with 6 chairs', 'Jennifer Adams', 800, 'diningtable.jpg', 'Lyon', '2024-02-28'),('Digital Camera', 'Canon DSLR camera with multiple lenses', 'David Johnson', 700, 'camera.jpg', 'Lyon', '2024-02-28'),('Baby Stroller', 'Stylish and lightweight baby stroller', 'Jessica Martinez', 200, 'stroller.jpg', 'Lyon', '2024-02-28'),('Home Theater System', 'Complete home theater system with surround sound', 'Daniel Wilson', 1500, 'hometheater.jpg', 'Lyon', '2024-02-28'),('Vintage Guitar', 'Fender Stratocaster electric guitar from the 60s', 'Laura Thompson', 2000, 'guitar.jpg', 'Bordeaux', '2024-02-28'),('Designer Watch', 'Rolex Submariner watch in mint condition', 'Christopher Davis', 5000, 'watch.jpg', 'Bordeaux', '2024-02-28'),('Treadmill', 'High-quality treadmill with adjustable incline', 'Michelle Wilson', 1000, 'treadmill.jpg', 'Bordeaux', '2024-02-28'),('Smart TV', 'Samsung 55-inch 4K Smart TV with HDR', 'Andrew Johnson', 800, 'tv.jpg', 'Bordeaux', '2024-02-28'),('Motorcycle Helmet', 'DOT-certified motorcycle helmet in various colors', 'Emily Wilson', 100, 'helmet.jpg', 'Bordeaux', '2024-02-28'),('Antique Furniture', 'Collection of antique furniture pieces', 'John Thompson', 3000, 'antiquefurniture.jpg', 'Bordeaux', '2024-02-28'),('Wireless Headphones', 'Sony noise-canceling wireless headphones', 'Sarah Johnson', 200, 'headphones.jpg', 'Bordeaux', '2024-02-28');


-- SELECT title, location FROM ads WHERE location="Bordeaux";

-- SELECT * FROM ads;

-- DELETE FROM ads WHERE price>400;

-- UPDATE ads SET price=0 WHERE location="Lyon";

-- SELECT location, AVG(price) FROM ads GROUP BY location;