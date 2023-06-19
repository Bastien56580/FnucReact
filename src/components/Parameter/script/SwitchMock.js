export const SwitchMock = () => {
    const currentValue = sessionStorage.getItem("REACT_APP_MOCK");

    if (currentValue === "true") {
        sessionStorage.setItem("REACT_APP_MOCK", "false");
    } else if (currentValue === "false") {
        sessionStorage.setItem("REACT_APP_MOCK", "true");
    }
};
