import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link, useSearchParams } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const [pageWindowStart, setPageWindowStart] = useState(1);
  const [searchParams] = useSearchParams();
  
  const itemsPerPage = 9; // Display 9 recipes per page (3x3 grid)
  const pagesPerWindow = 10; // Show 10 page numbers at a time

  useEffect(() => {
    // Get search query from URL params
    const urlSearch = searchParams.get("search") || "";
    setSearchQuery(urlSearch);
  }, [searchParams]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const recipeCollection = collection(db, "recipes");
        const recipeSnapshot = await getDocs(recipeCollection);
        const recipeList = recipeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(recipeList);
        setFilteredRecipes(recipeList);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes based on search query
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = recipes.filter((recipe) => {
      const name = (recipe.recipe_name || recipe.Name || "").toLowerCase();
      const ingredients = (recipe.ingredients || recipe.Ingredients || "").toLowerCase();
      const directions = (recipe.directions || recipe.Instructions || "").toLowerCase();
      
      return (
        name.includes(query) ||
        ingredients.includes(query) ||
        directions.includes(query)
      );
    });
    setFilteredRecipes(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery, recipes]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, endIndex);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handlePrevPageWindow = () => {
    if (pageWindowStart > 1) {
      setPageWindowStart(pageWindowStart - pagesPerWindow);
    }
  };

  const handleNextPageWindow = () => {
    if (pageWindowStart + pagesPerWindow <= totalPages) {
      setPageWindowStart(pageWindowStart + pagesPerWindow);
    }
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(pageInput);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      // Adjust window to show the selected page
      const newWindowStart = Math.floor((pageNum - 1) / pagesPerWindow) * pagesPerWindow + 1;
      setPageWindowStart(newWindowStart);
      setPageInput("");
    }
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  // Calculate which pages to display in the current window
  const pageWindowEnd = Math.min(pageWindowStart + pagesPerWindow - 1, totalPages);
  const visiblePages = Array.from(
    { length: pageWindowEnd - pageWindowStart + 1 },
    (_, i) => pageWindowStart + i
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Recipe List</h2>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-8">
        <input
          type="text"
          placeholder="Search recipes by name, ingredients, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-orange-300 focus:border-orange-600 focus:outline-none shadow-md transition duration-300"
        />
        {searchQuery && (
          <p className="text-sm text-gray-600 mt-2">
            Found {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600" />
          <p className="mt-4 text-gray-600 font-semibold">Loading recipes...</p>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No recipes found matching "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <>
          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mb-8 justify-items-stretch">
            {currentRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={recipe.img_src || recipe.ImageUrl || "https://via.placeholder.com/300"}
                  alt={recipe.recipe_name || recipe.Name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-800 truncate">
                    {recipe.recipe_name || recipe.Name}
                  </h3>

                  {recipe.rating && (
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="ml-2 text-gray-700 font-semibold">{recipe.rating}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 mb-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {recipe.prep_time && (
                      <div>
                        <p className="font-semibold text-gray-800">Prep</p>
                        <p>{recipe.prep_time}</p>
                      </div>
                    )}
                    {recipe.cook_time && (
                      <div>
                        <p className="font-semibold text-gray-800">Cook</p>
                        <p>{recipe.cook_time}</p>
                      </div>
                    )}
                    {recipe.total_time && (
                      <div>
                        <p className="font-semibold text-gray-800">Total</p>
                        <p>{recipe.total_time}</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-3 text-sm text-gray-700">
                    {recipe.servings && <p><strong>Servings:</strong> {recipe.servings}</p>}
                    {recipe.yield && <p><strong>Yield:</strong> {recipe.yield}</p>}
                  </div>

                  {recipe.ingredients && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-800 mb-1">Ingredients:</p>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {typeof recipe.ingredients === "string"
                          ? recipe.ingredients.substring(0, 80) + "..."
                          : recipe.ingredients}
                      </p>
                    </div>
                  )}

                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="w-full block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="w-full p-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => {
                  setCurrentPage(1);
                  setPageWindowStart(1);
                }}
                disabled={currentPage === 1}
                className="px-3 py-1 font-semibold border-2 border-black bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-100 transition duration-300"
              >
                1
              </button>

              <button
                onClick={handlePrevPageWindow}
                disabled={pageWindowStart <= 1}
                className="px-2 py-1 font-semibold border-2 border-black bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-100 transition duration-300"
              >
                &lt;
              </button>

              {visiblePages.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`px-3 py-1 font-semibold border-2 border-black transition duration-300 ${
                    currentPage === page
                      ? "bg-orange-600 text-white"
                      : "bg-white text-black hover:bg-orange-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={handleNextPageWindow}
                disabled={pageWindowStart + pagesPerWindow > totalPages}
                className="px-2 py-1 font-semibold border-2 border-black bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-100 transition duration-300"
              >
                &gt;
              </button>

              <button
                onClick={() => {
                  setCurrentPage(totalPages);
                  const newWindowStart = Math.floor((totalPages - 1) / pagesPerWindow) * pagesPerWindow + 1;
                  setPageWindowStart(newWindowStart);
                }}
                disabled={currentPage === totalPages}
                className="px-3 py-1 font-semibold border-2 border-black bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-100 transition duration-300"
              >
                &gt;&gt;
              </button>

              <input
                type="number"
                placeholder="page"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyPress={handlePageInputKeyPress}
                min="1"
                max={totalPages}
                className="px-3 py-1 border-2 border-black w-16 text-center bg-white"
              />

              <button
                onClick={handleGoToPage}
                className="px-4 py-1 font-semibold border-2 border-black bg-white text-black hover:bg-orange-100 transition duration-300"
              >
                Go
              </button>
            </div>

            <p className="text-center text-gray-800 font-semibold mt-3">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Recipes;