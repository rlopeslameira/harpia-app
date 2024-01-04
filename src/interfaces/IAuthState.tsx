import {IEmpresa, IPeriodo, IUsuario} from "./IUsuario";

interface IAuthState {
    usuario?: IUsuario;
    periodo?: IPeriodo;
    empresa?: IEmpresa;
}

export default IAuthState;