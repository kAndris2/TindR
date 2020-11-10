CREATE TABLE public.accounts (
	id serial not null PRIMARY KEY,
	email character varying(30) not null,
	password character varying(256) not null,
	phone_number character varying(20)
);

CREATE TABLE public.users (
	account_id int not null PRIMARY KEY,
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
	FOREIGN KEY(account_id) REFERENCES public.accounts(id) ON DELETE CASCADE
);

CREATE TABLE public.searches (
	account_id int not null PRIMARY KEY,
	max_distance int CHECK (max_distance <= 161),
	looking_for character varying(15),
	min_age int CHECK(min_age >= 18),
	max_age int CHECK((max_age != min_age) AND (max_age > min_age)),
	FOREIGN KEY(account_id) REFERENCES public.accounts(id) ON DELETE CASCADE
);

CREATE TABLE public.pictures (
	account_id int not null PRIMARY KEY,
	upload_date bigint not null,
	route character varying(300) not null,
	FOREIGN KEY(account_id) REFERENCES public.accounts(id) ON DELETE CASCADE
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