import {BehaviorSubject} from 'rxjs';
import instance from "../axios-backend";


const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

const me = () => {
    console.log("heresdasdasd")
    instance.get("/auth/me", {headers: {authorization: `Bearer ${currentUserSubject.value.token}`}})
        .then(response => {
            const userData = handleUserAuthResponse(response);
            setUserData(userData);
        })
        .catch(err => err.response?.status===401?logout(): null);

}

const login = async (email, password) => {
    const resp = await instance.post("/auth/login", {
        email: email,
        password: password
    })
        .then(response => {
            const userData = handleUserAuthResponse(response)
            setUserData(userData)
        })
        .catch(errors => errors)

    return resp;

}

const logout = () => {
    instance.post("/auth/logout", {}, {headers: {authorization: `Bearer ${currentUserSubject.value.token}`}})
        .then(response => setUserData({}))
        .catch(err => err.response?.status===401?setUserData({}): null);
}

const register = (token) => {

}

const refresh = () => {
    instance.post("/auth/refresh", {}, {headers: {authorization: `Bearer ${currentUserSubject.value.token}`}})
        .then(response => {
            const userData = {...currentUserSubject.value}
            userData.token = response.data.access_token;
            setUserData(userData)
        })
        .catch(err => err.response?.status===401?logout(): null);
}

const setUserData = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    currentUserSubject.next(userData)
}

const handleUserAuthResponse = response => {
    let currentDate;
    if (response.data.expires_in) {
        currentDate = new Date();
        currentDate.setSeconds(currentDate.getSeconds() + response.data.expires_in);
    } else {
        currentDate = new Date(currentUserSubject.value.expireDate)
    }

    return {
        name: response.data.name ?? currentUserSubject.value?.name,
        email: response.data.email ?? currentUserSubject.value?.email,
        token: response.data.access_token ?? currentUserSubject.value?.token,
        email_verified_at: response.data.email_verified_at ?? currentUserSubject.value?.email_verified_at,
        expireDate: currentDate.toUTCString()
    }
}


export const authenticationService = {
    login,
    me,
    logout,
    register,
    refresh,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    }
};
