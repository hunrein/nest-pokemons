import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async executeSEED() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>(
      'http://pokeapi.co/api/v2/pokemon?limit=650',
    );
    //const insertPromiseArray = []; // creamos un array vacío
    const pokemonToInsert: { name: string; no: number }[] = [];
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      //const pokemon = await this.pokemonModel.create({ name, no });
      //insertPromiseArray.push(this.pokemonModel.create({ name, no })); // insertamos todas las promesas dentro del array
      pokemonToInsert.push({ name, no });
    });
    //await Promise.all(insertPromiseArray); // resolvemos todas simultáneamente mediante promise.all. Método más rápido que resolverlas una por una en el bucle
    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed executed';
  }
}
