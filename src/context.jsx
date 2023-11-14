/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import Loading from "./Loading";
import reducer from "./reducer";
const url = "https://course-api.com/react-tours-project";

const initialState = {
  loading: false,
  data: [],
  readmore: false,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const removeTour = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const readMore = () => {
    dispatch({ type: "READMORE" });
  };

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const resp = await fetch(url);
    const items = await resp.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: items });
  };

  // const [readmore, setReadmore] = useState(false);

  useEffect(() => {
    // fetchTours();
    fetchData();
  }, []);

  if (state.loading) return <Loading />;
  if (state.data.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchData()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <AppContext.Provider
      value={{
        // readMore,
        // setReadmore,
        removeTour,
        readMore,
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
