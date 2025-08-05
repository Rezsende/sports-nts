export interface Produto {
  id: string;
  codigo: string;
  codigoBarras: string;
  descricao: string;
  preco: number;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
  subtotal: number;
}