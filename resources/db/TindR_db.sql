CREATE TABLE public.accounts (
	id serial not null PRIMARY KEY,
	email character varying(30) not null,
	password character varying(256) not null,
	phone_number character varying(20)
);

CREATE TABLE public.users (
	id int not null PRIMARY KEY,
	name character varying(20) not null,
	age int not null,
	passion character varying(150) not null,
	gender character varying(30),
	description character varying(500),
	job_title character varying(20),
	company character varying(20),
	school character varying(50),
	anthem character varying(250),
	sexual_orientation character varying(30),
	global boolean,
	status boolean,
	FOREIGN KEY(id) REFERENCES public.accounts(id) ON DELETE CASCADE
);

CREATE TABLE public.searches (
	id int not null PRIMARY KEY,
	max_distance int CHECK (max_distance <= 161),
	looking_for character varying(15),
	min_age int CHECK(min_age >= 18),
	max_age int CHECK((max_age != min_age) AND (max_age > min_age)),
	FOREIGN KEY(id) REFERENCES public.accounts(id) ON DELETE CASCADE
);

