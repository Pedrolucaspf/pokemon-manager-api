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
      name: 'Scyther',
      type: 'Bug',
      rarity: 'Rare',
      stats: {
        attack: 60,
        defense: 40,
        hp: 70,
      },
      nickname: 'Raiden',
    },
    CreatePokemonDTO: {
      $id: '55',
      $name: 'Scyther',
      $type: 'Bug',
      $rarity: 'Rare',
      $attack: '60',
      $defense: '40',
      $hp: '70',
      $nickname: 'Raiden',
    },
    ErrorResponse: {
      error: 'Tipo inválido.',
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

const endpointsFiles = [
  path.resolve(__dirname, '../../infrastructure/http/routes/pokemon.routes.ts'),
  path.resolve(__dirname, '../server.ts'),
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
