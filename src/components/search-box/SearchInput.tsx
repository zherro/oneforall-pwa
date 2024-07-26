import { useCallback, useEffect, useState } from "react";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import SearchBoxStyle from "./styled";
import { SemiSpan } from "../Typography";

export default function SearchInput({
  placeholder,
  onSearch,
  finding = false,
}: {
  placeholder?: string;
  onSearch?: any;
  finding?: boolean;
}) {
  const [query, setQuery] = useState<string>('');
  const hanldeSearch = useCallback((event: any) => {
    event.persist();
    setQuery(event.target.value);
  }, []);

  const search = useCallback(() => {
    if (query == null || query == undefined || query.trim().length < 3) {
      onSearch();
    } else if (query.trim().length > 2) {
      const q = query+'';
      setQuery('')
      onSearch(q);
    }
  }, [query]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <SearchBoxStyle>
        <Icon className="search-icon" size="18px">
          search
        </Icon>

        <TextField
          fullwidth
          value={query}
          onChange={hanldeSearch}
          onKeyDown={handleKeyDown}
          className="search-field"
          placeholder={placeholder}
        />

        <Button
          type="button"
          className="search-button"
          variant="contained"
          color="primary"
          onClick={search}
        >
          {finding ? "Buscando..." : "Buscar"}
        </Button>
      </SearchBoxStyle>

      {query == null ||
        query == undefined ||
        (query.trim().length > 0 && query.trim().length < 3 && (
          <Box>
            <SemiSpan color="error.main">Digite ao menos 3 caracteres</SemiSpan>
          </Box>
        ))}
    </Box>
  );
}

const dummySearchResult = [
  "Macbook Air 13",
  "Ksus K555LA",
  "Acer Aspire X453",
  "iPad Mini 3",
];
