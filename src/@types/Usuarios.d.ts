declare module 'knex/types/tables' {
  export interface Tables {
    usuario: {
          id: string,
          identificacaoUser: string,
          nome: string,
          senha: string,
          created_at: string
    }
  }
}