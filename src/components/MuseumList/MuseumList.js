import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import styles from "./museumlist.module.css";
import { Header } from "../Header/Header";

const MuseumList = () => {
  const [museums, setMuseums] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchMuseums = async () => {
      try {
        const response = await axios.get("https://museum-api.fly.dev/museums");
        const responseCategories = await axios.get(
          "https://museum-api.fly.dev/categories"
        );
        setMuseums(response.data.museums);
        setCategories(responseCategories.data.categories);
      } catch (error) {
        console.log("Erreur", error);
      }
    };
    fetchMuseums();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(0);
  };

  const handleSearch = (e) => {
    setSearchByName(e.target.value);
    setCurrentPage(0);
  };

  const filteredMuseums = museums.filter(
    (museum) =>
      museum.name.toLowerCase().includes(searchByName.toLowerCase()) &&
      (selectedCategory === "" ||
        museum.category.id === parseInt(selectedCategory))
  );

  const offset = currentPage * itemsPerPage;
  const currentPageItems = filteredMuseums.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredMuseums.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.searchContainer}>
        <input value={searchByName} onChange={handleSearch} />
        <button onClick={handleSearch} className={styles.buttonMaps}>
          Recherche
        </button>
      </div>
      <div>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.containerCard}>
        {currentPageItems.map((museum) => (
          <div key={museum.id} className={styles.cardMuseum}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <h2>{museum.name}</h2>
                {museum.address && (
                  <div>
                    <p>{museum.address.line1}</p>
                    <p>
                      {museum.address.city}, {museum.address.postal_code}
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.cardBack}>
                <h2>{museum.name}</h2>
                <p>{museum.history}</p>
                {museum.address && (
                  <div>
                    <p>{museum.address.line1}</p>
                    <p>
                      {museum.address.city}, {museum.address.postal_code}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <button className={styles.buttonMaps}>Where to find me ?</button>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Précédent"}
        nextLabel={"Suivant"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default MuseumList;
