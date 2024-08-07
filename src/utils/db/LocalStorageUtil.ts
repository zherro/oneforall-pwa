class LocalStorageUtil {
  private userId;

  constructor(userId) {
    this.userId = userId;
  }

  // Method to get the key for the given id
  _getKey(key) {
    return `${this.userId}_${key}`;
  }

  // Method to add or update a value in the localStorage
  set(key, value) {
    const storageKey = this._getKey(key);
    localStorage.setItem(storageKey, JSON.stringify(value));
  }

  // Method to retrieve a value from the localStorage
  get(key) {
    const storageKey = this._getKey(key);
    const value = localStorage.getItem(storageKey);
    return value ? JSON.parse(value) : null;
  }

  // Method to remove a value from the localStorage
  remove(key) {
    const storageKey = this._getKey(key);
    localStorage.removeItem(storageKey);
  }
}

const storageUtil = (userId) => new LocalStorageUtil(userId);
export default storageUtil;

/*
  // Example usage:
  const userId = 'user123'; // Replace with the actual user ID
  const storageUtil = new LocalStorageUtil(userId);
  
  // Adding a new value
  storageUtil.setItem('theme', 'dark');
  
  // Retrieving a value
  const theme = storageUtil.getItem('theme');
  console.log(theme); // Output: 'dark'
  
  // Removing a value
  storageUtil.removeItem('theme');
  const removedTheme = storageUtil.getItem('theme');
  console.log(removedTheme); // Output: null
  */
