const routes =  {
    homepage: {
        route_root: ""
    },
    authentication: {
        route_root: "auth",
        login: "login",
        register: "register",
        forgotPassword: "forgot-password",
        resetPassword: "reset-password",
        resendEmailVerification: "resend-verification-email",
        verifyEmail: "verify"
    },
    user:{
        route_root: "user"
    }
}

function getRouteByString(obj, propString) {
    if (!propString)
        return obj;

    const props = propString.split('.');

    let candidate;
    for(let prop of props) {
        candidate = obj[prop]
        obj = candidate;
        if(obj === undefined) break;
    }
    return (typeof obj === 'string' || obj instanceof String)? obj : obj?.route_root;

}

const Router = (routeName) => {
    const routeArray = routeName.split(".")
    let path = ""
    if (routeArray.length < 7) {
        routeArray.reduce((previousValue, currentValue) => {
            previousValue.push(currentValue)
            const temp = previousValue.join(".")
            path += "/" + getRouteByString(routes, temp);
            return [temp]
        }, []);
    }
    return path??undefined;
}

export default Router;
