const objectToFormData = (obj: any, rootName: string, formData: FormData) => {
  const appendFormData = (data: any, root: string) => {
    root = root || "";
    if (data instanceof File) {
      formData.append(root, data);
    } else if (Array.isArray(data)) {
      if (data.length === 1) {
        appendFormData(data[0], root);
      } else {
        for (let i = 0; i < data.length; i++) {
          appendFormData(data[i], root + "[" + i + "]");
        }
      }
    } else if (typeof data === "object" && data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (root === "") {
            appendFormData(data[key], key);
          } else {
            appendFormData(data[key], root + "[" + key + "]");
          }
        }
      }
    } else {
      if (data !== null && typeof data !== "undefined") {
        formData.append(root, data);
      }
    }
  };
  appendFormData(obj, rootName);

  return formData;
};

export const convertToFormData = (obj: any) => {
  let formData = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    formData = objectToFormData(value, key, formData);
  }

  return formData;
};
