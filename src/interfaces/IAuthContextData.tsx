import ISignIn from "./ISigIn";
import {IEmpresa, IPeriodo, IUsuario} from "./IUsuario";

interface IAuthContextData {
    usuario?: IUsuario;
    loading: boolean;
    isLoged: boolean;
    periodoSelecionado?: IPeriodo;
    signIn(credenciais: ISignIn): Promise<void>;
    signOut(): void;
    setUser(user: IUsuario): Promise<void>;
    setPeriodo(periodo: IPeriodo): Promise<void>;
    recarregaAluno(aluno: IUsuario): Promise<void>;
    recarregaFuncionario(func: IUsuario): Promise<void>;
}

export default IAuthContextData ;