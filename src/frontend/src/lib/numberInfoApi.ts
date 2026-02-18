const API_BASE_URL = 'https://source-code-api.vercel.app';

export async function fetchNumberInfo(number: string): Promise<any> {
  if (!number || number.trim() === '') {
    throw new Error('Number is required');
  }

  const url = `${API_BASE_URL}/?num=${encodeURIComponent(number)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch number information: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to fetch number information: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while fetching number information');
  }
}
