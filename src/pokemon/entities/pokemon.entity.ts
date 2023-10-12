import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  //id: string // Mongo me lo da
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}
/* Las entidades hacen referencia a como nosotros queremos grabar en nustra base de datos.
as entidades hacen una relación con las tablas de las bases de datos.
A lo que conocemos como tablas en sql, en Mongo lo llamamos colecciones, y a los registros los llamamos colecciones */
/* Cada instancia de una clase es un registro de la base de datos */
export const PokemonSchema = SchemaFactory.createForClass(Pokemon); //Fabricamos un Schema de DB de Mongo a partir de nuestra clase y lo exportamos
