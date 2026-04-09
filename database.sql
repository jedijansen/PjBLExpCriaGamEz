-- ============================================
-- Sistema GamEz - Coleção de Jogos
-- Desenvolvido por: Gustavo Jansen Butenas
-- ============================================

-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS game_collection
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE game_collection;

-- Criação da tabela de jogos
DROP TABLE IF EXISTS jogos;

CREATE TABLE jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    plataforma VARCHAR(50) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    ano_lancamento INT NOT NULL,
    desenvolvedora VARCHAR(100) NOT NULL,
    nota DECIMAL(3,1) DEFAULT 0.0,
    descricao TEXT,
    imagem_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserção de dados iniciais (15 jogos)
INSERT INTO jogos (nome, plataforma, genero, ano_lancamento, desenvolvedora, nota, descricao, imagem_url) VALUES
(
    'Elden Ring',
    'PC',
    'RPG de Ação',
    2022,
    'FromSoftware',
    9.5,
    'Um mundo aberto vasto e sombrio criado em colaboração com George R.R. Martin. Explore as Terras Intermédias, enfrente chefes desafiadores e descubra uma narrativa rica e misteriosa neste RPG de ação soulslike revolucionário.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.webp'
),
(
    'God of War: Ragnarök',
    'PlayStation 5',
    'Ação/Aventura',
    2022,
    'Santa Monica Studio',
    9.3,
    'Kratos e Atreus enfrentam o Ragnarök na mitologia nórdica. Uma jornada épica com combate visceral, puzzles inteligentes e uma história emocionante sobre a relação entre pai e filho diante do fim dos tempos.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.webp'
),
(
    'Minecraft',
    'PC',
    'Sandbox',
    2011,
    'Mojang Studios',
    9.2,
    'O jogo sandbox mais popular do mundo. Construa, explore, sobreviva e crie mundos infinitos com blocos. De cavernas perigosas a construções monumentais, as possibilidades são verdadeiramente ilimitadas neste fenômeno cultural.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.webp'
),
(
    'Star Wars Jedi: Fallen Order',
    'PC',
    'Ação/Aventura',
    2019,
    'Respawn Entertainment',
    8.5,
    'Assuma o papel de Cal Kestis, um jovem Padawan sobrevivente da Ordem 66. Explore planetas da galáxia, domine o sabre de luz e a Força, e descubra os segredos de uma antiga civilização enquanto foge do Império.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.webp'
),
(
    'Star Wars Jedi: Survivor',
    'PC',
    'Ação/Aventura',
    2023,
    'Respawn Entertainment',
    8.8,
    'A sequência de Fallen Order leva Cal Kestis a novas aventuras cinco anos depois. Com novas posturas de combate, habilidades expandidas da Força e um mundo ainda maior para explorar, a luta contra o Império continua.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmx.webp'
),
(
    'Ghost of Tsushima',
    'PlayStation 5',
    'Ação/Aventura',
    2020,
    'Sucker Punch Productions',
    9.2,
    'Jin Sakai, um samurai, deve abandonar as tradições de seus ancestrais para proteger a ilha de Tsushima durante a invasão mongol de 1274. Um mundo aberto deslumbrante com combate elegante e uma história de honra e sacrifício.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2ekt.webp'
),
(
    'The Last of Us Part I',
    'PlayStation 5',
    'Ação/Aventura',
    2022,
    'Naughty Dog',
    9.4,
    'O remake do clássico que redefiniu a narrativa nos jogos. Joel e Ellie atravessam os Estados Unidos devastados por uma pandemia fúngica em uma jornada brutal e emocionante sobre sobrevivência, perda e a força dos laços humanos.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5xex.webp'
),
(
    'The Last of Us Part II',
    'PlayStation 5',
    'Ação/Aventura',
    2020,
    'Naughty Dog',
    9.3,
    'Cinco anos após a jornada perigosa pelos Estados Unidos, Ellie e Joel se estabelecem em Jackson, Wyoming. Um evento violento interrompe a paz e lança Ellie em uma busca implacável por justiça, explorando as consequências da vingança.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5ziw.webp'
),
(
    'God of War',
    'PlayStation 4',
    'Ação/Aventura',
    2018,
    'Santa Monica Studio',
    9.5,
    'Kratos deixa o panteão grego para trás e se estabelece nas terras nórdicas com seu filho Atreus. Juntos, embarcam em uma jornada perigosa para espalhar as cinzas da esposa de Kratos no pico mais alto dos nove reinos.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tbu.webp'
),
(
    'Resident Evil: Requiem',
    'PC',
    'Terror',
    2025,
    'Capcom',
    9.0,
    'A mais recente entrada na icônica franquia de survival horror da Capcom. Resident Evil Requiem traz uma nova história aterrorizante com mecânicas renovadas, gráficos de última geração e o terror visceral que consagrou a série.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co8k71.webp'
),
(
    'Resident Evil 2 Remake',
    'PC',
    'Terror',
    2019,
    'Capcom',
    9.2,
    'O remake que redefiniu o survival horror. Leon Kennedy e Claire Redfield chegam a Raccoon City para encontrar a cidade infestada de zumbis. Com a câmera sobre o ombro e o temível Mr. X, o terror nunca foi tão intenso.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1jf4.webp'
),
(
    'Resident Evil 3 Remake',
    'PC',
    'Terror',
    2020,
    'Capcom',
    7.8,
    'Jill Valentine tenta escapar de Raccoon City enquanto é perseguida pelo implacável Nemesis. Um remake com ação frenética, tensão constante e momentos de puro horror que recria a experiência clássica com tecnologia moderna.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2dtw.webp'
),
(
    'Resident Evil 4 Remake',
    'PC',
    'Terror',
    2023,
    'Capcom',
    9.4,
    'Leon S. Kennedy é enviado para uma região rural da Espanha para resgatar a filha do presidente. O remake do aclamado RE4 traz combate modernizado, gráficos impressionantes e uma atmosfera ainda mais tensa e imersiva.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co65zw.webp'
),
(
    'Resident Evil 7: Biohazard',
    'PC',
    'Terror',
    2017,
    'Capcom',
    8.8,
    'Ethan Winters busca sua esposa desaparecida em uma plantação abandonada na Louisiana, habitada pela aterrorizante família Baker. Em primeira pessoa, o jogo reinventou a franquia com horror psicológico puro e imersão total.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1jh1.webp'
),
(
    'Resident Evil Village',
    'PC',
    'Terror',
    2021,
    'Capcom',
    8.7,
    'Ethan Winters retorna em uma aventura que o leva a um vilarejo europeu misterioso, governado por quatro lordes sob o comando de Mother Miranda. Uma mistura de horror, ação e exploração com cenários deslumbrantes e assustadores.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2z0p.webp'
);
