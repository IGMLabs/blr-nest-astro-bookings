import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "usuarios", _id: true, timestamps: false })
export class Usuario extends Document {
  @Prop({ required: true, index: true })
  public id: string;

  @Prop({ required: false })
  public name?: string;

  @Prop({ index: true })
  public email: string;

  @Prop()
  public password: string;

  @Prop({ required: false })
  public roles?: string[];
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
UsuarioSchema.index({ email: 1, password: 1 });
