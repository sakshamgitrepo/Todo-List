import React from 'react'

const Search = ({search, setSearch}) => {
  return (
    <form className='searchForm' onSubmit={(e)=>e.preventDefault}> 
<input type='text' id='search' role='searchbox' placeholder='Search Item' value={search}
onChange={(e)=>setSearch(e.target.value)}/>
</form>
)
  
}

export default Search;