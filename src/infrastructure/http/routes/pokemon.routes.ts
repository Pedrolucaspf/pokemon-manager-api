import { Router } from 'express';
import { makePokemonController } from '@main/factories/makePokemonController.factory';

const pokemonRoutes = Router();
const pokemonController = makePokemonController();

pokemonRoutes.get('/', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Lista todos os pokemons'
    #swagger.description = 'Endpoint para listar pokemons cadastrados.'
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
});

pokemonRoutes.get('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Busca pokemon por id'
    #swagger.description = 'Endpoint para buscar pokemon cadastrado a partir de seu id.'
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
});

pokemonRoutes.post('/', (req, res) => {
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
});

pokemonRoutes.put('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Atualiza pokemon'
    #swagger.description = 'Endpoint para atualizar pokemon cadastrado anteriormente a partir do seu id.'
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
});

pokemonRoutes.delete('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Deleta pokemon'
    #swagger.description = 'Endpoint para deletar registro de pokemon da base de dados.'
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
});

export { pokemonRoutes };
