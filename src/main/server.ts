import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
    }
);

app.use(express.json());

type SearchIdentifier = string | number;

enum pokemonType {NORMAL = "Normal", GRASS = "Grass", FIRE = "Fire", WATER = "Water", ELECTRIC = "Electric", ICE = "Ice",
    FIGHTING = "Fighting", GROUND = "Ground", POISON = "Poison", FLYING = "Flying", PSYCHIC = "Psychic", BUG = "Bug",
    ROCK = "Rock", GHOST = "Ghost", DRAGON = "Dragon", DARK = "Dark", STEEL = "Steel", FAIRY = "Fairy"
};

enum Rarity {COMMON = "Common", RARE = "Rare", LEGENDARY = "Legendary"};

interface IPokemonBattleStats{
    attack: number;
    defense: number;
    hp: number;
}

interface Pokemon{
    id: number;
    name: string;
    type: pokemonType;
    rarity: Rarity;
    stats: IPokemonBattleStats;
    nickname?: string;
}

interface CreateTrainerDTO{
  name: string;
  age: number;
  city: string;
}

interface TrainerParams{
  id: number;
}

interface Trainer{
  trainerId: TrainerParams;
  trainerInfo: CreateTrainerDTO;
}



function findPokemonInCatalog(identifier: SearchIdentifier){
  console.log(typeof identifier);
  if(typeof identifier === "number"){
        console.log(`Buscando por Pokedex ID: ${identifier}`);
        const pokemon = pokemons.find( (p) => p.id === identifier);
        if(pokemon){
            return pokemon;
        }
        else{
            return;
        }
    }
    else if(typeof identifier === "string"){
        console.log(`Buscando por Nome: ${identifier}`);
        const pokemon = pokemons.find( (p) => p.name === identifier);
        if(pokemon){
            return pokemon;
        }
        else{
            return;
        }
    }
    else{
        console.log("Identificador inválido.");
    }
}

function calculatePokemonDamage(attacker: Pokemon, defender: Pokemon) {
  const baseDamage = attacker.stats.attack - defender.stats.defense; // Erro de digitação!
  const totalHpRemaining = defender.stats.hp - baseDamage;
  return "HP restante: " + totalHpRemaining;
}

const pokemons: Pokemon[] = [
    { id: 1, name: 'Bulbasaur', type: pokemonType.GRASS, rarity: Rarity.COMMON, stats: {attack: 19, defense: 25, hp: 45} },
    { id: 4, name: 'Charmander', type: pokemonType.FIRE, rarity: Rarity.COMMON, stats: {attack: 30, defense: 18, hp: 39} },
    { id: 7, name: 'Squirtle', type: pokemonType.WATER, rarity: Rarity.COMMON, stats: {attack: 23, defense: 25, hp: 44} },
    { id: 149, name: 'Mewtwo', type: pokemonType.PSYCHIC, rarity: Rarity.LEGENDARY, stats: {attack: 153, defense: 86, hp: 204}, nickname: 'MeowToo' },
];

const trainers: Trainer[] = [];

//Lista todos os pokemons, podendo ser filtrado por tipo

app.get('/api/v1/pokemons', (req:Request, res: Response) => {
    const {type} = req.query;

    if(type){
        const filteredPokemons = pokemons.filter(
            (p) => p.type.toLowerCase() === String(type).toLowerCase()
        );
        return res.status(200).json(filteredPokemons);
    }

    return res.status(200).json(pokemons);
});

//Rota que retorna estatísticas gerais da API

app.get('/api/v1/pokemons/stats', (req:Request, res: Response) => {

    const totalPokemons = pokemons.length;

    /*const typesArray: string[] = ["Normal", "Grass", "Fire", "Water", "Electric", "Ice",
            "Fighting", "Ground", "Poison", "Flying", "Psychic", "Bug",
            "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"
    ];*/

    const typeCounts: number[] = [];

    for(let i = 0; i < Object.keys(pokemonType).length+1; i++){
        typeCounts.push(0);
    }

    pokemons.forEach( (p) => {

        let typeFound = 0;

        let i = 0;
        Object.values(pokemonType).forEach((type) => {
            if(p.type === type){
                typeCounts[i] += 1;
                typeFound = 1;
            }
            i++;
        });

        if(typeFound === 0){
            typeCounts[typeCounts.length-1] += 1;
        }

    });

    const typesCountObj: Record<string, number> = {};

    let i = 0;
    Object.values(pokemonType).forEach((type) => {
        typesCountObj[type] = typeCounts[i];
        i++;
    });

    typesCountObj["Undetermined"] = typeCounts[typeCounts.length - 1];

    return res.status(200).json({
        "totalPokemons": totalPokemons,
        "typesCount": typesCountObj
    });
});

//Busca pokemon por id

app.get('/api/v1/pokemons/:id', (req:Request, res: Response) => {
    const {id} = req.params;

    console.log(id);
    const num_id = Number(id);

    const pokemon = findPokemonInCatalog(num_id);
    console.log(pokemon);
    if(!pokemon){
        return res.status(404).json({error: 'Pokemon não encontrado no catálogo.'});
    }

    return res.status(200).json(pokemon);
});

//Cadastra novo pokemon

app.post('/api/v1/pokemons', (req:Request, res: Response) => {
    const {id, name, type, rarity, attack, defense, hp, nickname} = req.body;

    if(!id || !name || !type || !rarity || !attack || !defense || !hp){
        return res.status(400).json({error: 'Campos obrigatórios ausentes: id, name, type, rarity, attack, defense e hp são necessários.'});
    }

    const num_id = Number(id);
    const pokemonExists = findPokemonInCatalog(num_id);
    if(pokemonExists){
        return res.status(404).json({error: 'Pokemon com este id já existe.'});
    }

    const enum_type = type as pokemonType;
    const enum_rarity = rarity as Rarity;

    let newPokemon: Pokemon;

    if(nickname){
        newPokemon = { id, name, type: enum_type, rarity: enum_rarity, stats: {attack: Number(attack), defense: Number(defense), hp: Number(hp)}, nickname: nickname };
    }
    else{
        newPokemon = { id, name, type: enum_type, rarity: enum_rarity, stats: {attack: Number(attack), defense: Number(defense), hp: Number(hp)} };
    }

    pokemons.push(newPokemon);

    return res.status(201).json({message: 'Pokemon cadastrado com sucesso.', data: newPokemon});
});

//Deleta pokemon por ID

app.delete('/api/v1/pokemons/:id', (req:Request, res: Response) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({error: 'Campo obrigatório ausente: id é necessário para deleção.'});
    }

    const num_id = Number(id);
    const pokemon = findPokemonInCatalog(num_id);

    if(!pokemon){
        return res.status(404).json({error: 'Pokemon não encontrado no catálogo.'});
    }

    const index = pokemons.indexOf(pokemon);

    pokemons.splice(index, 1);
    return res.status(200).json(pokemon);
});

//Atualiza Pokemon por ID

app.put('/api/v1/pokemons/:id', (req:Request, res: Response) => {
    const {id} = req.params;

    const {name, type, rarity, attack, defense, hp, nickname} = req.body;

    if(!id){
        return res.status(400).json({error: 'Campo obrigatório ausente: id é necessário para realizar atualização.'});
    }

    const num_id = Number(id);
    const pokemon_index = pokemons.findIndex( (p) => p.id === num_id);

    if(pokemon_index === -1){
        return res.status(404).json({error: 'Pokemon não encontrado no catálogo.'});
    }

    if(!name && !type && !rarity && !attack && !defense && !hp){
        return res.status(400).json({error: 'Atualização vazia: novo name/type/rarity/attack/defense/hp deve ser inserido.'});
    }
    else {
        if(name){
            pokemons[pokemon_index].name = name;
        }

        if(type){
            const enum_type = type as pokemonType;
            pokemons[pokemon_index].type = enum_type;
        }

        if(rarity){
            const enum_rarity = rarity as Rarity;
            pokemons[pokemon_index].rarity = enum_rarity;
        }

        if(attack){
            pokemons[pokemon_index].stats.attack = attack;
        }

        if(defense){
            pokemons[pokemon_index].stats.defense = defense;
        }

        if(hp){
            pokemons[pokemon_index].stats.hp = hp;
        }

        if(nickname){
            pokemons[pokemon_index].nickname = nickname;
        }
    }

    return res.status(200).json(pokemons[pokemon_index]);
});

//Cadastro de treinador

app.post('/api/v1/trainers', (req:Request<{}, {}, CreateTrainerDTO>, res: Response) => {
  const trainer = req.body;

  if(!trainer.name || !trainer.age || !trainer.city){
    return res.status(400).json({error: 'Campos obrigatórios ausentes: name, age e city são necessários.'});
  }

  const age = Number(trainer.age);
  if(age <= 0){
    return res.status(404).json({error: 'Idade do treinador precisa ser positiva.'});
  }

  const newTrainer: Trainer = {trainerId: {id: trainers.length}, trainerInfo: {name: trainer.name, age: age, city: trainer.city}}

  trainers.push(newTrainer);

  return res.status(201).json({message: 'Treinador cadastrado com sucesso.', data: newTrainer});
});

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`[server] API rodando em http://localhost:${PORT}`);
});