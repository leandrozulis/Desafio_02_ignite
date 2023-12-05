declare module 'knex/types/tables' {
  export interface Tables {
      refeicoes: {
        id: string,
        identificacaoUser: string,
        nome: string,
        descricao: string,
        dieta: boolean,
        created_at: string
    }
  }
}