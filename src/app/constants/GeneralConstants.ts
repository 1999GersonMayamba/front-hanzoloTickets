export class GeneralConstants {

    static BASE_URL_GRELHA = 'https://uqualidadegrelha.df.co.ao/';
    //static BASE_URL_GRELHA = 'http://10.11.1.68:9802/';
    //static BASE_URL_GRELHA = 'http://localhost:4201/';
    static BASE_URL = 'https://uqualidade.df.co.ao/';
    //static BASE_URL = 'http://10.11.1.68:9801/';

    static ESTADO = {
        ATIVADO: { code: 1, info: 'Activo' },
        DESATIVADO: { code: 2, info: 'Desativado' },
        toArray: () => {
            return [
                GeneralConstants.ESTADO.ATIVADO,
                GeneralConstants.ESTADO.DESATIVADO
            ]
        }
    }

    static NIVEL_USUARIO = {
        ADMINISTRADOR: { code: 1, info: 'Administrador' },
        AUDITOR: { code: 2, info: 'AUDITOR' },
        GESTOR_CLIENTE: { code: 3, info: 'OPERADOR' },
        SUPERVISOR: { code: 4, info: 'SUPERVISOR' },
        FORMADOR: { code: 5, info: 'formador' },
        toArray: () => {
            return [
                GeneralConstants.NIVEL_USUARIO.ADMINISTRADOR,
                GeneralConstants.NIVEL_USUARIO.AUDITOR,
                GeneralConstants.NIVEL_USUARIO.GESTOR_CLIENTE,
                GeneralConstants.NIVEL_USUARIO.SUPERVISOR,
                GeneralConstants.NIVEL_USUARIO.FORMADOR
            ]
        }
    }

    static USER_AUTH = {
        TOKEN_KEY: 'qualidade_token',
        USERID_KEY: 'qualidade_user_id',
        USERNAME_KEY: 'qualidade_user_nome',
        USERROLES_KEY: 'qualidade_user_roles',
        USERPERMISSOES_KEY: 'qualidade_user_permissoes',
        USERNIVEL_KEY: 'qualidade_user_nivel',
        USER_TIPO_ID_KEY: 'qualidade_tipo_user_id',
        USER_OPERACAO_KEY: 'qualidade_operacao_id'
    }

    static UserData = {
      DataUserJson: 'NossaSeguros3CX',
      IsPago: 'Online_Print_IsPago'
    }

    static Ispago = false;

}
