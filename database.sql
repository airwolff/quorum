CREATE TABLE rss_url (
    url_id serial PRIMARY KEY,
    title VARCHAR (100),
    url VARCHAR
);

CREATE TABLE article (
	article_id serial PRIMARY KEY,
	title VARCHAR (200),
	link VARCHAR,
	description VARCHAR,
	author VARCHAR (80),
	category TEXT [],
	guid VARCHAR UNIQUE,
	source VARCHAR (200)
);

CREATE TABLE tags (
	tag_id serial PRIMARY KEY,
	tag VARCHAR (100)
);

INSERT INTO rss_url (title, url) VALUES ('tuts plus: web development', 'https://code.tutsplus.com/categories/web-development.atom');

INSERT INTO article (title, link, description, author, category) VALUES ('40 useful APIs for web designers and developers', 'http://www.webdesignerdepot.com/2011/07/40-useful-apis-for-web-designers-and-developers/', 'As developers are well aware, there are hundreds of APIs out there for doing almost anything you could imagine online. Some are better than others, and some are definitely more useful than others.
Below are forty of the most useful APIs out there', 'CAMERON CHAPMAN', '{api, twitter, facebook, maps, flickr, delicious, meme, yahoo, google}');

DROP TABLE rss_url;

DROP TABLE article;
