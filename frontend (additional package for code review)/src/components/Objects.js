import { Container, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import Logo from './Logo';
import AllHeads from './AllHeads';
import Footer from './Footer';

function Objects() {

  const { type, category } = useParams();
  const [lgObjects, setLgObjects] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { language } = useLanguage();
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [selectedMetro, setSelectedMetro] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedNewBuildingName, setselectedNewBuildingName] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState([]);
  const [fromArea, setFromArea] = useState('');
  const [toArea, setToArea] = useState('');
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  const [fromKitchenArea, setFromKitchenArea] = useState('');
  const [toKitchenArea, setToKitchenArea] = useState('');
  const [offerType, setOfferType] = useState('');
  const [street, setStreet] = useState('');
  const [residential, setResidential] = useState('');
  const [filteredStreets, setFilteredStreets] = useState([]);
  const [showStreetDropdown, setShowStreetDropdown] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (newPage) => {
    window.scroll(0, 0);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      handleFetchData();
    }
  };

  const setCurrentPageWhenUsingFilter = () => {
    setCurrentPage(0);
  };

  const pagination = (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        style={{
          height: '2.5rem',
          background: '#0d0d13',
          width: '6rem',
          margin: '0.2rem',
          fontWeight: '200',
          fontSize: '1rem',
          color: '#c6c6c6bf',
          border: '1px solid #91909066',
        }}
      >
        {language === 'en' ? 'Previous' : 'Попередня'}
      </button>

      {currentPage - 1 > 1 && (
        <>
          <button
            onClick={() => handlePageChange(0)}
            style={{
              height: '2.5rem',
              background: '#0d0d13',
              width: '3rem',
              margin: '0.2rem',
              fontWeight: '300',
              fontSize: '1rem',
              color: '#c6c6c6bf',
              border: '1px solid #91909066',
            }}
          >1</button>
        </>
      )}

      {currentPage - 2 > 1 && (
        <div className='mx-3'></div>
      )}


      {[...Array(totalPages).keys()].slice(currentPage > 2 ? currentPage - 2 : 0, currentPage + 3).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={currentPage === pageNumber}
            style={{
              height: '2.5rem',
              background: currentPage === pageNumber ? '#2e2e38' : '#0d0d13',
              width: '3rem',
              margin: '0.2rem',
              fontWeight: '300',
              fontSize: '1rem',
              color: '#c6c6c6bf',
              border: '1px solid #91909066',
            }}
          >
            {pageNumber + 1}
          </button>
        )
      )}



      {currentPage + 3 < totalPages && (
        <>
          <div className='mx-3'></div>
          <button
            onClick={() => handlePageChange(totalPages - 1)}
            style={{
              height: '2.5rem',
              background: '#0d0d13',
              width: '3rem',
              margin: '0.2rem',
              fontWeight: '300',
              fontSize: '1rem',
              color: '#c6c6c6bf',
              border: '1px solid #91909066',
            }}
          >{totalPages}</button>
        </>
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        style={{
          height: '2.5rem',
          background: '#0d0d13',
          width: '6rem',
          margin: '0.2rem',
          fontWeight: '100',
          fontSize: '1rem',
          color: '#c6c6c6bf',
          border: '1px solid #91909066',
        }}
      >
        {language === 'en' ? 'Next' : 'Наступна'}
      </button>
    </div>
  );

  const handleInputChange = (event) => {
    const inputStreet = event.target.value;
    setStreet(inputStreet);

    const filtered = Array.from(new Set(
      filterData
        .filter(filterData => filterData.street && filterData.street.toLowerCase().includes(inputStreet.toLowerCase()))
        .map(filterData => filterData.street)
    ));

    setFilteredStreets(filtered);
    setShowStreetDropdown(!!inputStreet && filtered.length > 0);
  };

  const handleStreetDropdownClick = (selectedStreet) => {
    setStreet(selectedStreet);
    setShowStreetDropdown(false);
  };

  const filterResidential = (input) => {
    setResidential(input);
  };

  function applyFiltersArea() {
    setNewFilterParams({ ...newFilterParams, fromArea, toArea });
  }

  function applyFiltersPrice() {
    setNewFilterParams({ ...newFilterParams, fromPrice, toPrice });
  }

  function applyFiltersKitchenArea() {
    setNewFilterParams({ ...newFilterParams, fromKitchenArea, toKitchenArea });
  }

  const [newFilterParams, setNewFilterParams] = useState({
    district: [],
    rooms: [],
    newBuildingName: [],
    metro: [],
    floor: [],
    fromArea: '',
    toArea: '',
    fromPrice: '',
    toPrice: '',
    fromKitchenArea: '',
    toKitchenArea: '',
    offerType: '',
    street: '',
  });

  const handleCheckboxChange = (value, parameterType) => {
    switch (parameterType) {
      case 'district':
        setSelectedDistrict((prevSelected) => toggleCheckbox(prevSelected, value));
        break;
      case 'rooms':
        setSelectedRooms((prevSelected) => toggleCheckbox(prevSelected, value));
        break;
      case 'newBuildingName':
        setselectedNewBuildingName((prevSelected) => toggleCheckbox(prevSelected, value));
        break;
      case 'metro':
        setSelectedMetro((prevSelected) => toggleCheckbox(prevSelected, value));
        break;
      case 'floor':
        setSelectedFloor((prevSelected) => toggleCheckbox(prevSelected, value));
        break;
      case 'offerType':
        setOfferType((prevSelected) => toggleCheckbox(prevSelected, value));
        break;
      default:
        break;
    }
  };

  const toggleCheckbox = (prevSelected, value) => {
    if (prevSelected.includes(value)) {
      return prevSelected.filter((item) => item !== value);
    } else {
      return [...prevSelected, value];
    }
  };

  const handleFetchData = () => {
    setNewFilterParams({
      district: selectedDistrict.join(','),
      rooms: selectedRooms.join(','),
      newBuildingName: selectedNewBuildingName.join(','),
      metro: selectedMetro.join(','),
      floor: selectedFloor.join(','),
      fromArea,
      toArea,
      fromPrice,
      toPrice,
      fromKitchenArea,
      toKitchenArea,
      offerType,
      street,
    });
  };

  useEffect(() => {
    const { district, rooms, newBuildingName, metro, floor, fromArea, toArea, fromPrice, toPrice, fromKitchenArea, toKitchenArea, offerType, street } = newFilterParams;
    fetch(`https://levelgroup.com.ua/api/${type}/${category}?district=${district ||
    // fetch(`http://localhost:8080/api/${type}/${category}?district=${district ||
      ''}&rooms=${rooms || ''}&newBuildingName=${newBuildingName || ''}&metro=${metro ||
      ''}&fromArea=${fromArea || ''}&toArea=${toArea || ''}&fromPrice=${fromPrice || ''}&toPrice=${toPrice ||
      ''}&offerType=${offerType || ''}&street=${street.toLowerCase() ||
      ''}&fromKitchenArea=${fromKitchenArea || ''}&toKitchenArea=${toKitchenArea || ''}&floor=${floor || ''}&page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        const parsedData = JSON.parse(data.data);
        const totalPages = data.totalPages;
        setTotalPages(totalPages);
        const parsedDataForFilters = JSON.parse(data.dataForFilters);
        setFilterData(parsedDataForFilters);

        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const updatedLgObjects = parsedData.map(lgObject => ({
          ...lgObject,
          addedToCart: cartItems.some(cartItem => cartItem.id === lgObject.id),
          currency: lgObject.currency,
        }));

        updatedLgObjects.sort((a, b) => {
          if (a.currency === '$' && b.currency !== '$') {
            return -1;
          }
          if (a.currency !== '$' && b.currency === '$') {
            return 1;
          }
          return b.price - a.price;
        });

        setLgObjects(updatedLgObjects);

        const newCartCount = updatedLgObjects.filter(lgObject => lgObject.addedToCart).length;
        setCartCount(newCartCount);

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [newFilterParams]);



  const handleClearFilters = () => {
    setCurrentPage(0);
    setSelectedDistrict([]);
    setSelectedRooms([]);
    setselectedNewBuildingName([]);
    setSelectedMetro([]);
    setSelectedFloor([]);
    setFromArea('');
    setToArea('');
    setFromPrice('');
    setToPrice('');
    setFromKitchenArea('');
    setToKitchenArea('');
    setOfferType('');
    setStreet('');
    setResidential('');

    setNewFilterParams({
      district: [],
      rooms: [],
      newBuildingName: [],
      metro: [],
      floor: [],
      fromArea: '',
      toArea: '',
      fromPrice: '',
      toPrice: '',
      fromKitchenArea: '',
      toKitchenArea: '',
      offerType: '',
      street: '',
    });
  };





  function addToCart(id) {
    const newLgObjects = lgObjects.map(lgObject => ({
      ...lgObject,
      addedToCart: lgObject.id === id ? true : lgObject.addedToCart
    }));
    setLgObjects(newLgObjects);

    const cartItems = newLgObjects
      .filter((lgObject) => lgObject.addedToCart)
      .map((lgObject) => ({
        type: type,
        category: category,
        id: lgObject.id,
        image: lgObject.image,
        street: lgObject.street,
        buildingNumber: lgObject.buildingNumber,
        district: lgObject.district,
        totalArea: lgObject.totalArea,
        rooms: lgObject.rooms,
        floor: lgObject.floor,
        floors: lgObject.floors,
        price: lgObject.price,
        currency: lgObject.currency,
      }));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    const newCartCount = newLgObjects.filter(lgObject => lgObject.addedToCart).length;
    setCartCount(newCartCount);

  }

  function removeFromCart(id) {
    const newLgObjects = lgObjects.map(lgObject => ({
      ...lgObject,
      addedToCart: lgObject.id === id ? false : lgObject.addedToCart
    }));
    console.log(id);
    setLgObjects(newLgObjects);

    const cartItems = newLgObjects
      .filter((lgObject) => lgObject.addedToCart)
      .map((lgObject) => ({
        type: type,
        category: category,
        id: lgObject.id,
        image: lgObject.image,
        street: lgObject.street,
        buildingNumber: lgObject.buildingNumber,
        district: lgObject.district,
        totalArea: lgObject.totalArea,
        rooms: lgObject.rooms,
        floor: lgObject.floor,
        floors: lgObject.floors,
        price: lgObject.price,
        currency: lgObject.currency,
      }));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    const newCartCount = newLgObjects.filter(lgObject => lgObject.addedToCart).length;
    setCartCount(newCartCount);

  }

  const handleButtonClick = (e, id) => {
    e.preventDefault();
    if (!lgObjects.find(lgObject => lgObject.id === id).addedToCart) {
      addToCart(id);
    } else {
      removeFromCart(id);
    }
  };

  const cartCountStyle = {
    color: cartCount > 0 ? 'rgb(173, 129, 82)' : '#0d0d13',
  };

  return (
    <>
      <div className='my-header'>
        <Container className='cont-header'>
          <Logo />
          <AllHeads />
        </Container>

        <a className="up-button" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#c6c6c6bf" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
          </svg>
        </a>
      </div>

      <Container className='content-start'>
        <motion.div
          initial={{ opacity: 0, transition: { duration: 1 } }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >

          {type === 'buy' && <div className='title-size text-center my-2'>{language === 'en' ? 'BUYING OBJECTS CATALOG' : 'КАТАЛОГ ОБ`ЄКТІВ ПРОДАЖУ'}</div>}
          {type === 'rent' && <div className='title-size text-center my-2'>{language === 'en' ? 'RENT OBJECTS CATALOG' : 'КАТАЛОГ ОБ`ЄКТІВ ОРЕНДИ'}</div>}

          <div className={`sticky-dropdown ${showAdvancedFilter ? 'expanded' : 'collapsed'}`}>


            {/* Filter */}

            <div className='filters-beeg'>



              <div className={'dropdown-container'}>

                <div className='dropdown-interior-container'>
                  <div className="dropdown">
                    <div className="card-address filter-text px-3">
                      {language === 'en' ? 'District' : 'Район'}
                    </div>
                    <ul className="dropdown-menu"
                      style={{ backgroundColor: '#0d0d13', maxHeight: '30rem', overflowY: 'auto', width: '24rem' }}
                    >
                      {Array.from(new Set(filterData
                        .filter(filterData => filterData.district !== 'to be confirmed')
                        .map(filterData => filterData.district)))
                        .map(district => (
                          <li key={district}>
                            <label className="checkbox-label filter-dropdown-text">
                              <input
                                className='mx-3 customCheckbox checkbox-input-size'
                                type="checkbox"
                                value={district}
                                checked={selectedDistrict.includes(district)}
                                onChange={() => handleCheckboxChange(district, 'district')}
                              />
                              {district}
                            </label>
                          </li>
                        ))}
                      <li>
                        <button
                          className='m-3'
                          onClick={() => {
                            handleFetchData();
                            setCurrentPageWhenUsingFilter();
                          }}
                          style={{
                            width: '12rem',
                            backgroundColor: 'transparent',
                            borderRadius: '0',
                            color: 'rgb(173, 129, 82)',
                            fontSize: '1.6rem',
                            fontWeight: '100',
                            border: '1px solid rgb(173, 129, 82)',
                            marginBottom: '4rem'
                          }}
                        >
                          {language === 'en' ? 'Apply' : 'Застосувати'}
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="dropdown filter-margin">
                    <div className="card-address filter-text px-3">
                      {language === 'en' ? 'Residential' : 'ЖК'}
                    </div>
                    <ul className="dropdown-menu"
                      style={{ backgroundColor: '#0d0d13', maxHeight: '30rem', overflowY: 'auto', width: '28rem' }}
                    >
                      <input
                        className='street-input my-4 mx-5'
                        type="text"
                        placeholder={language === 'en' ? 'Enter the residentia name' : 'Введіть назву ЖК'}
                        value={residential}
                        onChange={(e) => filterResidential(e.target.value)}
                      />
                      {Array.from(new Set(filterData
                        .filter(filterData => filterData.newBuildingName !== 'to be confirmed' && filterData.newBuildingName.toLowerCase().includes(residential))
                        .map(filterData => filterData.newBuildingName)))
                        .map(newBuildingName => (
                          <li key={newBuildingName}>
                            <label className="checkbox-label filter-dropdown-text">
                              <input
                                className='mx-3 customCheckbox checkbox-input-size'
                                type="checkbox"
                                value={newBuildingName}
                                checked={selectedNewBuildingName.includes(newBuildingName)}
                                onChange={() => handleCheckboxChange(newBuildingName, 'newBuildingName')}
                              />
                              {newBuildingName}
                            </label>
                          </li>
                        ))}
                      <li>
                        <button
                          className='m-3'
                          onClick={() => {
                            handleFetchData();
                            setCurrentPageWhenUsingFilter();
                          }}
                          style={{
                            width: '12rem',
                            backgroundColor: 'transparent',
                            borderRadius: '0',
                            color: 'rgb(173, 129, 82)',
                            fontSize: '1.6rem',
                            fontWeight: '100',
                            border: '1px solid rgb(173, 129, 82)',
                            marginBottom: '4rem'
                          }}
                        >
                          {language === 'en' ? 'Apply' : 'Застосувати'}
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="dropdown">
                    <div className="card-address filter-text px-3">
                      {language === 'en' ? 'Area' : 'Площа'}
                    </div>

                    <ul className="dropdown-menu"
                      style={{
                        backgroundColor: '#0d0d13',
                        border: '1px solid #91909066',
                        borderRadius: '0',
                        paddingTop: '2rem',
                        height: '8rem'
                      }}>
                      <div className='d-flex'>
                        <input
                          className='filter-dropdown-text'
                          type="text"
                          placeholder={language === 'en' ? ' From' : ' Від'}
                          value={fromArea}
                          onChange={(e) => setFromArea(e.target.value)}
                          style={{
                            border: 'none',
                            width: '10rem',
                            height: '3rem',
                            margin: '1rem',
                            color: 'white',
                            backgroundColor: '#0d0d13',
                            borderBottom: '1px solid #91909066',
                            outline: 'none',
                          }}
                        />
                        <input
                          className='filter-dropdown-text'
                          type="text"
                          placeholder={language === 'en' ? ' To' : ' До'}
                          value={toArea}
                          onChange={(e) => setToArea(e.target.value)}
                          style={{
                            border: 'none',
                            width: '10rem',
                            height: '3rem',
                            marginTop: '1rem',
                            color: 'white',
                            backgroundColor: '#0d0d13',
                            borderBottom: '1px solid #91909066',
                            outline: 'none',
                          }}
                        />
                        <button
                          onClick={() => {
                            applyFiltersArea();
                            setCurrentPageWhenUsingFilter();
                          }}
                          className="filter-dropdown-text card-address"
                          style={{
                            margin: '1rem',
                            backgroundColor: '#0d0d13',
                            color: 'rgb(173, 129, 82)',
                            border: '1px solid rgb(173, 129, 82)',
                            cursor: 'pointer',
                            width: '10rem',
                            height: '3rem',
                          }}
                        >
                          {language === 'en' ? ' Apply' : ' Застосувати'}
                        </button>
                      </div>
                    </ul>
                  </div>

                  <div className="dropdown filter-margin">
                    <div className="card-address filter-text text-decoration-none px-3">
                      {language === 'en' ? 'Price' : 'Ціна'}
                    </div>
                    <ul className="dropdown-menu"
                      style={{
                        backgroundColor: '#0d0d13',
                        border: '1px solid #91909066',
                        borderRadius: '0',
                        paddingTop: '2rem',
                        height: '8rem'
                      }}>
                      <div className='d-flex'>
                        <input
                          className='filter-dropdown-text'
                          type="text"
                          placeholder={language === 'en' ? ' From' : ' Від'}
                          value={fromPrice}
                          onChange={(e) => setFromPrice(e.target.value)}
                          style={{
                            border: 'none',
                            width: '10rem',
                            height: '3rem',
                            margin: '1rem',
                            color: 'white',
                            backgroundColor: '#0d0d13',
                            borderBottom: '1px solid #91909066',
                            outline: 'none',
                          }}
                        />
                        <input
                          className='filter-dropdown-text'
                          type="text"
                          placeholder={language === 'en' ? ' To' : ' До'}
                          value={toPrice}
                          onChange={(e) => setToPrice(e.target.value)}
                          style={{
                            border: 'none',
                            width: '10rem',
                            height: '3rem',
                            marginTop: '1rem',
                            color: 'white',
                            backgroundColor: '#0d0d13',
                            borderBottom: '1px solid #91909066',
                            outline: 'none',
                          }}
                        />
                        <button
                          onClick={() => {
                            applyFiltersPrice();
                            setCurrentPageWhenUsingFilter();
                          }}
                          className="filter-dropdown-text card-address"
                          style={{
                            margin: '1rem',
                            backgroundColor: '#0d0d13',
                            color: 'rgb(173, 129, 82)',
                            border: '1px solid rgb(173, 129, 82)',
                            cursor: 'pointer',
                            width: '10rem',
                            height: '3rem',
                          }}
                        >
                          {language === 'en' ? ' Apply' : ' Застосувати'}
                        </button>
                      </div>
                    </ul>
                  </div>

                  <div className="dropdown">
                    <div className="card-address filter-text px-3">
                      {language === 'en' ? 'Rooms' : 'Кімнати'}
                    </div>
                    <ul className="dropdown-menu"
                      style={{ backgroundColor: '#0d0d13', maxHeight: '30rem', overflowY: 'auto', width: '16rem' }}
                    >
                      {Array.from(new Set(filterData.map(filterData => filterData.rooms)))
                        .sort((a, b) => a - b)
                        .map(rooms => (
                          <li key={rooms}>
                            <label className="checkbox-label filter-dropdown-text">
                              <input
                                className='mx-3 customCheckbox checkbox-input-size'
                                type="checkbox"
                                value={rooms}
                                checked={selectedRooms.includes(rooms)}
                                onChange={() => handleCheckboxChange(rooms, 'rooms')}
                              />
                              {rooms}
                            </label>
                          </li>
                        ))}
                      <li>
                        <button
                          className='m-3'
                          onClick={() => {
                            handleFetchData();
                            setCurrentPageWhenUsingFilter();
                          }}
                          style={{
                            width: '10rem',
                            backgroundColor: 'transparent',
                            borderRadius: '0',
                            color: 'rgb(173, 129, 82)',
                            fontSize: '1.6rem',
                            fontWeight: '100',
                            border: '1px solid rgb(173, 129, 82)',
                            marginBottom: '4rem'
                          }}
                        >
                          {language === 'en' ? 'Apply' : 'Застосувати'}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='dropdown-interior-container border-top-for-dropdovn-container'>
                  <div
                    className='d-flex align-items-center justify-content-center'
                    onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-address filter-dropdown-text text-decoration-none">
                      {language === 'en' ? 'Advanced filter' : 'Додаткові фільтри'}
                    </div>
                    <div className='advanced-filter-icon advanced-filter-icon-size'></div>
                  </div>

                  <div
                    className='d-flex align-items-center justify-content-center filter-margin'
                    onClick={handleClearFilters}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-address filter-dropdown-text text-decoration-none">
                      {language === 'en' ? 'Reset filters' : 'Очистити фільтри'}
                    </div>
                    <div className='reset-filters-icon reset-filters-icon-size mx-1'></div>
                  </div>




                  <Link
                    className='text-decoration-none d-flex align-items-center justify-content-around'
                    to={'/cart'}
                  >
                    <div className='filter-dropdown-text card-address mx-2'>{language === 'en' ? 'Favorites:' : 'Вибране:'}</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill={cartCount > 0 ? 'rgb(173, 115, 82)' : '#c6c6c6bf'}
                      className="bi bi-bookmark mt-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                    </svg>
                    <div className='filter-dropdown-text mx-2 mt-1' style={cartCountStyle}>
                      {cartCount}
                    </div>
                  </Link>
                </div>

              </div>




              {/* Advanced Filter */}



              {showAdvancedFilter && (

                <div className='d-flex'>
                  <div className='dropdown-container-advanced-filter'>
                    <div className='dropdown-input-container'>

                      <div>
                        <input
                          className='street-input'
                          type="text"
                          placeholder={language === 'en' ? 'Enter the street name' : 'Введіть назву вулиці'}
                          value={street}
                          onChange={handleInputChange}
                        />

                        {showStreetDropdown && (
                          <ul
                            className="dropdown-streets-menu"
                          >
                            {filteredStreets.map((filteredStreet, index) => (
                              <li key={index} onClick={() => handleStreetDropdownClick(filteredStreet)}>
                                {filteredStreet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <button
                        className='street-button'
                        onClick={() => {
                          handleFetchData();
                          setCurrentPageWhenUsingFilter();
                        }}
                      >
                        {language === 'en' ? 'Apply' : 'Застосувати'}
                      </button>
                    </div>



                    <div className='dropdown-interior-container fix-container'>
                      <div className="dropdown">
                        <div className="card-address filter-dropdown-text text-decoration-none">
                          {language === 'en' ? 'Subway station' : 'Станція метро'}
                        </div>
                        <ul className="dropdown-menu"
                          style={{ backgroundColor: '#0d0d13', maxHeight: '30rem', overflowY: 'auto', width: '24rem' }}
                        >
                          {Array.from(new Set(filterData.map(filterData => filterData.metro)))
                            .map(metro => (
                              <li key={metro}>
                                <label className="checkbox-label filter-dropdown-text">
                                  <input
                                    className='mx-3 customCheckbox checkbox-input-size'
                                    type="checkbox"
                                    value={metro}
                                    checked={selectedMetro.includes(metro)}
                                    onChange={() => handleCheckboxChange(metro, 'metro')}
                                  />
                                  {metro}
                                </label>
                              </li>
                            ))}
                          <li>
                            <button
                              className='m-3'
                              onClick={() => {
                                handleFetchData();
                                setCurrentPageWhenUsingFilter();
                              }}
                              style={{
                                width: '10rem',
                                backgroundColor: 'transparent',
                                borderRadius: '0',
                                color: 'rgb(173, 129, 82)',
                                fontSize: '1.6rem',
                                fontWeight: '100',
                                border: '1px solid rgb(173, 129, 82)',
                                marginBottom: '4rem'
                              }}
                            >
                              {language === 'en' ? 'Apply' : 'Застосувати'}
                            </button>
                          </li>
                        </ul>
                      </div>

                      <div className="dropdown filter-margin">
                        <div className="card-address filter-dropdown-text text-decoration-none px-3">
                          {language === 'en' ? 'Floor' : 'Поверх'}
                        </div>
                        <ul className="dropdown-menu"
                          style={{ backgroundColor: '#0d0d13', maxHeight: '30rem', overflowY: 'auto', width: '16rem' }}
                        >
                          {Array.from(new Set(filterData.map(filterData => filterData.floor)))
                            .sort((a, b) => a - b)
                            .map(floor => (
                              <li key={floor}>
                                <label className="checkbox-label filter-dropdown-text">
                                  <input
                                    className='mx-3 customCheckbox checkbox-input-size'
                                    type="checkbox"
                                    value={floor}
                                    checked={selectedFloor.includes(floor)}
                                    onChange={() => handleCheckboxChange(floor, 'floor')}
                                  />
                                  {floor}
                                </label>
                              </li>
                            ))}
                          <li>
                            <button
                              className='m-3'
                              onClick={() => {
                                handleFetchData();
                                setCurrentPageWhenUsingFilter();
                              }}
                              style={{
                                width: '10rem',
                                backgroundColor: 'transparent',
                                borderRadius: '0',
                                color: 'rgb(173, 129, 82)',
                                fontSize: '1.6rem',
                                fontWeight: '100',
                                border: '1px solid rgb(173, 129, 82)',
                                marginBottom: '4rem'
                              }}
                            >
                              {language === 'en' ? 'Apply' : 'Застосувати'}
                            </button>
                          </li>
                        </ul>
                      </div>

                      <div className="dropdown">
                        <div className="card-address filter-dropdown-text text-decoration-none`">
                          {language === 'en' ? 'Kitchen area' : 'Площа кухні'}
                        </div>
                        <ul className="dropdown-menu"
                          style={{
                            backgroundColor: '#0d0d13',
                            border: '1px solid #91909066',
                            borderRadius: '0',
                            paddingTop: '2rem',
                            height: '8rem'
                          }}>
                          <div className='d-flex'>
                            <input
                              className='filter-dropdown-text'
                              type="text"
                              placeholder={language === 'en' ? ' From' : ' Від'}
                              value={fromKitchenArea}
                              onChange={(e) => setFromKitchenArea(e.target.value)}
                              style={{
                                border: 'none',
                                width: '10rem',
                                height: '3rem',
                                margin: '1rem',
                                color: 'white',
                                backgroundColor: '#0d0d13',
                                borderBottom: '1px solid #91909066',
                                outline: 'none',
                              }}
                            />
                            <input
                              className='filter-dropdown-text'
                              type="text"
                              placeholder={language === 'en' ? ' To' : ' До'}
                              value={toKitchenArea}
                              onChange={(e) => setToKitchenArea(e.target.value)}
                              style={{
                                border: 'none',
                                width: '10rem',
                                height: '3rem',
                                marginTop: '1rem',
                                color: 'white',
                                backgroundColor: '#0d0d13',
                                borderBottom: '1px solid #91909066',
                                outline: 'none',
                              }}
                            />
                            <button
                              onClick={() => {
                                applyFiltersKitchenArea();
                                setCurrentPageWhenUsingFilter();
                              }}
                              className="filter-dropdown-text card-address"
                              style={{
                                margin: '1rem',
                                backgroundColor: '#0d0d13',
                                color: 'rgb(173, 129, 82)',
                                border: '1px solid rgb(173, 129, 82)',
                                cursor: 'pointer',
                                width: '10rem',
                                height: '3rem',
                              }}
                            >
                              {language === 'en' ? ' Apply' : ' Застосувати'}
                            </button>
                          </div>
                        </ul>
                      </div>
                    </div>

                  </div>



                  <div className="checkbox-container-advanced-filter checkbox-label checkbox-input-text-size">
                    <div>
                      <input
                        className='customCheckbox checkbox-input-size'
                        type="checkbox"
                        value={'без комісійних'}
                        checked={offerType.includes('без комісійних')}
                        onChange={() => handleCheckboxChange('без комісійних', 'offerType')}
                      />
                      {language === 'en' ? 'No commission' : 'Без комісії'}
                    </div>
                    <button
                      className='street-button'
                      onClick={() => {
                        handleFetchData();
                        setCurrentPageWhenUsingFilter();
                      }}
                    >
                      {language === 'en' ? 'Apply' : 'Застосувати'}
                    </button>
                  </div>

                  {/* <button
                    onClick={handleFetchData}
                    style={{
                      width: '8rem',
                      backgroundColor: 'transparent',
                      borderRadius: '0',
                      color: 'rgb(173, 129, 82)',
                      fontSize: '1.2rem',
                      fontWeight: '100',
                      border: '1px solid rgb(173, 129, 82)',
                    }}
                  >
                    {language === 'en' ? 'Apply' : 'Застосувати'}
                  </button> */}

                  {/* <label className="checkbox-label text-thin-small-medium">
                    <input
                      style={{ width: '20px', height: '20px', marginRight: '1rem' }}
                      className='customCheckbox'
                      type="checkbox"
                    />
                    {language === 'en' ? 'E-Oselya' : 'Є-Оселя'}
                  </label> */}


                </div>
              )}

            </div>

          </div>

          <Row>
            {lgObjects.map(lgObject =>
              <Col sm={12} md={6} lg={4} className={'d-flex mb-4'}>
                <Card style={{
                  borderRadius: 0,
                  backgroundColor: '#111010',
                  border: '1px solid #91909066',
                  width: '100%',
                  marginTop: '1rem'
                }}>
                  <Link className='img-box'
                    to={{
                      pathname: `/${type}/${category}/${lgObject.id}`,
                      state: { filters: newFilterParams }
                    }}
                    onClick={() => {
                      window.scroll(0, 0);
                    }}>
                    <img src={lgObject.image} className="product-image"></img>

                    <button
                      className='cart d-flex align-items-center justify-content-center'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleButtonClick(e, lgObject.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill={lgObject.addedToCart ? 'rgb(173, 129, 82)' : '#c6c6c6bf'}
                        className="bi bi-bookmark"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                      </svg>
                    </button>

                  </Link>
                  <Card.Body>
                    <Link className='text-decoration-none text-thin-medium' to={`/${type}/${category}/${lgObject.id}`}>{lgObject.street}, {lgObject.buildingNumber}</Link>
                    <div className='d-flex align-items-center justify-content-start mt-3'>
                      <div className='district-icon'></div>
                      <div className='text-thin-small'>{lgObject.district}</div>
                    </div>
                    {/* <div className='text-thin-small my-2'>{lgObject.subLocalityName !== "" ? lgObject.subLocalityName : lgObject.localityName}</div> */}
                    <div className='d-flex align-items-center justify-content-start my-3'>
                      <div className='d-flex align-items-center justify-content-start'>
                        <div className='area-icon'></div>
                        <div className='text-thin-small'>{lgObject.totalArea} м.кв.</div>
                      </div>

                      {lgObject.rooms !== "to be confirmed" && (
                        <div className='d-flex align-items-center justify-content-start mx-4'>
                          <div className='rooms-icon'></div>
                          <div className='text-thin-small'>{lgObject.rooms}</div>
                        </div>
                      )}
                      {lgObject.floor !== "to be confirmed" && (
                        <div className='d-flex align-items-center justify-content-start'>
                          <div className='floor-icon'></div>
                          <div className='text-thin-small'>{lgObject.floor}{lgObject.floors !== "to be confirmed" && ("/" + lgObject.floors)}</div>
                        </div>
                      )}

                    </div>

                    <div className='custom-line'></div>
                    <div className='text-thin-medium'>{(Number(lgObject.price).toLocaleString().replace(/,/g, ' '))} {lgObject.currency}</div>
                  </Card.Body>

                </Card>
              </Col>
            )}

          </Row>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
            {pagination}
          </div>


          <Footer />

        </motion.div >
      </Container >
    </>
  );
}

export default Objects;