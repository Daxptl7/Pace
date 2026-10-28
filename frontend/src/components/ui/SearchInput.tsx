import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useId, useState, type FormEvent } from 'react'

export function SearchInput({
  onSearch,
  autoFocus = false,
}: {
  onSearch?: () => void
  autoFocus?: boolean
}) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const id = useId()
  function submit(event: FormEvent) {
    event.preventDefault()
    navigate(
      query.trim()
        ? `/search?q=${encodeURIComponent(query.trim())}`
        : '/search',
    )
    onSearch?.()
  }
  return (
    <form role="search" className="search-input" onSubmit={submit}>
      <button aria-label="Submit search" type="submit">
        <Search size={20} />
      </button>
      <label className="sr-only" htmlFor={id}>
        Search the store
      </label>
      <input
        id={id}
        type="search"
        placeholder="Search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        autoFocus={autoFocus}
        autoComplete="off"
        maxLength={120}
      />
    </form>
  )
}
