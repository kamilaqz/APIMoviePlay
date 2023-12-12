const httpService = {
    login: async (data) => {
        const response = await fetch("http://localhost:3030/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            const token = result.token; 

            localStorage.setItem("token", token);
            return { success: true, token };
        } else {
            return { success: false, error: "Falha no login" };
        }
    },
    createUser: (data) => {
        return fetch("http://localhost:3030/user/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    },
    getToken: () => {
        return localStorage.getItem("token");
    },
    getContents: () => {
        return fetch("http://localhost:3030/contents",
       {
           method: "GET",
           headers: {
               "Content-Type": "application/json",
               "Authorization": localStorage.getItem("token")
           }
       })  
    },
    addLibrary: (movieId) => {
        return fetch(`http://localhost:3030/favorites/create/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
    },
    removeLibrary: (movieId) => {
        return fetch(`http://localhost:3030/favorites/delete/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    },
    getLibrary: () => {
        return fetch("http://localhost:3030/favorites",
       {
           method: "GET",
           headers: {
               "Content-Type": "application/json",
               "Authorization": localStorage.getItem("token")
           }
       })  
    },
    addMovie: (movieId) => {
        return fetch(`http://localhost:3030/purchase/create/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    },
    getMovie: () => {
        return fetch(`http://localhost:3030/purchased`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

}

export default httpService