CREATE TABLE accounts (
	id serial not null PRIMARY KEY,
	email character varying(30) not null,
	password character varying(256) not null,
	phone_number character varying(20)
);

CREATE TABLE users (
	id int not null PRIMARY KEY,
	name character varying(20) not null,
	birthdate bigint not null,
	passion character varying(150) not null,
	gender character varying(30),
	description character varying(500),
	job_title character varying(20),
	company character varying(20),
	school character varying(50),
	anthem character varying(250),
	sexual_orientation character varying(30),
	FOREIGN KEY(id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE searches (
	id int not null PRIMARY KEY,
	max_distance int CHECK (max_distance <= 150),
	looking_for character varying(15),
	min_age int CHECK(min_age >= 18),
	max_age int CHECK((max_age != min_age) AND (max_age > min_age)),
	global boolean,
	status boolean,
	FOREIGN KEY(id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE public.pictures (
	id serial not null PRIMARY KEY,
	user_id int not null,
	upload_date bigint not null,
	route character varying(10485760) not null,
	FOREIGN KEY(user_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE public.matches (
	id serial not null PRIMARY KEY,
	user1_id int not null,
	user2_id int not null,
	date bigint not null,
	FOREIGN KEY(user1_id) REFERENCES accounts(id) ON DELETE CASCADE,
	FOREIGN KEY(user2_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE public.likes (
	id serial not null PRIMARY KEY,
	owner_id int not null,
	receiver_id int not null,
	FOREIGN KEY(owner_id) REFERENCES accounts(id) ON DELETE CASCADE,
	FOREIGN KEY(receiver_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE public.dislikes (
	id serial not null PRIMARY KEY,
	owner_id int not null,
	receiver_id int not null,
	date bigint not null,
	FOREIGN KEY(owner_id) REFERENCES accounts(id) ON DELETE CASCADE,
	FOREIGN KEY(receiver_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE FUNCTION create_searches() RETURNS TRIGGER AS $$
	BEGIN
		INSERT INTO searches (id, max_distance, looking_for, min_age, max_age, global, status) 
		VALUES 
		(NEW.id, 50, 'Everyone', 18, 100, false, true);
		RETURN NEW;
			
	END;
	$$ LANGUAGE plpgsql;

CREATE TRIGGER create_searches_trigger
	AFTER INSERT ON accounts
	FOR EACH ROW
		EXECUTE FUNCTION create_searches();