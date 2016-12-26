CREATE TABLE rss_url (
    url_id serial PRIMARY KEY,
    title VARCHAR (100),
    url VARCHAR
);

CREATE TABLE article (
	article_id serial PRIMARY KEY,
	contentSnippet VARCHAR,
	guid VARCHAR UNIQUE,
	link VARCHAR,
	title VARCHAR (200),
	category TEXT []
);

CREATE TABLE test_article (
	article_id serial PRIMARY KEY,
	title VARCHAR,
	link VARCHAR UNIQUE,
	description VARCHAR,
	categories VARCHAR (200)[],
	guid TEXT
);


CREATE TABLE tags (
	tag_id serial PRIMARY KEY,
	tag VARCHAR []
);

CREATE TABLE article_tags (

);

INSERT INTO rss_url (title, url) VALUES ('YLD SOFTWARE ENGINEERING BLOG', 'https://blog.yld.io/rss/'),
('First Site Guide', 'https://feeds.feedburner.com/firstsiteguide'),
('Scotch', 'https://scotch.io/feed'),
('Stack Abuse', 'http://stackabuse.com/rss/'),
('Michael Herman', 'http://mherman.org/atom.xml'),
('Up Labs Blog', 'https://blog.uplabs.com/feed'),
('Up Labs', 'https://www.uplabs.com/rss'),
('Toptal', 'https://www.toptal.com/blog.rss'),
('Sitepoint', 'https://www.sitepoint.com/feed/'),
('Tuts Plus', 'https://tutorials.tutsplus.com/posts.atom'),
('A List Apart', 'http://alistapart.com/main/feed'),
('Codrops Tutorials', 'https://tympanus.net/codrops/category/tutorials/feed/'),
('Codrops Playground', 'https://tympanus.net/codrops/category/playground/feed/'),
('Codrops Blueprints', 'https://tympanus.net/codrops/category/blueprints/feed/'),
('Rising Stack Engineering', 'https://blog.risingstack.com/rss/'),
('CSS Weekly', 'https://feeds.feedburner.com/CSS-Weekly'),
('CSS Tricks', 'https://feeds.feedburner.com/CssTricks'),
('CSS Wizardry', 'https://feeds.feedburner.com/csswizardrycom'),
('Designmodo', 'https://feeds.feedburner.com/designmodo')
;

--INSERT INTO article (contentSnippet, guid, link, title, category)

INSERT INTO test_article (title, link, description, categories, guid) VALUES ('Server-Side Rendering in Angular 2 with Angular Universal', 'https://scotch.io/tutorials/server…n-angular-2-with-angular-universal', '<img width=\"1200\" height…ls.</p>\n<p>Thank you!</p>', '{Tutorials,angular2,angularJS}', 'https://scotch.io/bar-talk/server-…n-angular-2-with-angular-universal/789'),
('Node.js databases: Using Redis for fun and profit', 'https://blog.yld.io/2016/11/…ng-redis-for-fun-and-profit/', 'Redis is an open-source…lues are strings, but', '{node.js,javascript,databases,redis}', 'https://blog.yld.io/2016/11/…ng-redis-for-fun-and-profit/67893'),
('HTTP vs HTTPS', 'http://feedproxy.google.com/~r/firstsiteguide/~3/uPKqW-ZZRbs/', '<p>&nbsp;</p>\n<p style=\"…extarea><br />\n&nbsp;</p>', '{HTTP,HTTPS,routing,server,backend,Cheatsheets}', 'http://feedproxy.google.com/~r/firstsiteguide/~3/uPKqW-ZZRbs/4421/8908709'),
('Vector Image Creation and Editing', 'http://feedproxy.google.com/~r/firstsiteguide/~3/jYMwB4HXMv8/', '<p>&nbsp;</p>\n<p style=\"…extarea><br />\n&nbsp;</p>', '{Cheatsheets,design}', 'https://firstsiteguide.com/?p=18249/89032'),
('Social Media Image Sizes', 'https://firstsiteguide.com/s…al-media-images-cheat-sheet/', '<p>&nbsp;</p>\n<p style=\"text-ali…m</a></textarea><br />\n&nbsp;</p>', '{Cheat sheets}', '//firstsiteguide.com/?p=17973'),
('Javascript Cheat Sheet', 'https://firstsiteguide.com/javascript-cheat-sheet/', '<p>So, you want to know a thing or…rst Site Guide</a>.</textarea></p>', '{Cheat sheets}', '//firstsiteguide.com/?p=17614'),
('Accessibility Whack-A-Mole', 'http://alistapart.com/article/accessibility-whack-a-mole', '<p>I don’t believe in perf…n Toolkit</a></li>\n</ul>', '{Typography,Web,Fonts,Design,UX,Accessibility}', 'http://alistapart.com/article/accessibility-whack-a-mole/89302'),
('Block Reveal Effects', 'https://tympanus.net/codrops/2016/12/21/block-reveal-effects/', '<p>Ideas for revealing content in …us.net/codrops\">Codrops</a>.</p>', '{Playground,animation,block,effect,reveal,CSS,Design}', 'http://alistapart.com/article/accessibility-whack-a-mole/jio'),
('Cubes Advent Calendar', 'https://tympanus.net/codrops/2016/11/09/cubes-advent-calendar/', '<p>A 3D cubes Advent calendar with…us.net/codrops\">Codrops</a>.</p>', '{Playground,3d,tutorial,CSS,design,animation,calendar,cube,layout,perspective}', 'http://tympanus.net/codrops/?p=28603'),
('Build a Realtime Chat Server With Go and WebSockets', 'https://scotch.io/bar-talk/build-a…hat-server-with-go-and-websockets', '<img width=\"1200\" height=\"600\"…ions using WebSockets and Go.</p>', '{tutorial,go,html5,javascript,vue.js}', 'https://scotch.io/bar-talk/build-a…hat-server-with-go-and-websockets/8980'),
('Create a MEAN app with Angular 2 and Docker Compose', '', '<img width=\"1147\" height=\"551\"…this in the another article. </p>', '{Tutorials,angular2,angularJS,docker,MEAN}', 'https://scotch.io/bar-talk/create-…with-angular-2-and-docker-compose/79'),
('Component Inheritance in Angular 2', 'https://scotch.io/tutorials/component-inheritance-in-angular-2', '<img width=\"1200\" height=\"600\"…w features in Angular 2.3</a></p>', '{Tutorials,angular2,angularJS,javascript,typescript}', 'https://scotch.io/bar-talk/component-inheritance-in-angular-2/678');

DROP TABLE rss_url;

DROP TABLE article;

DROP TABLE users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(200) UNIQUE NOT NULL,
  clearance_level INT NOT NULL DEFAULT 0
);

INSERT INTO users (email, clearance_level)
VALUES ('andy.wolff@gmail.com', 5);
