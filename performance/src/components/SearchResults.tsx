
//componente para virtualizacao:
import { List as LegacyList, ListProps, ListRowRenderer } from "react-virtualized";
import { ProductItem } from "./ProductItem";


interface SearchResultProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>
  onAddToWishList: (id: number) => void;
}
//toda vez que meu estado de results mudar..
export function SearchResults({ totalPrice ,results, onAddToWishList }: SearchResultProps) {

  const List = LegacyList as unknown as React.FC<ListProps>

  const SearchResults = ({
    results,
    totalPrice,
    onAddToWishList,
  }: SearchResultProps) => {
  
    // rowRenderer={} //funcao que renderiza os itens da lista
    const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
      //cada item da minha lista vai ser renderizado assim:
      return (
        <div key={key} style={style}>
          <ProductItem  
              product={results[index]} 
              onAddToWishList={onAddToWishList}
            />
        </div>
      )
    }

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300} //qual sera o tamanho da lista exibida, utilizar o tamanho maximo que ela pode ocupar com autoSizer
        rowHeight={30} // tamanho das linhas
        width={900} // largura
        overscanRowCount={5} //qtos itens quero que deixe pre-carregados
        rowCount={results.length} //qtos itens tem na lista
        rowRenderer={rowRenderer} //funcao que renderiza os itens da lista
      />
            
    </div>
  );
}
}

/**
 * useMemo / memorizar um valor
 * 1.Calculos pesados
 * 2.Igualdade referencial(quando repasso a informacao para um componente filho, vale a pena utilizar useMemo pois evita que informacao seja recriada do zero )
 * 
 * useCallback / memorizar uma funcao
 * 1. qdo minha funcao vai ser repassada para os filhos e possui igualdade referencial, eh importante utilizar useCallback. Importante tbm para ser usado em contextos
 */