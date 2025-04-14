import axios from "axios";

export async function getFilmId(title: string | undefined) {
  try {
    const code = await axios.get("https://server-find-to-watch.vercel.app/api/get-html", {
      params: {
        search: title
      },
    });

    return code.data

  } catch (error) {
    console.error("Erro ao buscar via backend:", error);
  }
}

export async function getFilmCities(code:string | string[], geocode: string | string[]) {
  try {
    const response = await axios.get("https://server-find-to-watch.vercel.app/api/get-cities", {
      params: {
        search: code, geocode
      },
    });

    return response.data

  } catch (error) {
    console.error("Erro ao buscar via backend:", error);
  }
}

export async function getRegioes(code:string | string[]) {
  try {
    const response = await axios.get("https://server-find-to-watch.vercel.app/api/get-regioes", {
      params: {
        search: code,
      },
    });

    return response.data

  } catch (error) {
    console.error("Erro ao buscar via backend:", error);
  }
}

export async function getTheaters (idMovie : string | string[], idCity : string | string[], data : string) {

  try {
    const response = await axios.get("https://server-find-to-watch.vercel.app/api/get-theaters", {
      params: {
        idMovie,
        idCity, 
        data
      },
    });

    return response.data

  } catch (error) {
    console.error("Erro ao buscar via backend:", error);
  }

}