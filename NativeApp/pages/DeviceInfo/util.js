function makeChunks(arr, chunkSize) {
    if (!chunkSize || chunkSize == 0) return [];
    const array = [...arr];
    let res = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      res = [...res, chunk];
    }
    return res;
  }

module.exports.makeChunks = makeChunks