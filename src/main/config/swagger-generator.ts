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
  basePath: '/api/v1',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Pokemons',
      description: 'Endpoints de gerenciamento de pokemons',
    },
    {
      name: 'Trainers',
      description: 'Endpoints de gerenciamento de treinadores',
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
    Trainer: {
      $name: 'Red',
      $email: 'blue@email.com',
      $city: 'Pallet Town',
    },
    CreateTrainerDTO: {
      $name: 'Red',
      $email: 'blue@email.com',
      $city: 'Pallet Town',
    },
    ErrorResponse: {
      error: 'Tipo 1 inserido inválido.',
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

const endpointsFiles = [
  path.resolve(__dirname, '../../infrastructure/http/routes/pokemon.routes.ts'),
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
