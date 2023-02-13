
export interface AddProductToWIshListProps {
  onAddToWishList: () => void;
  onRequestClose: () => void;
}

export default function AddProductToWIshList({ onAddToWishList, onRequestClose }: AddProductToWIshListProps) {
  return (
    <div>
      <span>Deseja adicionar ao favoritos?</span>
      <button onClick={onAddToWishList}>Sim</button>
      <button onClick={onRequestClose}>Não</button>
    </div>
  )
}