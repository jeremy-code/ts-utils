export const parseFormData = (formData: FormData) =>
  Array.from(formData).reduce<
    Record<string, FormDataEntryValue | FormDataEntryValue[]>
  >((acc, [k, v]) => {
    if (!acc[k]) {
      const values = formData.getAll(k);
      acc[k] = values.length > 1 ? values : v;
    }
    return acc;
  }, {});
