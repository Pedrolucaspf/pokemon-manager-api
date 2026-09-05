import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
    }
);

app.use(express.json());

interface Pokemon{
    id: string;
    name: string;
    type: string;
    hp: number;
}

const pokemons: Pokemon[] = [
    { id: '1', name: 'Bulbasaur', type: 'Grass', hp: 45 },
    { id: '4', name: 'Charmander', type: 'Fire', hp: 39 },
    { id: '7', name: 'Squirtle', type: 'Water', hp: 44 },
];

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

    const typesArray: string[] = ["Normal", "Grass", "Fire", "Water", "Electric", "Ice", 
            "Fighting", "Ground", "Poison", "Flying", "Psychic", "Bug", 
            "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"
    ];

    const typeCounts: number[] = [];

    for(let i = 0; i < typesArray.length+1; i++){
        typeCounts.push(0);
    }

    pokemons.forEach( (p) => {

        let typeFound = 0;
        for(let i = 0; i < typesArray.length; i++){
            if(p.type === typesArray[i]){
                typeCounts[i] += 1;
                typeFound = 1;
            }
        }

        if(typeFound === 0){
            typeCounts[typeCounts.length-1] += 1;
        }

    });
    
    const typesCountObj: Record<string, number> = {};

    for(let i = 0; i < typesArray.length; i++){
        typesCountObj[typesArray[i]] = typeCounts[i];
    }

    typesCountObj["Undetermined"] = typeCounts[typeCounts.length - 1];

    return res.status(200).json({
        "totalPokemons": totalPokemons,
        "typesCount": typesCountObj /*{
            "Normal": typeCounts[0],
            "Grass": typeCounts[1],
            "Fire": typeCounts[2],
            "Water": typeCounts[3],
            "Electric": typeCounts[4],
            "Ice": typeCounts[5],
            "Fighting": typeCounts[6],
            "Ground": typeCounts[7],
            "Poison": typeCounts[8],
            "Flying": typeCounts[9],
            "Psychic": typeCounts[10],
            "Bug": typeCounts[11],
            "Rock": typeCounts[12],
            "Ghost": typeCounts[13],
            "Dragon": typeCounts[14],
            "Dark": typeCounts[15],
            "Steel": typeCounts[16],
            "Fairy": typeCounts[17],
            "Undetermined": typeCounts[18]
        }*/
    });
});

//Busca pokemon por id

app.get('/api/v1/pokemons/:id', (req:Request, res: Response) => {
    const {id} = req.params;
    
    const pokemon = pokemons.find( (p) => p.id === id);

    if(!pokemon){
        return res.status(404).json({error: 'Pokemon não encontrado no catálogo.'});
    }

    return res.status(200).json(pokemon);
});

//Cadastra novo pokemon

app.post('/api/v1/pokemons', (req:Request, res: Response) => {
    const {id, name, type, hp} = req.body;

    if(!id || !name || !type || !hp){
        return res.status(400).json({error: 'Campos obrigatórios ausentes: id, name, type e hp são necessários.'});
    }

    const pokemonExists = pokemons.some( (p) => p.id === id);
    if(pokemonExists){
        return res.status(404).json({error: 'Pokemon com este id já existe.'});
    }

    const newPokemon: Pokemon = { id, name, type, hp: Number(hp) };
    pokemons.push(newPokemon);

    return res.status(201).json({message: 'Pokemon cadastrado com sucesso.', data: newPokemon});
});

//Deleta pokemon por ID

app.delete('/api/v1/pokemons/:id', (req:Request, res: Response) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({error: 'Campo obrigatório ausente: id é necessário para deleção.'});
    }

    const pokemon = pokemons.find( (p) => p.id === id);

    if(!pokemon){
        return res.status(404).json({error: 'Pokemon não encontrado no catálogo.'});
    }

    const index = pokemons.indexOf(pokemon);

    pokemons.splice(index, 1)
    return res.status(200).json(pokemon);
});

//Atualiza Pokemon por ID

app.put('/api/v1/pokemons/:id', (req:Request, res: Response) => {
    const {id} = req.params;
    
    const {name, type, hp} = req.body;

    if(!id){
        return res.status(400).json({error: 'Campo obrigatório ausente: id é necessário para realizar atualização.'});
    }

    const pokemon_index = pokemons.findIndex( (p) => p.id === id);

    if(pokemon_index === -1){
        return res.status(404).json({error: 'Pokemon não encontrado no catálogo.'});
    }

    if(!name && !type && !hp){
        return res.status(400).json({error: 'Atualização vazia: novo name/type/hp deve ser inserido.'});
    }
    else {    
        if(name){
            pokemons[pokemon_index].name = name;
        }

        if(type){
            pokemons[pokemon_index].type = type;
        }

        if(hp){
            pokemons[pokemon_index].hp = hp;
        }
    }
    
    return res.status(200).json(pokemons[pokemon_index]);
});

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`[server] API rodando em http://localhost:${PORT}`);
});