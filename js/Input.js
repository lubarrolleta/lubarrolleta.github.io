'use strict';

const Input = async(createCart, data, limit, offset) => {
    const ulrSearch = `https://api.giphy.com/v1/gifs/search?api_key=pdrmOmzgJZKTriJ8lNjeoiqyIH0bEV1C&q=${data}&limit=${limit}&offset=${offset }&rating=g&lang=en`
    const urlTrending = `https://api.giphy.com/v1/gifs/trending?api_key=pdrmOmzgJZKTriJ8lNjeoiqyIH0bEV1C&limit=${limit || 48}&offset=${offset || 0}&rating=g`
        // console.log(data)
        // console.log(setData);
        // setData(data)
        // data = 'luis'
        // console.log(data)
    const response = data ? await fetch(ulrSearch) : await fetch(urlTrending)
    if (response.ok) {
        const result = await response.json()
            // console.log(result);
        createCart(result, (limit === 48 && offset === 0) ? true : false)
    } else {

    }
    // return data
}

export default Input;