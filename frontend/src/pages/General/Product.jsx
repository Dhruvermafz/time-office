import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../component/Common/Pagination";
import ProductFilter from "../../component/Product/ProductFilter";
import SingleProduct from "../../component/Product/SingleProduct";
import axios from "axios";
import { API_URL } from "../../constants"; // Ensure API_URL points to http://localhost:4000/api

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [data, setData] = useState([]); // Holds all products data
  const [filteredData, setFilteredData] = useState([]); // Holds filtered products data
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("");

  const itemsPerPage = 20;

  // Function to get the category slug from URL query params
  const getCategorySlugFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("cate"); // Get the 'cate' parameter from the query string
  };

  // Fetch products on page load or when the category slug changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const slug = getCategorySlugFromQuery(); // Get slug from URL
        setSelectedCategorySlug(slug); // Update state with the slug

        // Fetch all products if no search results are available
        if (!slug && (!location.state || !location.state.searchResult)) {
          const response = await axios.get(`${API_URL}/product`);
          const products = response.data.products || [];
          setData(products);
          setFilteredData(products); // Show all products initially
        } else if (location.state && location.state.searchResult) {
          // If search results are available from the location state
          setData(location.state.searchResult);
          setFilteredData(location.state.searchResult);
        } else if (slug) {
          // Fetch filtered products based on category slug
          const response = await axios.get(
            `${API_URL}/product/filter/${encodeURIComponent(slug)}`
          );

          const filteredProducts = response.data.products || [];
          setFilteredData(filteredProducts); // Update filtered data
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [location.search]); // Re-run when the query parameters change (like category slug)

  // Toggle filter visibility
  const handleFill = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Filter products based on category slug
  const handleFilter = async (slug) => {
    setSelectedCategorySlug(slug); // Set the selected category slug

    if (slug) {
      try {
        const response = await axios.get(
          `${API_URL}/product/filter/${encodeURIComponent(slug)}`
        );

        const filteredProducts = response.data.products || [];
        setFilteredData(filteredProducts); // Update filtered products
        setCurrentPage(1); // Reset to page 1 when applying filter

        // Update the URL to reflect the selected category slug
        navigate(`/store?cate=${slug}`);
      } catch (error) {
        console.error("Error filtering products:", error);
        setFilteredData([]); // Show empty list if filter fails
      }
    } else {
      setFilteredData(data); // Show all products if no category is selected
      navigate("/store"); // Reset to the store page with no category
    }
  };

  // Handle pagination changes
  const totalItems = filteredData.length || 0;
  const pageCount = Math.ceil(totalItems / itemsPerPage); // Calculate page count
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Slice the products for the current page
  const displayedItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="page-content">
      {/* Start Container Fluid */}
      <div className="container-xxl">
        <div className="row">
          {isFilterVisible && (
            <ProductFilter
              isFilterVisible={isFilterVisible}
              handleFilter={handleFilter}
            />
          )}

          <div className={isFilterVisible ? "col-lg-9" : "col-lg-12"}>
            <div className="card bg-light-subtle">
              <div className="card-header border-0">
                <div className="row justify-content-between align-items-center">
                  <div className="col-lg-6">
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item fw-medium">
                        <a href="javascript: void(0);" className="text-dark">
                          {selectedCategorySlug || "All Categories"}
                        </a>
                      </li>
                      <li className="breadcrumb-item active">Store</li>
                    </ol>
                    <p className="mb-0 text-muted">
                      Showing all{" "}
                      <span className="text-dark fw-semibold">
                        {totalItems}
                      </span>{" "}
                      items results
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <div className="text-md-end mt-3 mt-md-0">
                      <button
                        type="button"
                        className="btn btn-outline-secondary me-1"
                        onClick={handleFill}
                      >
                        <i className="bx bx-filter-alt me-1"></i> Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <SingleProduct
                products={displayedItems} // Pass the sliced products to SingleProduct
                currentPage={currentPage}
                itemNo={itemsPerPage}
              />
            </div>
            {/* Pagination Component */}
            <Pagination
              pageCount={pageCount} // Pass page count
              currentPage={currentPage} // Pass current page
              onPageChange={handlePageChange} // Handle page change
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
