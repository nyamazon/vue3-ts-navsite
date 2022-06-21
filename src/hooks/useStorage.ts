const useStorage = () => {
  // setItem getitem removeItem
  const setItem = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = <T>(key: string, defaultValue?: T) => {
    const itemValue = localStorage.getItem(key);
    if (!itemValue) return defaultValue;
    try {
      const parseValue = JSON.parse(itemValue);
      return parseValue;
    } catch (error) {
      return defaultValue;
    }
  };

  const delItem = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    setItem,
    getItem,
    delItem,
  };
};

export default useStorage;
