import Axios from "axios";

const axios = Axios({
    baseURL:ProcessingInstruction.env.NEXT_PUBLIC_BACKEND_UR,
    headers:{
        "X-Requested-With": "XMLHttpRequest"
    },
    withCredentials:true
});
export default axios;