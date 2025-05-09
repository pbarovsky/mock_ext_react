export const SaveCleanJson = (response: string): string => {
  try {
    return JSON.stringify(JSON.parse(response));
  } catch (e) {
    return response.trim();
  }
};

export const ViewFormattedJson = (text: string): string =>
  /^[{[]/.test(text) ? JSON.stringify(JSON.parse(text), null, 2) : text;
