export interface IDeal {
  id: number;
  title: string;
  person_name: string;
  value: number;
  currency: string;
  update_time: string;
  status: string;
}

export interface IPipedriveApiReturn {
  data: IDeal[];
}

export interface IBlingRequest {
  clientName: string;
  code: number;
  description: string;
  value: number;
}

export interface IBlingReturn {
  retorno: {
    pedidos: [
      {
        pedido: {
          numero: string;
          idPedido: number;
        };
      },
    ];
    erros: [
      {
        erro: {
          cod: 29 | 30 | 31 | 32 | 34;
          msg: string;
        };
      },
    ];
  };
}
