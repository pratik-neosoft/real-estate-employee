import qs from 'qs'
export const getFilterOption = (data, key) => {
  const tempArr = [];
  const Options = [];
  data?.auditLog?.forEach((item) => {
    if (!tempArr.includes(item[key])) {
      tempArr.push(item[key]);
    }
  });
  tempArr.map((item) => item && Options.push({ label: item, value: item }));
  return Options;
};

export const parseUrlToJson = query => {
  return qs.parse(decodeURI(query).substring(1))
}
