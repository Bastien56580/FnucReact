export const setReactAppBackURL = () => {
    const defaultBack = "https://apimysql-1-r1261081.deta.app";
    const defaultMock = "false";

    if (!sessionStorage.getItem("REACT_APP_BACK_URL")) {
        sessionStorage.setItem("REACT_APP_BACK_URL", defaultBack);
    }

    if (!sessionStorage.getItem("REACT_APP_MOCK")) {
        sessionStorage.setItem("REACT_APP_MOCK", defaultMock);
    }
};
