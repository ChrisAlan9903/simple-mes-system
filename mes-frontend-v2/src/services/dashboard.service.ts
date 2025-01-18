const route: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/statistics`;

export async function getProductDistribution() {
  try {
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    const option = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(`${route}/product-distribution`, option);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
export async function getMachineUtilization() {
  try {
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    const option = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(`${route}/machine-utilization`, option);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
export async function getDefectRate() {
  try {
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    const option = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(`${route}/defect-rate`, option);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
