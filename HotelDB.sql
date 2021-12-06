toc.dat                                                                                             0000600 0004000 0002000 00000020640 14153312153 0014437 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP           )                y            HotelDB    14.0    14.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                    0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                    0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                    1262    25280    HotelDB    DATABASE     f   CREATE DATABASE "HotelDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "HotelDB";
                postgres    false         �            1255    25330    befo_date_update()    FUNCTION     �   CREATE FUNCTION public.befo_date_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
  IF NOW() > NEW.date_in AND NOW() < NEW.date_out THEN
  NEW.empty_check = true;
  ELSE
  NEW.empty_check = false;
  END IF;
  RETURN NEW;
  END;
  $$;
 )   DROP FUNCTION public.befo_date_update();
       public          postgres    false         �            1259    25308    build_to_rooms    TABLE     }   CREATE TABLE public.build_to_rooms (
    id integer NOT NULL,
    build_id integer NOT NULL,
    room_id integer NOT NULL
);
 "   DROP TABLE public.build_to_rooms;
       public         heap    postgres    false         �            1259    25307    build_to_rooms_id_seq    SEQUENCE     �   ALTER TABLE public.build_to_rooms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.build_to_rooms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216         �            1259    25297 	   buildings    TABLE     c   CREATE TABLE public.buildings (
    id integer NOT NULL,
    name character varying(3) NOT NULL
);
    DROP TABLE public.buildings;
       public         heap    postgres    false         �            1259    25296    buildings_id_seq    SEQUENCE     �   ALTER TABLE public.buildings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.buildings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214         �            1259    25289    rooms    TABLE     7  CREATE TABLE public.rooms (
    id integer NOT NULL,
    name character varying(5) NOT NULL,
    empty_check boolean DEFAULT false NOT NULL,
    size integer DEFAULT 2 NOT NULL,
    date_in timestamp without time zone,
    date_out timestamp without time zone,
    price_for_day integer DEFAULT 100 NOT NULL
);
    DROP TABLE public.rooms;
       public         heap    postgres    false         �            1259    25288    rooms_id_seq    SEQUENCE     �   ALTER TABLE public.rooms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rooms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212         �            1259    25282    users    TABLE     S  CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(60) NOT NULL,
    last_name character varying(100) NOT NULL,
    login character varying(60) NOT NULL,
    password character varying(70) NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    room_id integer,
    cash integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false         �            1259    25281    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210                   0    25308    build_to_rooms 
   TABLE DATA           ?   COPY public.build_to_rooms (id, build_id, room_id) FROM stdin;
    public          postgres    false    216       3343.dat           0    25297 	   buildings 
   TABLE DATA           -   COPY public.buildings (id, name) FROM stdin;
    public          postgres    false    214       3341.dat           0    25289    rooms 
   TABLE DATA           ^   COPY public.rooms (id, name, empty_check, size, date_in, date_out, price_for_day) FROM stdin;
    public          postgres    false    212       3339.dat 	          0    25282    users 
   TABLE DATA           d   COPY public.users (id, first_name, last_name, login, password, is_admin, room_id, cash) FROM stdin;
    public          postgres    false    210       3337.dat            0    0    build_to_rooms_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.build_to_rooms_id_seq', 41, true);
          public          postgres    false    215                    0    0    buildings_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.buildings_id_seq', 2, true);
          public          postgres    false    213                    0    0    rooms_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.rooms_id_seq', 40, true);
          public          postgres    false    211                    0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 11, true);
          public          postgres    false    209         x           2606    25312 "   build_to_rooms build_to_rooms_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.build_to_rooms
    ADD CONSTRAINT build_to_rooms_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.build_to_rooms DROP CONSTRAINT build_to_rooms_pkey;
       public            postgres    false    216         v           2606    25301    buildings buildings_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.buildings
    ADD CONSTRAINT buildings_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.buildings DROP CONSTRAINT buildings_pkey;
       public            postgres    false    214         t           2606    25295    rooms rooms_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.rooms DROP CONSTRAINT rooms_pkey;
       public            postgres    false    212         r           2606    25324    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210         |           2620    25331    rooms updt_date    TRIGGER     p   CREATE TRIGGER updt_date BEFORE UPDATE ON public.rooms FOR EACH ROW EXECUTE FUNCTION public.befo_date_update();
 (   DROP TRIGGER updt_date ON public.rooms;
       public          postgres    false    217    212         z           2606    25313 +   build_to_rooms build_to_rooms_build_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.build_to_rooms
    ADD CONSTRAINT build_to_rooms_build_id_fkey FOREIGN KEY (build_id) REFERENCES public.buildings(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.build_to_rooms DROP CONSTRAINT build_to_rooms_build_id_fkey;
       public          postgres    false    216    214    3190         {           2606    25318 *   build_to_rooms build_to_rooms_room_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.build_to_rooms
    ADD CONSTRAINT build_to_rooms_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.build_to_rooms DROP CONSTRAINT build_to_rooms_room_id_fkey;
       public          postgres    false    3188    216    212         y           2606    25302    users room_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT room_id FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;
 7   ALTER TABLE ONLY public.users DROP CONSTRAINT room_id;
       public          postgres    false    212    3188    210                                                                                                        3343.dat                                                                                            0000600 0004000 0002000 00000000463 14153312153 0014247 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	1	6
7	1	7
8	1	8
9	1	9
10	1	10
11	1	11
12	1	12
13	1	13
14	1	14
15	1	15
16	1	16
17	1	17
18	1	18
19	1	19
20	1	20
21	2	21
22	2	22
23	2	23
24	2	24
26	2	25
27	2	26
28	2	27
29	2	28
30	2	29
31	2	30
32	2	31
33	2	32
34	2	33
35	2	34
36	2	35
37	2	36
38	2	37
39	2	38
40	2	39
41	2	40
\.


                                                                                                                                                                                                             3341.dat                                                                                            0000600 0004000 0002000 00000000015 14153312153 0014236 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	A
2	B
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   3339.dat                                                                                            0000600 0004000 0002000 00000001574 14153312153 0014260 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	2А	f	2	\N	\N	100
3	3А	f	2	\N	\N	100
4	4А	f	2	\N	\N	100
5	5А	f	2	\N	\N	100
6	6А	f	2	\N	\N	100
7	7А	f	2	\N	\N	100
8	8А	f	2	\N	\N	100
9	9А	f	2	\N	\N	100
10	10А	f	2	\N	\N	100
11	11А	f	2	\N	\N	100
12	12А	f	2	\N	\N	100
13	13А	f	2	\N	\N	100
14	14А	f	2	\N	\N	100
15	15А	f	2	\N	\N	100
16	16А	f	2	\N	\N	100
17	17А	f	2	\N	\N	100
18	18А	f	2	\N	\N	100
19	19А	f	2	\N	\N	100
20	20А	f	2	\N	\N	100
21	1Б	f	2	\N	\N	100
22	2Б	f	2	\N	\N	100
23	3Б	f	2	\N	\N	100
24	4Б	f	2	\N	\N	100
25	5Б	f	2	\N	\N	100
26	6Б	f	2	\N	\N	100
27	7Б	f	2	\N	\N	100
28	8Б	f	2	\N	\N	100
29	9Б	f	2	\N	\N	100
30	10Б	f	2	\N	\N	100
31	11Б	f	3	\N	\N	100
32	12Б	f	3	\N	\N	100
33	13Б	f	3	\N	\N	100
34	14Б	f	3	\N	\N	100
35	15Б	f	1	\N	\N	100
36	16Б	f	1	\N	\N	100
37	17Б	f	1	\N	\N	100
38	18Б	f	4	\N	\N	100
39	19Б	f	4	\N	\N	100
40	20Б	f	2	\N	\N	100
1	1А	f	2	2021-12-02 13:44:56	2021-12-05 22:00:56	100
\.


                                                                                                                                    3337.dat                                                                                            0000600 0004000 0002000 00000000320 14153312153 0014242 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	Олег	Лебедев	admin	$2a$12$cqBoYSmD1BeIjBfT3pWIku3h33WBCMr5fzKjL6d5yU2HEWgRH4NA.	f	\N	0
11	Маша	Власова	Vleshia	$2a$12$5SGl9HjT0/.g5KreYx9c5e3RT2zp5I2.eilIoE5Fvm0ks09DkJKSm	f	\N	0
\.


                                                                                                                                                                                                                                                                                                                restore.sql                                                                                         0000600 0004000 0002000 00000016613 14153312153 0015371 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

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

DROP DATABASE "HotelDB";
--
-- Name: HotelDB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "HotelDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';


ALTER DATABASE "HotelDB" OWNER TO postgres;

\connect "HotelDB"

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
-- Name: befo_date_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.befo_date_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
  IF NOW() > NEW.date_in AND NOW() < NEW.date_out THEN
  NEW.empty_check = true;
  ELSE
  NEW.empty_check = false;
  END IF;
  RETURN NEW;
  END;
  $$;


ALTER FUNCTION public.befo_date_update() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: build_to_rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.build_to_rooms (
    id integer NOT NULL,
    build_id integer NOT NULL,
    room_id integer NOT NULL
);


ALTER TABLE public.build_to_rooms OWNER TO postgres;

--
-- Name: build_to_rooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.build_to_rooms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.build_to_rooms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buildings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.buildings (
    id integer NOT NULL,
    name character varying(3) NOT NULL
);


ALTER TABLE public.buildings OWNER TO postgres;

--
-- Name: buildings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.buildings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.buildings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    id integer NOT NULL,
    name character varying(5) NOT NULL,
    empty_check boolean DEFAULT false NOT NULL,
    size integer DEFAULT 2 NOT NULL,
    date_in timestamp without time zone,
    date_out timestamp without time zone,
    price_for_day integer DEFAULT 100 NOT NULL
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- Name: rooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.rooms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rooms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(60) NOT NULL,
    last_name character varying(100) NOT NULL,
    login character varying(60) NOT NULL,
    password character varying(70) NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    room_id integer,
    cash integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: build_to_rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.build_to_rooms (id, build_id, room_id) FROM stdin;
\.
COPY public.build_to_rooms (id, build_id, room_id) FROM '$$PATH$$/3343.dat';

--
-- Data for Name: buildings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.buildings (id, name) FROM stdin;
\.
COPY public.buildings (id, name) FROM '$$PATH$$/3341.dat';

--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms (id, name, empty_check, size, date_in, date_out, price_for_day) FROM stdin;
\.
COPY public.rooms (id, name, empty_check, size, date_in, date_out, price_for_day) FROM '$$PATH$$/3339.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, login, password, is_admin, room_id, cash) FROM stdin;
\.
COPY public.users (id, first_name, last_name, login, password, is_admin, room_id, cash) FROM '$$PATH$$/3337.dat';

--
-- Name: build_to_rooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.build_to_rooms_id_seq', 41, true);


--
-- Name: buildings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.buildings_id_seq', 2, true);


--
-- Name: rooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooms_id_seq', 40, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: build_to_rooms build_to_rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.build_to_rooms
    ADD CONSTRAINT build_to_rooms_pkey PRIMARY KEY (id);


--
-- Name: buildings buildings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buildings
    ADD CONSTRAINT buildings_pkey PRIMARY KEY (id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: rooms updt_date; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER updt_date BEFORE UPDATE ON public.rooms FOR EACH ROW EXECUTE FUNCTION public.befo_date_update();


--
-- Name: build_to_rooms build_to_rooms_build_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.build_to_rooms
    ADD CONSTRAINT build_to_rooms_build_id_fkey FOREIGN KEY (build_id) REFERENCES public.buildings(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: build_to_rooms build_to_rooms_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.build_to_rooms
    ADD CONSTRAINT build_to_rooms_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users room_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT room_id FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     