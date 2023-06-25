/**
 * Load item from localstorage by key.
 * @param {string} key localStorage item key.
 * @returns localStorage item.
 */
export const loadFromLocalStorage = (key: string) => {
  const serialisedState = localStorage.getItem(key);
  try {
    if (serialisedState === null) return null;
    return JSON.parse(serialisedState);
  } catch (e) {
    return serialisedState;
  }
};
/**
 * Set item to localstorage by key.
 * @param {string} key localStorage item key.
 * @param {object | string} value save to localStorage data.
 */
export const saveToLocalStorage = (key: string, value) => {
  try {
    const serialState = JSON.stringify(value);
    localStorage.setItem(key, serialState);
  } catch (e) {
    console.warn(e);
  }
};
