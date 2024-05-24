import { MultipartFile } from "@adonisjs/core/bodyparser"

export type savePayload = {
    arquivo: MultipartFile
    folder: string
}

type saveData = {
    path: string
}

export interface IUpload{
    save:({ arquivo, folder }: savePayload) => Promise<saveData>
}