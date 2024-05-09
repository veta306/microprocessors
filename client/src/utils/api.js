import host from "./host";

export async function getMicroprocessors() {
  const res = await host.get("api/microprocessors");
  return res.data;
}
export async function getTypes() {
  const res = await host.get("api/types");
  return res.data;
}
export async function getManufacturers() {
  const res = await host.get("api/manufacturers");
  return res.data;
}
export async function getSockets() {
  const res = await host.get("api/sockets");
  return res.data;
}
export async function getReviews() {
  const res = await host.get("api/reviews");
  return res.data;
}
export async function getMicroprocessor(id) {
  const res = await host.get("api/processor", { params: { id: id } });
  return res.data;
}
export async function getReview(id) {
  const res = await host.get("api/review", { params: { id: id } });
  return res.data;
}
export async function createProcessor(data) {
  const res = await host.post("api/processor", data);
  return res;
}
export async function deleteProcessor(id) {
  const res = await host.delete("api/processor", { params: { id: id } });
  return res;
}
export async function updateProcessor(data) {
  const res = await host.patch("api/processor", data);
  return res;
}
export async function searchProcessors(searchQuery) {
  const res = await host.get("api/search", {
    params: { searchQuery: searchQuery },
  });
  return res;
}
export async function filterProcessors(filters) {
  const res = await host.get("api/filter", {
    params: filters,
  });
  return res;
}
export async function addReview(id, rating) {
  const res = await host.post("api/review", {
    id,
    rating,
  });
  return res;
}
export async function deleteReview(id) {
  const res = await host.delete("api/review", { params: { id: id } });
  return res;
}
export async function deleteCategory(category, name) {
  const res = await host.delete("api/category", {
    params: { category: category, name: name },
  });
  return res;
}
