export async function load({ fetch, url }) {
  const calculatorData = fetch("/api/trade-calculator").then(
    async (response) => {
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Unable to load Trade Lab data");
      return data;
    },
  );

  const initialWorkspace =
    url.searchParams.get("mode") === "find" ? "targets" : "builder";

  return { calculatorData, initialWorkspace };
}
