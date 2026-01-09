import api from "./axios";

export const fetchProductsByIds = async (ids) => {
  const res = await api.get("/products/by-ids", {
    params: {
      ids: ids.join(","),
    },
  });
  return res.data;
};


export const fetchProductsByCollection = async (collection) => {
  const res = await api.get(`/products/by-collection/${collection}`);
  return res.data;
};