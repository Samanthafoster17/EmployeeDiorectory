import axios from "axios";

const baseURL = "https://randomuser.me/api//?results=20&nat=us";

export default {
    search: function() {
        return axios.get(baseURL);
    }
};