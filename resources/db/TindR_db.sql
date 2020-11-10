CREATE TABLE accounts (
	id serial not null PRIMARY KEY,
	email varchar(30) not null,
	password varchar(256) not null,
	phone_number varchar(20)
);

CREATE TABLE users (
	account_id int not null PRIMARY KEY,
	name varchar(20) not null,
	age int not null,
	passion varchar(150) not null,
	gender varchar(30),
	description varchar(500),
	job_title varchar(20),
	company varchar(20),
	school varchar(50),
	anthem varchar(250),
	sexual_orientation varchar(30),
	global boolean,
	status boolean,
	FOREIGN KEY(account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE searches (
	account_id int not null PRIMARY KEY,
	max_distance int CHECK (max_distance <= 161),
	looking_for varchar(15),
	min_age int CHECK(min_age >= 18),
	max_age int CHECK((max_age != min_age) AND (max_age > min_age)),
	FOREIGN KEY(account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE public.pictures (
	account_id int not null PRIMARY KEY,
	upload_date bigint not null,
	route varchar(300) not null,
	FOREIGN KEY(account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE FUNCTION create_searches() RETURNS TRIGGER AS $$
	BEGIN
		INSERT INTO searches (account_id) VALUES (NEW.id);
		RETURN NEW;
			
	END;
	$$ LANGUAGE plpgsql;

CREATE TRIGGER create_searches_trigger
	AFTER INSERT ON accounts
	FOR EACH ROW
		EXECUTE FUNCTION create_searches();