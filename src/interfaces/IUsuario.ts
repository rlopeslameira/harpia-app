
interface IUsuario {
    escola?: string;
    ano?: string;
    seqano?: string;
    matric?: string;
    senha?: string;
    nome?: string;
    turma?: string;
    turma_des?: string;
    curso?: string;
    curso_des?: string;
    respon?: string;
    cpf_resp?: string;
    datnas_respon?: string;
    end_respon?: string;
    bairro_respon?: string;
    cep_respon?: string;
    sit?: string;
    aprrep?: string;
    ord?: string;
    cpf?: string;
    foto?: string;
    codigo?: string;

    guerra?: string;
    tipo?: string;
    email?: string;
    setor?: string;
    atende?: string;
    agenda?: string;

    parametros?: any;
}

interface IAcessos {
    PerfilId: number;
    CodigoPerfil: string;
    EmpresaId: string;
    Empresas: IEmpresa;
}

interface IEmpresa {
    EmpresaId: number;
    Empresa: string;
    IdRelatorio: string;
    Periodos: IPeriodo[];
    RazaoSocial: string;
    Logo: string;
}

interface IPeriodo {
    Id: number;
    Descricao: string;
    Ano: string;
    Sequencial: number;
    Ordem: number;
}

export type {IPeriodo, IEmpresa, IAcessos, IUsuario};