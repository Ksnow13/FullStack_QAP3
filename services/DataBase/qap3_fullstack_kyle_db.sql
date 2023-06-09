PGDMP         :                {           fullstack_qap3_db    15.1    15.1 3    1           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            2           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            3           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            4           1262    17029    fullstack_qap3_db    DATABASE     �   CREATE DATABASE fullstack_qap3_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Canada.1252';
 !   DROP DATABASE fullstack_qap3_db;
                postgres    false            �            1259    17113    areacode    TABLE     �   CREATE TABLE public.areacode (
    id integer NOT NULL,
    province_id integer NOT NULL,
    area_code character varying(10) NOT NULL
);
    DROP TABLE public.areacode;
       public         heap    postgres    false            �            1259    17112    areacode_id_seq    SEQUENCE     �   CREATE SEQUENCE public.areacode_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.areacode_id_seq;
       public          postgres    false    223            5           0    0    areacode_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.areacode_id_seq OWNED BY public.areacode.id;
          public          postgres    false    222            �            1259    17031    author    TABLE     �   CREATE TABLE public.author (
    id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    dob character varying(25) NOT NULL
);
    DROP TABLE public.author;
       public         heap    postgres    false            �            1259    17030    author_id_seq    SEQUENCE     �   CREATE SEQUENCE public.author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.author_id_seq;
       public          postgres    false    215            6           0    0    author_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.author_id_seq OWNED BY public.author.id;
          public          postgres    false    214            �            1259    17045    book    TABLE     �   CREATE TABLE public.book (
    id integer NOT NULL,
    title character varying(25) NOT NULL,
    author_id integer NOT NULL,
    publisher_id integer NOT NULL,
    isbn character varying(15) NOT NULL
);
    DROP TABLE public.book;
       public         heap    postgres    false            �            1259    17044    book_id_seq    SEQUENCE     �   CREATE SEQUENCE public.book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.book_id_seq;
       public          postgres    false    219            7           0    0    book_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.book_id_seq OWNED BY public.book.id;
          public          postgres    false    218            �            1259    17125    patron    TABLE     -  CREATE TABLE public.patron (
    id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    phone character varying(25) NOT NULL,
    email character varying(50) NOT NULL,
    province_id integer NOT NULL,
    areacode_id integer NOT NULL
);
    DROP TABLE public.patron;
       public         heap    postgres    false            �            1259    17124    patron_id_seq    SEQUENCE     �   CREATE SEQUENCE public.patron_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.patron_id_seq;
       public          postgres    false    225            8           0    0    patron_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.patron_id_seq OWNED BY public.patron.id;
          public          postgres    false    224            �            1259    17106    province    TABLE     �   CREATE TABLE public.province (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    capital character varying(50) NOT NULL,
    population integer NOT NULL
);
    DROP TABLE public.province;
       public         heap    postgres    false            �            1259    17105    province_id_seq    SEQUENCE     �   CREATE SEQUENCE public.province_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.province_id_seq;
       public          postgres    false    221            9           0    0    province_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.province_id_seq OWNED BY public.province.id;
          public          postgres    false    220            �            1259    17038 	   publisher    TABLE     �   CREATE TABLE public.publisher (
    id integer NOT NULL,
    company_name character varying(50) NOT NULL,
    ceo character varying(50) NOT NULL,
    established character varying(50) NOT NULL,
    number_of_books_published integer
);
    DROP TABLE public.publisher;
       public         heap    postgres    false            �            1259    17037    publisher_id_seq    SEQUENCE     �   CREATE SEQUENCE public.publisher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.publisher_id_seq;
       public          postgres    false    217            :           0    0    publisher_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.publisher_id_seq OWNED BY public.publisher.id;
          public          postgres    false    216            �           2604    17116    areacode id    DEFAULT     j   ALTER TABLE ONLY public.areacode ALTER COLUMN id SET DEFAULT nextval('public.areacode_id_seq'::regclass);
 :   ALTER TABLE public.areacode ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            ~           2604    17034 	   author id    DEFAULT     f   ALTER TABLE ONLY public.author ALTER COLUMN id SET DEFAULT nextval('public.author_id_seq'::regclass);
 8   ALTER TABLE public.author ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �           2604    17048    book id    DEFAULT     b   ALTER TABLE ONLY public.book ALTER COLUMN id SET DEFAULT nextval('public.book_id_seq'::regclass);
 6   ALTER TABLE public.book ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    17128 	   patron id    DEFAULT     f   ALTER TABLE ONLY public.patron ALTER COLUMN id SET DEFAULT nextval('public.patron_id_seq'::regclass);
 8   ALTER TABLE public.patron ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    17109    province id    DEFAULT     j   ALTER TABLE ONLY public.province ALTER COLUMN id SET DEFAULT nextval('public.province_id_seq'::regclass);
 :   ALTER TABLE public.province ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221                       2604    17041    publisher id    DEFAULT     l   ALTER TABLE ONLY public.publisher ALTER COLUMN id SET DEFAULT nextval('public.publisher_id_seq'::regclass);
 ;   ALTER TABLE public.publisher ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            ,          0    17113    areacode 
   TABLE DATA           >   COPY public.areacode (id, province_id, area_code) FROM stdin;
    public          postgres    false    223   ?8       $          0    17031    author 
   TABLE DATA           @   COPY public.author (id, first_name, last_name, dob) FROM stdin;
    public          postgres    false    215   �8       (          0    17045    book 
   TABLE DATA           H   COPY public.book (id, title, author_id, publisher_id, isbn) FROM stdin;
    public          postgres    false    219   �9       .          0    17125    patron 
   TABLE DATA           c   COPY public.patron (id, first_name, last_name, phone, email, province_id, areacode_id) FROM stdin;
    public          postgres    false    225   �:       *          0    17106    province 
   TABLE DATA           A   COPY public.province (id, name, capital, population) FROM stdin;
    public          postgres    false    221   �;       &          0    17038 	   publisher 
   TABLE DATA           b   COPY public.publisher (id, company_name, ceo, established, number_of_books_published) FROM stdin;
    public          postgres    false    217   �<       ;           0    0    areacode_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.areacode_id_seq', 9, true);
          public          postgres    false    222            <           0    0    author_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.author_id_seq', 16, true);
          public          postgres    false    214            =           0    0    book_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.book_id_seq', 25, true);
          public          postgres    false    218            >           0    0    patron_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.patron_id_seq', 16, true);
          public          postgres    false    224            ?           0    0    province_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.province_id_seq', 7, true);
          public          postgres    false    220            @           0    0    publisher_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.publisher_id_seq', 3, true);
          public          postgres    false    216            �           2606    17118    areacode areacode_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.areacode
    ADD CONSTRAINT areacode_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.areacode DROP CONSTRAINT areacode_pkey;
       public            postgres    false    223            �           2606    17036    author author_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.author DROP CONSTRAINT author_pkey;
       public            postgres    false    215            �           2606    17050    book book_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.book DROP CONSTRAINT book_pkey;
       public            postgres    false    219            �           2606    17130    patron patron_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.patron
    ADD CONSTRAINT patron_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.patron DROP CONSTRAINT patron_pkey;
       public            postgres    false    225            �           2606    17111    province province_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.province
    ADD CONSTRAINT province_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.province DROP CONSTRAINT province_pkey;
       public            postgres    false    221            �           2606    17043    publisher publisher_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.publisher
    ADD CONSTRAINT publisher_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.publisher DROP CONSTRAINT publisher_pkey;
       public            postgres    false    217            �           2606    17119 "   areacode areacode_province_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.areacode
    ADD CONSTRAINT areacode_province_id_fkey FOREIGN KEY (province_id) REFERENCES public.province(id);
 L   ALTER TABLE ONLY public.areacode DROP CONSTRAINT areacode_province_id_fkey;
       public          postgres    false    3211    223    221            �           2606    17051    book book_author_id_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.author(id);
 B   ALTER TABLE ONLY public.book DROP CONSTRAINT book_author_id_fkey;
       public          postgres    false    3205    219    215            �           2606    17056    book book_publisher_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_publisher_id_fkey FOREIGN KEY (publisher_id) REFERENCES public.publisher(id);
 E   ALTER TABLE ONLY public.book DROP CONSTRAINT book_publisher_id_fkey;
       public          postgres    false    3207    219    217            �           2606    17136    patron patron_areacode_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.patron
    ADD CONSTRAINT patron_areacode_id_fkey FOREIGN KEY (areacode_id) REFERENCES public.areacode(id);
 H   ALTER TABLE ONLY public.patron DROP CONSTRAINT patron_areacode_id_fkey;
       public          postgres    false    225    223    3213            �           2606    17131    patron patron_province_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.patron
    ADD CONSTRAINT patron_province_id_fkey FOREIGN KEY (province_id) REFERENCES public.province(id);
 H   ALTER TABLE ONLY public.patron DROP CONSTRAINT patron_province_id_fkey;
       public          postgres    false    225    3211    221            ,   \   x�%�M
� E��}���ʟ
aA$F!�);��(�QWʈ��	6.�\!�XX���;q�駇C���Afx�>����D����      $   �   x�%��j�@�ϣw�"���c�BBr�O�^�b��k��	����A�aF�4���3fpa�ik&��K���Ɩ*�L:�܀n�� Í-S������2��@U8;��Srz�|[�'5.�c�q�`�_W5xO˰&tq~n(-E$�ۚ<n»Ӵt��O�:^k���X�y'��������+��WvO�w�ʯo������G�DI      (   �   x���N�0������i�rLIE�qqaI"�1rB����W{��ٟ�ʷ��K��p�Ʀ�"�����t~�W��*��"�ߐr=D����x6E�����7�
��I�Ǩd�\�ȝ*�7ع���A�:�-�	4�L,v����ڏ�>�s�4œp��BXt���F^`�a��_HO7�Yǧh���5���$'�%k�:Т�n��$՛�f8�.���I6��6(GE�$ʲO?Є���f{�>�R���O�      .   Q  x�UQMo�0=���G85_Mr�`b�:�i���.��R-mP���hW�������g#(�����f<��8$�B@qI"�{�բ�- @��:���Ryc�D�I�2m@��?�@T��^�(i�	�Pm+ǀ#
��`uP{��®�f�����I�`��6�USo!DSF<j�׶��z&��i4<)w�)�	�]s���nUc�$8��:4/�1f��1�<�e*ŀ�FA�"`i�[�scv��X�汔2	O`�����Ս���N�`�t���q�Jǁ����	!�%R:`�/����u>�sM�5�_�eƠ
���}.�(�(�C      *   �   x�u�1�0���Wdr_��v��"b��奍6�&�&��d��[n�ᬗ�On����'R���яnĢ�5pIZ��[���Y����.FZPnr���U:D�����B�R��0L�E� Kl2U�&�y䭷iR��F�����y��wy_3�>�U<D      &   k   x�3�.I,Rp���.�����S��/�44�50�5�41�0�2�O,I-RHLO��2KS9�jL�j�8ML��9=R�R����1�54*�0�47������ ��K     