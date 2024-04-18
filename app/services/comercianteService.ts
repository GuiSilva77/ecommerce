import Comerciante from "../models/Comerciante";

export interface IComercianteService{
  create(payload: Comerciante): Promise <Comerciante>
}
