import { createContext, useState } from "react";

export const GlobalContext = createContext({
  filterData: [],
  setFilterData: () => {},
  singleProdData: [],
  setSingleProdData: () => {},
  cartInfo: [],
  setCartInfo: () => {},
  wishlistInfo: [],
  setWishlistInfo: () => {},
  update: 0,
  setUpdate: () => 0,
});

export function GlobalState({ children }) {
  const [filterData, setFilterData] = useState([]);
  const [singleProdData, setSingleProdData] = useState([]);
  const [cartInfo, setCartInfo] = useState([]);
  const [wishlistInfo, setWishlistInfo] = useState([]);
  const [update, setUpdate] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        filterData,
        setFilterData,
        singleProdData,
        setSingleProdData,
        update,
        setUpdate,
        cartInfo,
        setCartInfo,
        wishlistInfo,
        setWishlistInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
