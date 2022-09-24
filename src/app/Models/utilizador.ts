export class Utilizador {
  id!: number;
  userName!: string;
  email!: string;
  nome!: string;
  senha!: string;
  numFuncionario!: string;
  turnoInicio!: string;
  turnoFim!: string;
  tipoUtilizadorId!: number;
  idTipoUtilizador!: number;
  isActivo!: boolean;
  roles!: any[];
  permissoes!: any[];
  unidades!: any[];
  prestadores!: any[];
  dominio!: any;
  perfil!: number;
  access_token!: string;
  operacaoId!: number;
  inputEmailAddress!: string;
}
