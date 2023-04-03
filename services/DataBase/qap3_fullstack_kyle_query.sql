/* table creation statments */

CREATE TABLE public.author (
	id serial NOT NULL,
    first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
    dob VARCHAR(25) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE public.publisher (
	id serial NOT NULL,
    company_name VARCHAR(50) NOT NULL,
	ceo VARCHAR(50) NOT NULL,
	established VARCHAR(50) NOT NULL,
    number_of_books_published INT,
	PRIMARY KEY (id)
);

CREATE TABLE public."book"
(
	id serial NOT NULL,
	title character varying(25) NOT NULL,
	author_id INT NOT NULL,
	publisher_id INT NOT NULL,
	isbn VARCHAR(15) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (author_id) REFERENCES author(id),
	FOREIGN KEY (publisher_id) REFERENCES publisher(id)
);

CREATE TABLE public."patron"
(
	id serial NOT NULL,
	first_name character varying(50) NOT NULL,
	last_name character varying(50) NOT NULL,
	phone character varying(25) NOT NULL,
	email character varying(50) NOT NULL,
	province_id INT NOT NULL,
	areacode_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (province_id) REFERENCES province(id),
	FOREIGN KEY (areacode_id) REFERENCES areacode(id)
);

CREATE TABLE public.province (
	id serial NOT NULL,
    name character varying(50) NOT NULL,
	capital character varying(50) NOT NULL,
	population INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE public.areacode (
	id serial NOT NULL,
    province_id INT NOT NULL,
	area_code character varying(10) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (province_id) REFERENCES province(id)
);

/* Some insert statements  */

insert into author ( first_name, last_name, dob) values ( 'jk', 'Jacky', '03-02-1960');
insert into author ( first_name, last_name, dob) values ( 'Gary', 'Dove', '09-24-1940');
insert into author ( first_name, last_name, dob) values ( 'Sarah', 'Smith', '11-07-1990');

insert into publisher ( company_name, ceo, established, number_of_books_published) values ( 'Star Books', 'John Snow', '11-07-1940', 113);
insert into publisher ( company_name, ceo, established, number_of_books_published) values ( 'Water Page', 'Kate Que', '01-05-1970', 44);
insert into publisher ( company_name, ceo, established, number_of_books_published) values ( 'Heave CO', 'John Snow', '12-13-1980', 70);

insert into book ( title, author_id, publisher_id, isbn) values ( 'Foggy Day', 1, 1, 'A123');
insert into book ( title, author_id, publisher_id, isbn) values ( 'All Of The Above', 2, 2, 'B123');
insert into book ( title, author_id, publisher_id, isbn) values ( 'Arrow', 3, 3, 'C123');
insert into book ( title, author_id, publisher_id, isbn) values ( 'Water', 1, 3, 'D123');
insert into book ( title, author_id, publisher_id, isbn) values ( 'To Kill A Frog', 2, 1, 'E123');
insert into book ( title, author_id, publisher_id, isbn) values ( 'Farm', 1, 1, 'F123');
insert into book ( title, author_id, publisher_id, isbn) values ( 'Hatch', 3, 1, 'G123');
insert into book ( title, author_id, publisher_id, isbn) values ( 'Forest', 3, 2, 'H123');
insert into book ( title, author_id, publisher_id, isbn) values ( 'Far Away', 2, 1, 'I123');
insert into book ( title, author_id, publisher_id, isbn) values ( 'Living With', 2, 3, 'J123');
insert into book ( title, author_id, publisher_id, isbn) values ( 'Terry Bobean', 1, 2, 'K123');

insert into province ( name, capital, population) values
( 'Alberta', 'Calgary', 1611000),
( 'Alberta', 'Edmonton', 1519000),
( 'British Columbia', 'Vancouver', 2632000),
( 'Ontario', 'Ottawa', 1400000);

insert into areacode ( province_id, area_code) values
( 4, 'S9F7G0'),
( 5, 'Q1F0K6'),
( 5, 'F1F0K6'),
( 6, 'N7N6V9'),
( 7, 'P0P1G0'),
( 7, 'Z0Z1G0');

insert into patron ( first_name, last_name, phone, email, province_id, areacode_id) values ( 'Kyle', 'snow', '(709) 683-6666', 'Ksnow13@yaya.com', 1, 1);
insert into patron ( first_name, last_name, phone, email, province_id, areacode_id) values ( 'Matthew', 'Taylor', '(709) 684-0055', 'mattay88@yaya.com', 1, 1);
insert into patron ( first_name, last_name, phone, email, province_id, areacode_id) values ( 'Tyler', 'Power', '(709) 680-2312', 'Tpow@yaya.com', 2, 2);


/* find all from all tables */

select * from author;
select * from publisher;
select * from book;
select * from patron;
select * from province;
select * from areacode;


/* find all books by a author */

select * from book where author_id = 1;

/* find all books by a publisher*/

select * from book where publisher_id = 1;

/* find all patrons by province */

select * from patron where province_id = 1;

/* find all area codes by province */

select * from areacode where province_id = 7;

/* deletes */

delete from book where id = 13;

/* updates */

update book set title = 'Holes' where id = 22;

/* joins */

/* join books, authors, publishers and show book title the author and publisher */

select b.title, a.first_name, a.last_name, p.company_name from book b , author a , publisher p
where b.author_id = a.id
and b.publisher_id = p.id;

/* show books, authors and publishers from author with id 1 */

select b.title, a.first_name, a.last_name, p.company_name from book b , author a , publisher p
where b.author_id = a.id
and b.publisher_id = p.id
and a.id = 1;

/* show all patrons, the province they are from and the area code */

select pa.first_name, pa.last_name, pr.name, a.area_code from patron pa, province pr, areacode a
where pa.province_id = pr.id
and pa.areacode_id = a.id;

/* show all patrons and and areacode from province with id of 1  */

select pa.first_name, pa.last_name, pr.name, a.area_code from patron pa, province pr, areacode a
where pa.province_id = pr.id
and pa.areacode_id = a.id
and pr.id = 1;


/* shows all provinces and the area codes */

select p.name, a.area_code from province p, areacode a
where a.province_id = p.id;

/* shows a province and the area codes they have, by province id */

select p.name, a.area_code from province p, areacode a
where a.province_id = p.id
and p.id =5;












