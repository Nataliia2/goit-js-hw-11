import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const perPages = 40;

const fetchPictures = async(searchQuery, page) => {
    const response = await axios.get(`${BASE_URL}?key=29221253-dd17a46566e1be23f7ca8ff9b&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPages}&page=${page}`);
    return response.data; 
}
export default fetchPictures;

