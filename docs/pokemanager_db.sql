--
-- PostgreSQL database dump
--

\restrict 8bLdwrZ0HrO1YkHQakdCuPFiCdkeJGwK9NLjgKjezRLQ3vSXfB4tN5SdV6BRB0g

-- Dumped from database version 16.15
-- Dumped by pg_dump version 16.15

-- Started on 2026-10-12 04:07:08 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3459 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 843 (class 1247 OID 16456)
-- Name: pokemonrarity; Type: TYPE; Schema: public; Owner: pokemanager
--

CREATE TYPE public.pokemonrarity AS ENUM (
    'Common',
    'Rare',
    'Legendary'
);


ALTER TYPE public.pokemonrarity OWNER TO pokemanager;

--
-- TOC entry 840 (class 1247 OID 16390)
-- Name: pokemontype; Type: TYPE; Schema: public; Owner: pokemanager
--

CREATE TYPE public.pokemontype AS ENUM (
    'Normal',
    'Grass',
    'Fire',
    'Water',
    'Electric',
    'Ice',
    'Fighting',
    'Ground',
    'Poison',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Dark',
    'Steel',
    'Fairy'
);


ALTER TYPE public.pokemontype OWNER TO pokemanager;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16463)
-- Name: pokemons; Type: TABLE; Schema: public; Owner: pokemanager
--

CREATE TABLE public.pokemons (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    type1 public.pokemontype NOT NULL,
    type2 public.pokemontype,
    rarity public.pokemonrarity NOT NULL,
    level integer NOT NULL,
    attack integer NOT NULL,
    defense integer NOT NULL,
    hp integer NOT NULL,
    nickname character varying(255)
);


ALTER TABLE public.pokemons OWNER TO pokemanager;

--
-- TOC entry 3453 (class 0 OID 16463)
-- Dependencies: 215
-- Data for Name: pokemons; Type: TABLE DATA; Schema: public; Owner: pokemanager
--

COPY public.pokemons (id, name, type1, type2, rarity, level, attack, defense, hp, nickname) FROM stdin;
25	Pikachu	Electric	\N	Common	12	35	50	40	\N
\.


--
-- TOC entry 3307 (class 2606 OID 16471)
-- Name: pokemons pokemons_name_key; Type: CONSTRAINT; Schema: public; Owner: pokemanager
--

ALTER TABLE ONLY public.pokemons
    ADD CONSTRAINT pokemons_name_key UNIQUE (name);


--
-- TOC entry 3309 (class 2606 OID 16469)
-- Name: pokemons pokemons_pkey; Type: CONSTRAINT; Schema: public; Owner: pokemanager
--

ALTER TABLE ONLY public.pokemons
    ADD CONSTRAINT pokemons_pkey PRIMARY KEY (id);


-- Completed on 2026-10-12 04:07:09 UTC

--
-- PostgreSQL database dump complete
--

\unrestrict 8bLdwrZ0HrO1YkHQakdCuPFiCdkeJGwK9NLjgKjezRLQ3vSXfB4tN5SdV6BRB0g

