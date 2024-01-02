CREATE TABLE eduzz_teste.products (
    id INT(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NULL,
    value VARCHAR(255) DEFAULT '0' NOT NULL,
    categoryId_FK INT(11) DEFAULT 0 NOT NULL,
    PRIMARY KEY (id)
)