import { useEffect, useState } from "react";
import SearchFilter from "./searchFilter";
import { useListBeersQuery, useSearchBeerQuery } from "../api/beersApi";

const Search = () => {
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(true);
  const [items, setItems] = useState([]);
  const { data: beersList, error, isLoading } = useListBeersQuery(page);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const { data: beerSearch, refetch } = useSearchBeerQuery(searchQuery, {
    skip: !searchQuery
  });

  useEffect(() => {
    setItems(beerSearch);
  }, [beerSearch]);

  useEffect(() => {
    setItems(beersList);
  }, [beersList]);

  useEffect(() => {
    if (!searchQuery || searchQuery === "") {
      setItems(beersList);
    }
  }, [searchQuery]);

  const onSearch = () => {};

  return (
    <div>
      <SearchFilter
        label="Search beer"
        placeholder="Search beer by name ..."
        name="search"
        items={items}
        page={page}
        setPage={setPage}
        disabled={isLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <br />
    </div>
  );
};

export default Search;
