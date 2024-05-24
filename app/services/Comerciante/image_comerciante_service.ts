import { MultipartFile } from "@adonisjs/core/bodyparser"
import { ComecianteLucidRepository } from "../../repositories/lucid/comerciante.js"
import { inject } from "@adonisjs/core"
import { LocalUpload } from "../../providers/impls/upload/local/index.js"

type savePayload = {
    id: number
    file: MultipartFile
    folder: string
}

@inject()
export default class ComercianteImageService{
    constructor(private uploadProvider: LocalUpload, private comercianteRepository: ComecianteLucidRepository){}

    public async save({ id, file, folder } : savePayload){
        const data = await this.uploadProvider.save({arquivo:file, folder})
        
        await this.comercianteRepository.updateImage({tipoImagem: folder === 'LOGO'?'LOGO':'BANNER', id, path: data.path})
    }
}
