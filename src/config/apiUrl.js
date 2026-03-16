export const apiUrl = "https://api.fitfind.app";
export const s3Url = "https://fitfindbucket.s3.us-east-2.amazonaws.com";

export const imageUrl = (url) => `${s3Url}/${url}`;
export const BaseURL = (link) => {
  return `${apiUrl}/api/v1/${link}`;
};
export const mediaUrl = (url) => `${s3Url}/${url}`;
