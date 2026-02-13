export async function fetchEvents() {
  const response = await fetch('http://localhost:8080/event/events');
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
}
