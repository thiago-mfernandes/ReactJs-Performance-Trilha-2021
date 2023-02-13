import { memo, useState } from "react"
//import { AddProductToWIshList } from "./AddProductToWIshList";
import dynamic from "next/dynamic"
import { AddProductToWIshListProps } from "./AddProductToWIshList"

/**
 * problema na tipagem do dynamic:
 * preciso exportar de dentro de AddProductToWishList a tipagem
 * e passar como generic
 * 
 * posso passar pro meu dynamic um segundo parametro de loading pra exibir um componente de carregamento na minha tela
 * 
 * tbm posso fazer carregamento de funcao e biblioteca somente qdo o usuario for utlizar a funcao
 */
const AddProductToWishList = dynamic<AddProductToWIshListProps>(() => {
  return import('./AddProductToWIshList')
}, {
  loading: () => <span>Carregando...</span>
})


interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  },
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return(
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
      {/**
       * Qdo um componente soh for exibido dependendo de uma resposta ou acao do usuario
       * 
       * este item abaixo, só precisa ser renderizado quando o usuario clicar no botao de adicionar favoritos. Nesse caso aqui, posso usar o lazyLoading
       */}
      { isAddingToWishList && (
        <AddProductToWishList 
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      ) }
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
 * 3. Re-renders with same props
 * 4. component with medium to big size
 */