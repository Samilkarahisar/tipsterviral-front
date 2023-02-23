export const getRedesignBySlug = async (slug: string) => {
  try {
    // const { data } = await api.get(`${API_PATH_GET_REDESIGN}/${slug}`);
    return {
      id: '1',
      style: 'Japanese',
      init_url:
        'https://replicate.delivery/pbxt/IFxXfiAsafseSutimTQ5c2bmSXBlQw1aD60TY82H0Njn9xTu/329352460_710625440617550_7424179861818620933_n%20(1)%20(1).jpg',
      result_url:
        'https://replicate.delivery/pbxt/EEPui2SSniY2GJv2I3ZNFkctxLW8OITdDyK0VwSDwKjVfiQIA/out-0.png',
    };
  } catch (e) {
    return null;
  }
};
