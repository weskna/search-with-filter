import { useEffect, useState } from "react";

const SearchFilter = ({
  label,
  placeholder,
  name,
  searchQuery,
  setSearchQuery,
  items,
  selectedItems,
  setSelectedItems,
  page,
  setPage
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeItems, setActiveItems] = useState([]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    setActiveItems(selectedItems.map(({ id }) => id));
    if (activeItems.length !== 0 && activeItems.length % 4 === 0) {
      setPage(page + 1);
    }
  }, [selectedItems]);

  return (
    <div>
      <div>
        <label htmlFor={name} style={{ display: "block" }}>
          {label}
        </label>
        <input
          type="search"
          placeholder={placeholder}
          id={name}
          name={name}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsVisible(true)}
        />
        {isVisible && (
          <div
            onScroll={handleScroll}
            style={{
              overflowY: "scroll",
              maxHeight: "100px",
              background: "gray",
              margin: "0.5rem",
              padding: "1.5rem"
            }}
          >
            {items
              .filter(({ id }) => true === !activeItems.includes(id))
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    const _selectedItems = [...selectedItems];
                    const index = _selectedItems.findIndex(
                      (element) => element.id == item.id
                    );
                    if (index === -1) {
                      setSelectedItems([...selectedItems, item]);
                    }
                    setIsVisible(false);
                  }}
                >
                  {item.name}
                </div>
              ))}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "0.5rem"
        }}
      >
        {selectedItems &&
          selectedItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "lightGray",
                fontSize: "0.75rem",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.75rem"
              }}
            >
              {item.name}
              <button
                type="button"
                onClick={() => {
                  let _selectedItems = [...selectedItems];
                  _selectedItems = _selectedItems.filter(
                    (element) => element.id !== item.id
                  );
                  setSelectedItems(_selectedItems);
                }}
              >
                x
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchFilter;
