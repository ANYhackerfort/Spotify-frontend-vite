import React, { useEffect } from 'react';
import axios from 'axios';

const MainPage: React.FC = () => {

    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/',
        timeout: 5000,
        withCredentials: true,
    });

    const getCsrfToken = async (): Promise<string> => {
        return await axiosInstance
          .get("/api/csrf/")
          .then((resp) => {
            return resp.data.csrfToken;
          })
          .catch(() => {
            return "";
          });
      };

    let csrfToken = "";
    (async () => {
    csrfToken = await getCsrfToken();
    axiosInstance.defaults.headers.common["X-CSRFToken"] = csrfToken;
    })();
    axiosInstance.defaults.withCredentials = true;

    const setInitialState = async () => {
        try {
            const response = await axiosInstance.get('/api/login/', {
                headers: {
                    'X-CSRFToken': csrfToken,  // Add CSRF token
                    // Add any other custom headers here
                }
            });
            console.log(response.data.url);  // Accessing the URL from the response data
            window.location.href = response.data.url;  // Redirecting to the URL
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    //     const setInitialState = async () => {
    //         axiosInstance.get('/api/login/', {
    //             headers: {
    //                 'X-CSRFToken': csrfToken,  // Add CSRF token
    //                 // Add any other custom headers here
    //             }
    //         })
    //         .then((resp) => {
    //             console.log(resp.data.url);  // Accessing the URL from the response data
    //             window.location.href = resp.data.url;  // Redirecting to the URL
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    //     };
    
    //     setInitialState(); 
    // }, [csrfToken]); 
    

    return (
        <div>
            <h1>Spotify APP</h1>
            <button onClick={setInitialState}>Click Here</button>
        </div>
    );
};

export default MainPage;