export async function saveQuiz(userId: number, answers: number[]) {
  const response = await fetch('/api/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, answers }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save quiz (${response.status})`);
  }
  return response.json();
}