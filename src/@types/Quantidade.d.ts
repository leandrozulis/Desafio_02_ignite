declare module 'knex/types/tables' {
  export interface Tables {
    quantidades: {
        id: string,
        identificacaoUser: string,
        quantidadeTotal: number,
        quantidadeDentro: number,
        quantidadeFora: number,
        melhorSequencia: number
    }
  }
}