CREATE TABLE "chuva" (
	"id_chuva"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	"cidade"	TEXT NOT NULL,
	"data"	TEXT NOT NULL UNIQUE,
	"mm"	REAL NOT NULL
);

CREATE TABLE "subestacoes" (
	"id_subestacao"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	"sigla"	TEXT UNIQUE,
	"nome"	TEXT UNIQUE,
	"cidade"	TEXT
);

CREATE TABLE "equipamentos" (
	"id_equipamento"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	"codigo"	TEXT NOT NULL UNIQUE,
	"tipo"	TEXT NOT NULL,
	"fase"	TEXT NOT NULL,
	"ox"	REAL NOT NULL,
	"oy"	REAL NOT NULL,
	"clientes"	INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "ocorrencias" (
	"id_ocorrencia"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	"equipamento"	TEXT NOT NULL,
	"alimentador"	TEXT NOT NULL,
	"inicio"	TEXT NOT NULL,
	"fim"	TEXT NOT NULL,
	"tipo_regiao"	TEXT NOT NULL,
	"descricao"	TEXT NOT NULL,
	"chi"	REAL NOT NULL,
	"ci"	INTEGER NOT NULL,
	"cidade"	TEXT NOT NULL,
	"gerencia"	TEXT NOT NULL,
	"supervisor"	TEXT NOT NULL,
	"regiao"	TEXT NOT NULL
);

CREATE TABLE "unidades" (
	"id_unidade"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	"nome"	TEXT NOT NULL UNIQUE,
	"sigla"	TEXT NOT NULL UNIQUE,
	"subtipo"	TEXT NOT NULL
);

CREATE TABLE "vento" (
	"id_vento"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	"cidade"	TEXT NOT NULL DEFAULT 'Atibaia',
	"data"	TEXT NOT NULL UNIQUE,
	"direcao"	TEXT NOT NULL,
	"velocidade"	REAL NOT NULL
);

