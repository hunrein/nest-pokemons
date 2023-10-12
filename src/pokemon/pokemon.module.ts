import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    // Para que la configuración del ConfigModule esté disponible, debemos importarla en el modulo que deseamos
    ConfigModule,
    //Para poder grabar en DB a partir del Shema de DB que creamos para los pokemons debemos hacer la importación en el modelo.
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
  exports: [MongooseModule], //esta exportación es para utilizar el PokemonModule en los seeds
})
export class PokemonModule {}
