import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Express Sample API',
    description:
      'API de exemplo desenvolvida para a disciplina Tópicos Especiais em Engenharia de Software (UFF)',
  },
  host: 'localhost:3333',
  basePath: '/api/v1/pokemons',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Pokemons',
      description: 'Endpoints de gerenciamento de pokemons',
    },
  ],
  definitions: {
    Pokemon: {
      id: 55,
      name: 'Scizor',
      type1: 'Bug',
      type2: 'Steel',
      rarity: 'Rare',
      level: 30,
      stats: {
        attack: 110,
        defense: 240,
        hp: 330,
      },
      nickname: 'Raiden',
    },
    CreatePokemonDTO: {
      $id: '55',
      $name: 'Scizor',
      $type1: 'Bug',
      $type2: 'Steel',
      $rarity: 'Rare',
      $level: '30',
      $attack: '110',
      $defense: '240',
      $hp: '330',
      $nickname: 'Raiden',
    },
    ErrorResponse: {
      error: 'Tipo 1 inserido inválido.',
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

const endpointsFiles = [
  path.resolve(__dirname, '../../infrastructure/http/routes/pokemon.routes.ts'),
  path.resolve(__dirname, '../server.ts'),
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
