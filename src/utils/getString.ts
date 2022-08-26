import translationList from "../translations";

const getString = (key: string) => {
  const language = window.navigator.language;
  const cleanedLanguage = language.replace(/[^a-zA-Z]/g, "");
  return translationList[cleanedLanguage][key];
};

export default getString;
