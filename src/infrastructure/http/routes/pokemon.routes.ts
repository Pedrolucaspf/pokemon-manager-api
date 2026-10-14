import { Router } from 'express';
import { validateRequest } from '../middlewares/validate-request';
import {
  createPokemonSchema,
  updatePokemonBodySchema,
  updatePokemonParamsSchema,
  getPokemonByIdSchema,
  listPokemonsSchema,
} from '../schemas/pokemon-schemas';
import {
  createTrainerSchema,
  updateTrainerBodySchema,
  updateTrainerParamsSchema,
  getTrainerByEmailSchema,
  listTrainersSchema,
} from '../schemas/trainer-schemas';
import { makePokemonController } from '@main/factories/makePokemonController.factory';
import { makeTrainerController } from '@main/factories/makeTrainerController.factory';
import { makeCaptureController } from '@main/factories/makeCaptureController.factory';
import {
  createCaptureSchema,
  listCapturesSchema,
} from '../schemas/capture-schemas';

const pokemonRoutes = Router();
const pokemonController = makePokemonController();
const trainerController = makeTrainerController();
const captureController = makeCaptureController();

pokemonRoutes.get(
  '/pokemons',
  validateRequest({ query: listPokemonsSchema }),
  (req, res) => {
    /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Lista todos os pokemons'
    #swagger.description = 'Endpoint para listar pokemons cadastrados.'

    #swagger.parameters['type'] = {
      in: 'query',
      description: 'Busca os pokemons pelo tipo (opcional)',
      required: false,
      type: 'string'
    }

    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }

    #swagger.parameters['name'] = {
      in: 'query',
      description: 'Busca os pokemons pelo nome (opcional)',
      required: false,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Lista de pokemons retornada com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/Pokemon' }
              }
            }
          }
        }
      }
    }
  */
    return pokemonController.list(req, res);
  },
);

pokemonRoutes.get(
  '/pokedex',
  validateRequest({ query: listPokemonsSchema }),
  (req, res) => {
    /*
    #swagger.tags = ['Pokedex']
    #swagger.summary = 'Busca pokemon na API externa'
    #swagger.description = 'Endpoint para buscar pokemon na API externa pelo nome.'

    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }

    #swagger.parameters['search'] = {
      in: 'query',
      description: 'Busca os pokemons pelo nome (opcional)',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Pokemon retornado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/Pokemon' }
              }
            }
          }
        }
      }
    }
  */
    return pokemonController.searchApi(req, res);
  },
);

pokemonRoutes.get(
  '/pokemons/:id',
  validateRequest({ params: getPokemonByIdSchema }),
  (req, res) => {
    /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Busca pokemon por id'
    #swagger.description = 'Endpoint para buscar pokemon cadastrado a partir de seu id.'
    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }
    #swagger.responses[200] = {
      description: 'Pokemon retornado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { $ref: '#/components/schemas/Pokemon' }
            }
          }
        }
      }
    }
  */
    return pokemonController.getById(req, res);
  },
);

pokemonRoutes.post(
  '/pokemons',
  validateRequest({ body: createPokemonSchema }),
  (req, res) => {
    /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Cria um novo pokemon'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CreatePokemonDto' }
        }
      }
    }
    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }

    #swagger.responses[201] = {
      description: 'Pokemon criado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Pokemon criado com sucesso!' },
              data: { $ref: '#/components/schemas/Pokemon' }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Regra de negócio violada (ex: Dados faltando).',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
    return pokemonController.create(req, res);
  },
);

pokemonRoutes.put(
  '/pokemons/:id',
  validateRequest({
    params: updatePokemonParamsSchema,
    body: updatePokemonBodySchema,
  }),
  (req, res) => {
    /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Atualiza pokemon'
    #swagger.description = 'Endpoint para atualizar pokemon cadastrado anteriormente a partir do seu id.'
    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }
    #swagger.responses[200] = {
      description: 'Pokemon atualizado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { $ref: '#/components/schemas/Pokemon' }
            }
          }
        }
      }
    }
  */
    return pokemonController.update(req, res);
  },
);

pokemonRoutes.delete(
  '/pokemons/:id',
  validateRequest({ params: getPokemonByIdSchema }),
  (req, res) => {
    /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Deleta pokemon'
    #swagger.description = 'Endpoint para deletar registro de pokemon da base de dados.'
    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }
    #swagger.responses[200] = {
      description: 'Pokemon deletado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { $ref: '#/components/schemas/Pokemon' }
            }
          }
        }
      }
    }
  */
    return pokemonController.delete(req, res);
  },
);

pokemonRoutes.get(
  '/trainers',
  validateRequest({ query: listTrainersSchema }),
  (req, res) => {
    /*
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Lista todos os treinadores'
    #swagger.description = 'Endpoint para listar treinadores cadastrados.'

    #swagger.parameters['name'] = {
      in: 'query',
      description: 'Busca os treinadores pelo nome (opcional)',
      required: false,
      type: 'string'
    }

    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }

    #swagger.responses[200] = {
      description: 'Lista de treinadores retornada com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/Trainer' }
              }
            }
          }
        }
      }
    }
  */
    return trainerController.list(req, res);
  },
);

pokemonRoutes.get(
  '/trainers/:email',
  validateRequest({ params: getTrainerByEmailSchema }),
  (req, res) => {
    /*
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Busca treinador por email'
    #swagger.description = 'Endpoint para buscar treinador cadastrado a partir de seu email.'
    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }
    #swagger.responses[200] = {
      description: 'Treinador retornado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { $ref: '#/components/schemas/Trainer' }
            }
          }
        }
      }
    }
  */
    return trainerController.getByEmail(req, res);
  },
);

pokemonRoutes.post(
  '/trainers',
  validateRequest({ body: createTrainerSchema }),
  (req, res) => {
    /*
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Registra um novo treinador'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CreateTrainerDto' }
        }
      }
    }
    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }
    #swagger.responses[201] = {
      description: 'Treinador criado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Treinador criado com sucesso!' },
              data: { $ref: '#/components/schemas/Trainer' }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Regra de negócio violada (ex: Dados faltando).',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
    return trainerController.create(req, res);
  },
);

pokemonRoutes.put(
  '/trainers/:email',
  validateRequest({
    params: updateTrainerParamsSchema,
    body: updateTrainerBodySchema,
  }),
  (req, res) => {
    /*
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Atualiza treinador'
    #swagger.description = 'Endpoint para atualizar treinador cadastrado anteriormente a partir do seu email.'
    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }
    #swagger.responses[200] = {
      description: 'Treinador atualizado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { $ref: '#/components/schemas/Trainer' }
            }
          }
        }
      }
    }
  */
    return trainerController.update(req, res);
  },
);

pokemonRoutes.delete(
  '/trainers/:email',
  validateRequest({ params: getTrainerByEmailSchema }),
  (req, res) => {
    /*
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Deleta treinador'
    #swagger.description = 'Endpoint para deletar registro de treinador da base de dados.'
    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }
    #swagger.responses[200] = {
      description: 'Treinador deletado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { $ref: '#/components/schemas/Trainer' }
            }
          }
        }
      }
    }
  */
    return trainerController.delete(req, res);
  },
);

pokemonRoutes.post(
  '/trainers/:trainerId/captures',
  validateRequest({ body: createCaptureSchema }),
  (req, res) => {
    /*
    #swagger.tags = ['Captures']
    #swagger.summary = 'Registra uma nova captura'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CreateCaptureDto' }
        }
      }
    }
    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }
    #swagger.responses[201] = {
      description: 'Captura registrada com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Captura registrada com sucesso!' },
              data: { $ref: '#/components/schemas/Capture' }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Regra de negócio violada (ex: Dados faltando).',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
    return captureController.create(req, res);
  },
);

pokemonRoutes.get(
  '/trainers/:trainerId/team',
  validateRequest({ query: listCapturesSchema }),
  (req, res) => {
    /*
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Lista capturas'
    #swagger.description = 'Endpoint para listar capturas cadastradas por treinador.'

    #swagger.parameters['parseAsync(req'] = { in: 'query', implicit: true, schema: { type: 'string' }, ignore: true }

    #swagger.responses[200] = {
      description: 'Lista de capturas retornada com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/Capture' }
              }
            }
          }
        }
      }
    }
  */
    return captureController.list(req, res);
  },
);

export { pokemonRoutes };
