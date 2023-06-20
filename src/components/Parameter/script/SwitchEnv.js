export const SwitchEnv = () => {
    const currentValue = sessionStorage.getItem("REACT_APP_BACK_URL");

    if (currentValue === "https://apimysql-1-r1261081.deta.app") {
        sessionStorage.setItem("REACT_APP_BACK_URL", "https://fnuc.palogapif.fr/");
    } else if (currentValue === "https://fnuc.palogapif.fr/") {
        sessionStorage.setItem("REACT_APP_BACK_URL", "https://apimysql-1-r1261081.deta.app");
    }
};
