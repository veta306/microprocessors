-- Create Manufacturers Table
CREATE TABLE Manufacturers (
    manufacturer_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Create Types Table
CREATE TABLE Types (
    type_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Create Sockets Table
CREATE TABLE Sockets (
    socket_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Create iGPUs Table
CREATE TABLE iGPUs (
    igpu_id SERIAL PRIMARY KEY,
    model VARCHAR(255),
    base_clock FLOAT,
    boost_clock FLOAT,
    flops FLOAT
);

-- Create Microprocessors Table
CREATE TABLE Microprocessors (
    microprocessor_id SERIAL PRIMARY KEY,
    model VARCHAR(255),
    manufacturer_id INT REFERENCES Manufacturers(manufacturer_id) ON DELETE CASCADE,
    igpu_id INT REFERENCES iGPUs(igpu_id) ON DELETE CASCADE,
    type_id INT REFERENCES Types(type_id) ON DELETE CASCADE,
    socket_id INT REFERENCES Sockets(socket_id) ON DELETE CASCADE,
    cores INT,
    threads INT,
    base_clock FLOAT,
    boost_clock FLOAT,
    process INT,
    tdp INT,
    released DATE
);

-- Create Reviews Table
CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    microprocessor_id INT REFERENCES Microprocessors(microprocessor_id) ON DELETE CASCADE,
    rating INT
);


-- Add types to Types table
INSERT INTO Types (name) VALUES ('Desktop'), ('Laptop'), ('Server'), ('Mobile');

-- Function to get or insert manufacturer ID
CREATE OR REPLACE FUNCTION get_or_insert_manufacturer(manufacturer_name VARCHAR(255))
RETURNS INT AS $$
DECLARE
    return_id INT;
BEGIN
    -- Check if manufacturer exists
    SELECT manufacturer_id INTO return_id FROM Manufacturers WHERE name = manufacturer_name;

    -- If manufacturer doesn't exist, insert it
    IF return_id IS NULL THEN
        INSERT INTO Manufacturers (name) VALUES (manufacturer_name) RETURNING manufacturer_id INTO return_id;
    END IF;

    RETURN return_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get or insert iGPU ID
CREATE OR REPLACE FUNCTION get_or_insert_igpu(input_model VARCHAR(255), input_base_clock FLOAT, input_boost_clock FLOAT, input_flops FLOAT)
RETURNS INT AS $$
DECLARE
    return_id INT;
BEGIN
    -- Check if iGPU exists
    SELECT igpu_id INTO return_id FROM iGPUs WHERE model = input_model AND base_clock = input_base_clock AND boost_clock = input_boost_clock AND flops = input_flops;

    -- If iGPU doesn't exist, insert it
    IF return_id IS NULL THEN
        INSERT INTO iGPUs (model, base_clock, boost_clock, flops) VALUES (input_model, input_base_clock, input_boost_clock, input_flops) RETURNING igpu_id INTO return_id;
    END IF;

    RETURN return_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get or insert socket ID
CREATE OR REPLACE FUNCTION get_or_insert_socket(socket_name VARCHAR(255))
RETURNS INT AS $$
DECLARE
    return_id INT;
BEGIN
    -- Check if socket exists
    SELECT socket_id INTO return_id FROM Sockets WHERE name = socket_name;

    -- If socket doesn't exist, insert it
    IF return_id IS NULL THEN
        INSERT INTO Sockets (name) VALUES (socket_name) RETURNING socket_id INTO return_id;
    END IF;

    RETURN return_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get type ID
CREATE OR REPLACE FUNCTION get_type_id(type_name VARCHAR(255))
RETURNS INT AS $$
DECLARE
    return_id INT;
BEGIN
    -- Get type ID
    SELECT type_id INTO return_id FROM Types WHERE name = type_name;

    RETURN return_id;
END;
$$ LANGUAGE plpgsql;

INSERT INTO Microprocessors (model, manufacturer_id, igpu_id, type_id, socket_id, cores, threads, base_clock, boost_clock, process, tdp, released)
VALUES 
('Intel Core i9-11900K',
 (SELECT get_or_insert_manufacturer('Intel')),
 (SELECT get_or_insert_igpu('Intel UHD Graphics 750', 1, 2, 350)),
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('LGA 1200')),
 8, 16, 3.5, 5.3, 14, 125, '2021-03-16'),
 
('AMD Ryzen 9 5900X',
 (SELECT get_or_insert_manufacturer('AMD')),
 NULL,
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('AM4')),
 12, 24, 3.7, 4.8, 7, 105, '2020-11-05'),

('Intel Core i7-11700K',
 (SELECT get_or_insert_manufacturer('Intel')),
 (SELECT get_or_insert_igpu('Intel UHD Graphics 750', 1, 2, 350)),
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('LGA 1200')),
 8, 16, 3.6, 5, 14, 125, '2021-03-16'),

('AMD Ryzen 5 5600X',
 (SELECT get_or_insert_manufacturer('AMD')),
 NULL,
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('AM4')),
 6, 12, 3.7, 4.6, 7, 65, '2020-11-05'),

('Intel Core i5-11600K',
 (SELECT get_or_insert_manufacturer('Intel')),
 (SELECT get_or_insert_igpu('Intel UHD Graphics 750', 1, 2, 350)),
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('LGA 1200')),
 6, 12, 3.9, 4.9, 14, 125, '2021-03-16'),

('AMD Ryzen 7 5800X',
 (SELECT get_or_insert_manufacturer('AMD')),
 NULL,
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('AM4')),
 8, 16, 3.8, 4.7, 7, 105, '2020-11-05'),

('Intel Core i9-10900K',
 (SELECT get_or_insert_manufacturer('Intel')),
 (SELECT get_or_insert_igpu('Intel UHD Graphics 630', 1, 2, 350)),
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('LGA 1200')),
 10, 20, 3.7, 5.3, 14, 125, '2020-05-20'),

('AMD Ryzen 9 5950X',
 (SELECT get_or_insert_manufacturer('AMD')),
 NULL,
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('AM4')),
 16, 32, 3.4, 4.9, 7, 105, '2020-11-05'),

('Intel Core i3-10100',
 (SELECT get_or_insert_manufacturer('Intel')),
 (SELECT get_or_insert_igpu('Intel UHD Graphics 630', 1, 2, 350)),
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('LGA 1200')),
 4, 8, 3.6, 4.3, 14, 65, '2020-05-20'),

('AMD Ryzen 5 3600',
 (SELECT get_or_insert_manufacturer('AMD')),
 NULL,
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('AM4')),
 6, 12, 3.6, 4.2, 7, 65, '2019-07-07');

INSERT INTO Microprocessors (model, manufacturer_id, igpu_id, type_id, socket_id, cores, threads, base_clock, boost_clock, process, tdp, released)
VALUES 
('AMD Ryzen 7 5800H',
 (SELECT get_or_insert_manufacturer('AMD')),
 NULL,
 (SELECT get_type_id('Laptop')),
 (SELECT get_or_insert_socket('FP6')),
 8, 16, 3.2, 4.4, 7, 45, '2021-01-12'),

('Intel Core i7-1165G7',
 (SELECT get_or_insert_manufacturer('Intel')),
 (SELECT get_or_insert_igpu('Intel Iris Xe Graphics', 1, 2, 300)),
 (SELECT get_type_id('Laptop')),
 (SELECT get_or_insert_socket('BGA 1449')),
 4, 8, 2.8, 4.7, 10, 28, '2020-09-01'),

('AMD Ryzen 9 5950HX',
 (SELECT get_or_insert_manufacturer('AMD')),
 NULL,
 (SELECT get_type_id('Laptop')),
 (SELECT get_or_insert_socket('FP6')),
 8, 16, 3.0, 4.6, 7, 45, '2021-01-12'),

('Apple M1',
 (SELECT get_or_insert_manufacturer('Apple')),
 NULL,
 (SELECT get_type_id('Mobile')),
 (SELECT get_or_insert_socket('BGA 1370')),
 8, 8, 3.2, 3.8, 5, 10, '2020-11-10'),

('Qualcomm Snapdragon 888',
 (SELECT get_or_insert_manufacturer('Qualcomm')),
 NULL,
 (SELECT get_type_id('Mobile')),
 (SELECT get_or_insert_socket('BGA 685')),
 8, 8, 2.84, 2.84, 5, 5, '2020-12-01'),

('Intel Xeon Platinum 8284M',
 (SELECT get_or_insert_manufacturer('Intel')),
 NULL,
 (SELECT get_type_id('Server')),
 (SELECT get_or_insert_socket('BGA 5903')),
 28, 56, 2.7, 4.0, 14, 240, '2019-04-02'),

('AMD EPYC 7742',
 (SELECT get_or_insert_manufacturer('AMD')),
 NULL,
 (SELECT get_type_id('Server')),
 (SELECT get_or_insert_socket('SP3')),
 64, 128, 2.25, 3.4, 7, 225, '2019-08-07'),

('Intel Core i9-10900T',
 (SELECT get_or_insert_manufacturer('Intel')),
 (SELECT get_or_insert_igpu('Intel UHD Graphics 630', 1, 2, 350)),
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('LGA 1200')),
 10, 20, 1.9, 4.6, 14, 35, '2020-05-20'),

('AMD Ryzen 3 5300G',
 (SELECT get_or_insert_manufacturer('AMD')),
 (SELECT get_or_insert_igpu('AMD Radeon Graphics', 3, 4, 200)),
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('AM4')),
 4, 8, 4.0, 4.2, 7, 65, '2021-06-01'),

('Intel Pentium Silver J5040',
 (SELECT get_or_insert_manufacturer('Intel')),
 (SELECT get_or_insert_igpu('Intel UHD Graphics 605', 1, 2, 250)),
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('FCBGA1090')),
 4, 4, 2.0, 3.2, 14, 10, '2020-09-01');

INSERT INTO Microprocessors (model, manufacturer_id, igpu_id, type_id, socket_id, cores, threads, base_clock, boost_clock, process, tdp, released)
VALUES 
('AMD Ryzen 5 5600G',
 (SELECT get_or_insert_manufacturer('AMD')),
 (SELECT get_or_insert_igpu('AMD Radeon Graphics', 3, 4, 200)),
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('AM4')),
 6, 12, 3.9, 4.4, 7, 65, '2021-07-01'),

('Intel Core i5-11400F',
 (SELECT get_or_insert_manufacturer('Intel')),
 NULL,
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('LGA 1200')),
 6, 12, 2.6, 4.4, 14, 65, '2021-03-30'),

('AMD Ryzen 9 5900HX',
 (SELECT get_or_insert_manufacturer('AMD')),
 NULL,
 (SELECT get_type_id('Laptop')),
 (SELECT get_or_insert_socket('FP6')),
 8, 16, 3.3, 4.6, 7, 45, '2021-01-12'),

('Apple M1 Pro',
 (SELECT get_or_insert_manufacturer('Apple')),
 NULL,
 (SELECT get_type_id('Mobile')),
 (SELECT get_or_insert_socket('BGA 1370')),
 10, 10, 3.2, 3.7, 5, 35, '2021-10-18'),

('Qualcomm Snapdragon 870',
 (SELECT get_or_insert_manufacturer('Qualcomm')),
 NULL,
 (SELECT get_type_id('Mobile')),
 (SELECT get_or_insert_socket('BGA 684')),
 8, 8, 3.2, 3.2, 7, 25, '2021-01-19'),

('Intel Xeon E-2288G',
 (SELECT get_or_insert_manufacturer('Intel')),
 NULL,
 (SELECT get_type_id('Server')),
 (SELECT get_or_insert_socket('LGA 1200')),
 8, 16, 3.7, 5.0, 14, 95, '2019-04-02'),

('AMD EPYC 7262',
 (SELECT get_or_insert_manufacturer('AMD')),
 NULL,
 (SELECT get_type_id('Server')),
 (SELECT get_or_insert_socket('SP3')),
 8, 16, 3.2, 3.6, 7, 155, '2019-08-07'),

('Intel Core i7-11700K',
 (SELECT get_or_insert_manufacturer('Intel')),
 (SELECT get_or_insert_igpu('Intel UHD Graphics 750', 1, 2, 400)),
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('LGA 1200')),
 8, 16, 3.6, 5.0, 14, 125, '2021-03-16'),

('AMD Ryzen 7 5800X',
 (SELECT get_or_insert_manufacturer('AMD')),
 NULL,
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('AM4')),
 8, 16, 3.8, 4.7, 7, 105, '2020-11-05'),

('Intel Core i9-11900K',
 (SELECT get_or_insert_manufacturer('Intel')),
 (SELECT get_or_insert_igpu('Intel UHD Graphics 750', 1, 2, 450)),
 (SELECT get_type_id('Desktop')),
 (SELECT get_or_insert_socket('LGA 1200')),
 8, 16, 3.5, 5.3, 14, 125, '2021-03-16');
