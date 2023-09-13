export const getSavedShoeIds = () => {
    const savedShoeIds = localStorage.getItem('saved_shoes')
      ? JSON.parse(localStorage.getItem('saved_shoes'))
      : [];
  
    return savedShoeIds;
  };
  
  export const saveShoesIds = (shoeIdArr) => {
    if (shoeIdArr.length) {
      localStorage.setItem('saved_shoes', JSON.stringify(shoeIdArr));
    } else {
      localStorage.removeItem('saved_shoes');
    }
  };
  
  export const removeShoeId = (shoeId) => {
    const savedShoeIds = localStorage.getItem('saved_shoes')
      ? JSON.parse(localStorage.getItem('saved_shoes'))
      : null;
  
    if (!savedShoeIds) {
      return false;
    }
  
    const updatedSavedShoeIds = savedShoeIds?.filter((savedShoekId) => savedShoekId !== shoeId);
    localStorage.setItem('saved_shoes', JSON.stringify(updatedSavedShoeIds));
  
    return true;
  };
  