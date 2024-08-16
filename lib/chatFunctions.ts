export const getRandomName = () => {
    return "Abhi";
};

export const getRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

export const getRandomCategory = () => {
    const categories = ["a", "b", "c"];
    return categories[Math.floor(Math.random() * categories.length)];
};