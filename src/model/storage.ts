// 封装操作localstorage本地存储的方法  模块化

const storage = {
  set(key:string, value:string) {
    localStorage.setItem(key, JSON.stringify(value));
    // localStorage.key = value;
    // localStorage[key] = value;
  },
  get(key:string) {
    return JSON.parse((localStorage.getItem(key) as string));
  },
  getForIndex(index: number) {
    return localStorage.key(index);
  },
  getKeys() {
    const items = this.getAll();
    const keys = [];
    for (let index = 0; index < items.length; index++) {
      keys.push(items[index].key);
    }
    return keys;
  },
  getLength() {
    return localStorage.length;
  },
  getSupport() {
    return (typeof (Storage) !== "undefined") ? true : false;
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  removeAll() {
    localStorage.clear();
  },
  getAll() {
    const len = localStorage.length;  // 获取长度
    const arr = []; // 定义数据集
    for (let i = 0; i < len; i++) {
      // 获取key 索引从0开始
      const getKey: string = (localStorage.key(i) as string);
      // 获取key对应的值
      const getVal = localStorage.getItem(getKey);
      // 放进数组
      arr[i] = {
        'key': getKey,
        'val': getVal,
      }
    }
    return arr;
  }
}

export default storage;
