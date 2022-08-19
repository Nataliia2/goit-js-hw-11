import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGES = 40;
const KEY = '29221253-dd17a46566e1be23f7ca8ff9b';

const fetchPictures = async(searchQuery, page) => {
    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGES}&page=${page}`);
    return response.data; 
}
export default fetchPictures; 

