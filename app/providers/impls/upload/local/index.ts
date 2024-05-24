import app from "@adonisjs/core/services/app";
import { IUpload, savePayload } from "../../../IUpload.js";
import { cuid } from "@adonisjs/core/helpers";

export class LocalUpload implements IUpload{
    async save({ arquivo, folder }:savePayload){
       const name = cuid() + arquivo.extname
       const imagem = await arquivo.move(app.makePath(`uploads/${folder}`),{name})

       return {path:name}
    }
}