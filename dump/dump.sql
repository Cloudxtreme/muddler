--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = true;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: muddler; Tablespace: 
--

CREATE TABLE accounts (
    email text NOT NULL,
    password text NOT NULL,
    "character" text
);


ALTER TABLE public.accounts OWNER TO muddler;

--
-- Name: messages_system; Type: TABLE; Schema: public; Owner: muddler; Tablespace: 
--

CREATE TABLE messages_system (
    command text,
    params text,
    lang text,
    text text
);


ALTER TABLE public.messages_system OWNER TO muddler;

--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: muddler
--

INSERT INTO accounts VALUES ('aa@aa.aa', 'undefined', NULL);


--
-- Data for Name: messages_system; Type: TABLE DATA; Schema: public; Owner: muddler
--

INSERT INTO messages_system VALUES ('reg', 'error', 'ru', '<span class="systemMessage">Извините, но данный почтовый ящик уже зарегистрирован. Используйте другой e-mail. Если же вы хотите восстановить пароль, используйте комманду <b>/reg restore &ltemail&gt</b></span>');
INSERT INTO messages_system VALUES ('list', 'none', 'ru', '<b>Список команд:</b><br><b>/list</b> - Эта подсказка.<br><b>/server</b> - Информация о сервере.<br><b>/reg</b> - Регистрация аккаунта.');
INSERT INTO messages_system VALUES ('reg', 'false', 'ru', '<span class="systemMessage">Извините, но вам необходимо ввести существующий e-mail адрес.</span>');


--
-- Name: accounts_email_key; Type: CONSTRAINT; Schema: public; Owner: muddler; Tablespace: 
--

ALTER TABLE ONLY accounts
    ADD CONSTRAINT accounts_email_key UNIQUE (email);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

