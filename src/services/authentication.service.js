import {BehaviorSubject} from 'rxjs';
import instance from "../axios-backend";
import axios from "axios";

const getCurrentUser = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser?.token && currentUser?.expireDate && new Date(currentUser?.expireDate).getTime() > new Date().getTime() ? currentUser : {};
}

const currentUserSubject = new BehaviorSubject(getCurrentUser());

const isAuthenticated = () => {
    return currentUserSubject.value?.token && currentUserSubject.value?.expireDate ? new Date(currentUserSubject.value?.expireDate).getTime() > new Date().getTime() : false;
}

const isEmailVerified = () => {
    return !!currentUserSubject.value?.email_verified_at
}

const me = () => {
    instance.get("/auth/me")
        .then(response => {
            const userData = handleUserAuthResponse(response);
            setUserData(userData);
        })
        .catch(err => err.response?.status === 401 ? logout() : null);

}

const login = async (data) => {
    return await instance.post("/auth/login", data)
        .then(response => {
            const userData = handleUserAuthResponse(response)
            setUserData(userData)
            return response
        })
        .catch(errors => errors);

}

const logout = () => {
    instance.post("/auth/logout")
        .then(() => setUserData({}))
        .catch(err => err.response?.status === 401 ? setUserData({}) : null);
}

const register = async (data) => {
    return await instance.post("/auth/register", data)
        .catch(err => err.response)
}

const refresh = async () => {
    await instance.post("/auth/refresh")
        .then(response => {
            const userData = handleUserAuthResponse(response)
            setUserData(userData)
        })
        .catch(err => err.response?.status === 401 ? logout() : null);
}

const setUserData = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    currentUserSubject.next(userData);
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

const resendVerification = async () => {
    return await instance.post("auth/email/verification-notification", {email: currentUserSubject.value?.email})
}

const verify = async (url) => {
    return await axios.get(url);
}

const forgotPassword = async () => {

}

const resetPassword = async (data, token) => {
    return await instance.post("/auth/reset-password", {...data, token: token})
}


export const authenticationService = {
    login,
    me,
    logout,
    register,
    refresh,
    verify,
    resendVerification,
    isEmailVerified,
    isAuthenticated,
    forgotPassword,
    resetPassword,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    }
};
