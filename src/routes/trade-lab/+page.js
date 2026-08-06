export async function load({ fetch }) {
  const calculatorData = fetch("/api/trade-calculator").then(
    async (response) => {
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Unable to load Trade Lab data");
      return data;
    },
  );

  return { calculatorData };
}
