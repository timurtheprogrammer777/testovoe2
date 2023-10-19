import React, { useState } from 'react';
import data from '../../data/data';

const Form = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ЖК");
  const [selectedFilters, setSelectedFilters] = useState([]);


  const handleFilterChange = (category, value) => {
    const existingFilter = selectedFilters.find(filter => filter.category === category && filter.value === value);

    if (existingFilter) {
      const updatedFilters = selectedFilters.filter(filter => filter !== existingFilter);
      setSelectedFilters(updatedFilters);
    } else {
      const newFilter = { category, value };
      setSelectedFilters(prevFilters => [...prevFilters, newFilter]);
    }
  };

  const handleToggleDropdown = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const isFilterSelected = (category, value) => {
    return selectedFilters.some(filter => filter.category === category && filter.value === value);
  };

  const selectedCount = selectedFilters.length;

  return (
    <form className="form" action='#'>
      <h1 className='form__title'>Локация</h1>
      <button className={`form__button ${isOpen ? 'open' : ''}`} onClick={handleToggleDropdown}>
        ЖК, Округ, район, метро <span className={selectedCount > 0 ? `form__span` : ''}>{selectedCount > 0 ? `${selectedCount}` : ''}</span>
      </button>
      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
        <div className="dropdown__filter">
          {Object.keys(data).map(tab => (
            <div key={tab} className={`dropdown__filter-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </div>
          ))}
        </div>

        <ul className={selectedCount > 0 ? `selected-list selected-list_active` : `selected-list`}>
          {selectedFilters.map((filter, index) => (
            <li className='selected-list__item' key={index}>
              <button
                className={`selected-list__item-btn ${isFilterSelected(filter.category, filter.value) ? 'selected' : ''}`}
                onClick={() => handleFilterChange(filter.category, filter.value)}
              >
                {filter.value}
              </button>
            </li>
          ))}
        </ul>

        <div className={selectedCount > 0 ? `dropdown-values dropdown-values_active` : `dropdown-values`}>
          {data[activeTab].map(value => (
            <button key={value} className={`dropdown-values__btn ${isFilterSelected(activeTab, value) ? 'selected' : ''}`} onClick={() => handleFilterChange(activeTab, value)}>
              {value}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};

export default Form;
