import { memo } from "react"

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  }
}

function ProductItemComponent({ product }: ProductItemProps) {
  return(
    <div>
      {product.title} - <strong>{`R$ ${product.price}`}</strong>
    </div>
  );
}

// evita que o componente seja re-renderizado caso nenhuma propriedade deste componente seja alterado. Memo faz uma shallow compare -> uma comparação rasa das informacoes do componentes pra perceber a igualdade

/**
 * o ({ product }) recebido por parametro mudou no meu item?
 * product: {
    id: number; ?? - este item foi alterado ??
    price: number; ?? - este item foi alterado ??
    title: string; ?? - este item foi alterado ??
  }
 * Se nao mudou, nao precisa renderizar
 */

export const ProductItem = memo(ProductItemComponent, (previousProps, NextProps) => {
  //compara item a item entre as propriedades antigas e as novas
  return Object.is(previousProps, NextProps)
});

/**
 * onde utilizar o memo?
 * 
 * 1. pure functional components - componentes que servem apenas pra separar uma responsabilidade, como este ProductItem, que serve apenas pra exibir um dado
 * 2. Renders too often
 */