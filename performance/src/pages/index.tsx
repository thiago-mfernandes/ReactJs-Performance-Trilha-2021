import { SearchResults } from "@/components/SearchResults";
import { FormEvent, useState } from "react"


export default function Home() {

  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    //se a minha busca nao estiver vazia, inclusive sem espacos vazios
    if(!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setResults(data);
  }

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults results={results} />
    </div>
  )
}

// FLUXO DE RENDERIZACAO
/**
 * 1. criar uma nova versao do componente
 * 2. comparara com a versao anterior
 * 3. se houver alteracoes, atualizar o que alterou
 */
