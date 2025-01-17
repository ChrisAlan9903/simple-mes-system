const route: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/inspections`;

export async function getInspections() {
  try {
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    const option = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(`${route}`, option);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
export async function getOneInspection(id: number) {
  try {
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    const option = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(`${route}/${id}`, option);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
export async function createOneInspection(body: any) {
  try {
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    const option = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    };
    const response = await fetch(`${route}`, option);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
export async function updateOneInspection(id: number, body: any) {
  try {
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    const option = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body),
    };
    const response = await fetch(`${route}/${id}`, option);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
export async function deleteOneInspection(id: number) {
  try {
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    const option = {
      method: "DELETE",
      headers: headers,
    };
    const response = await fetch(`${route}/${id}`, option);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
