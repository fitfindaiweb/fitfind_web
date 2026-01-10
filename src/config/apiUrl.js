export const apiUrl = "https://fitfind-backend-1da69a4b0355.herokuapp.com";

// export const apiUrl = "https://7l60bxbl-4017.inc1.devtunnels.ms";
// live 1
export const s3Url = "https://fitfindbucket.s3.us-east-2.amazonaws.com";

export const imageUrl = (url) => `${s3Url}/${url}`;
export const BaseURL = (link) => {
  return `${apiUrl}/api/v1/${link}`;
};
export const mediaUrl = (url) => `${s3Url}/${url}`;
