import "../styles/FilterSidebar.css";

export default function FilterSidebar({ setFilter, categoryFilter, setCategoryFilter }) {
  const categories = ["Electronics", "Accessories", "Audio"];

  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>

      <div className="filter-group">
        <h4>Category</h4>
        <div className="category-filters">
          <label>
            <input
              type="radio"
              name="category"
              value=""
              checked={categoryFilter === ""}
              onChange={() => setCategoryFilter("")}
            />
            All Products
          </label>
          {categories.map(cat => (
            <label key={cat}>
              <input
                type="radio"
                name="category"
                value={cat}
                checked={categoryFilter === cat}
                onChange={() => setCategoryFilter(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Price</h4>
        <div className="price-filters">
          <button 
            onClick={() => setFilter("low")}
            className="filter-btn"
          >
            ⬆️ Low to High
          </button>
          <button 
            onClick={() => setFilter("high")}
            className="filter-btn"
          >
            ⬇️ High to Low
          </button>
        </div>
      </div>
    </aside>
  );
}