import { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { HOST } from "../../config/config";
import Swal from "sweetalert2";

const ProductSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!searchTerm.trim()) {
        return;
      }
      const response = await fetch(`${HOST}/api/products/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName: searchTerm }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setSearched(true);
        setIsDropdownVisible(true);
      } else {
        Swal.fire({
          title: `Error al buscar productos: ${response.statusText} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
        if (response.status === 404) {
          setSearchResults([]);
          setSearched(true);
          setIsDropdownVisible(true);
        }
      }
    } catch (error) {
      Swal.fire({
        title: `Error al buscar productos: ${error} `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleLinkClick = () => {
    setIsDropdownVisible(false);
    setSearchTerm("");
  };

  return (
    <div className="searcherContainer">
      <form className="headerFormu" onSubmit={handleFormSubmit}>
        <input
          className="inputHerderFormu"
          type="search"
          placeholder="Buscar..."
          aria-label="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="btnHeaderFormu" type="submit">
          <SearchIcon />
        </button>
      </form>
      <div className="containerListSearch">
        <ul style={{ display: isDropdownVisible ? "block" : "none" }}>
          {searched &&
            (Array.isArray(searchResults.data) &&
            searchResults.data.length > 0 ? (
              searchResults.data.map((result) => (
                <li
                  className="result"
                  key={result._id}
                  onClick={handleLinkClick}
                >
                  <Link to={`/product/${result._id}`}>
                    <img
                      src={`${HOST}/static/products/img/${result.thumbnails[0].name}`}
                      alt={`${result.title}-${result.id}`}
                    />
                    <h3>{result.title}</h3>
                    <h3>${result.price}</h3>
                  </Link>
                </li>
              ))
            ) : (
              <li className="notFoundSearch">No hay resultados</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductSearchForm;
