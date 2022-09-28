export const checkSpaceBug = (string: string) => {
  const spaceRegexG = /\s+/g;
  const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
  // The substituted value will be contained in the result variable
  const result = string.replaceAll(htmlRegexG, "").replaceAll(spaceRegexG, "");

  return result.length;
};
