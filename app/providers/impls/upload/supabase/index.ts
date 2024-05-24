import UploadFailureException from "#exceptions/upload_failure";
import { supabase } from "../../../../lib/supabase.js";
import { IUpload, savePayload } from "../../../IUpload.js";

export class SupabaseUpload implements IUpload{
    async save({ arquivo, folder }:savePayload){
       const { data, error } = await supabase.storage.from(folder).upload(`public/${new Date().getTime()}`, arquivo, {contentType:'image/jpeg'})

       if(error){
         throw new UploadFailureException('Ocorreu um erro ao enviar a imagem')
       }

       return data
    }
}