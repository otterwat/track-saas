import { useState } from 'react';
import { questions } from '../components/Questions';

function Quiz() {
  // states
  const [currentIndex, setCurrentIndex] = useState(0);        // which question
  const [selected, setSelected] = useState<number | null>(null); // clicked option
  const [answers, setAnswers] = useState<number[]>([]);       // confirmed answers
  const isFinished = currentIndex >= questions.length;
  const storedUserId = Number(localStorage.getItem("user_id")) || 1;

  async function submitQuiz(finalAnswers: number[]) {
    try {
      const response = await fetch("http://localhost:8000/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user_id: storedUserId,
          answers: finalAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save quiz: ${response.status}`);
      }

      const data = await response.json();
      console.log("Saved to DB:", data);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  }

  const isLast = currentIndex === questions.length - 1;

  // Update your existing handleNext function:
  async function handleNext() {
    if (selected === null) return;

    const updatedAnswers = [...answers, selected];
    setAnswers(updatedAnswers);
    setSelected(null);

    // If this was the last question, send updatedAnswers to PostgreSQL
    if (isLast) {
      await submitQuiz(updatedAnswers);
    }

    setCurrentIndex(currentIndex + 1);
  }

  // completed
  if (isFinished) {

    return (
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">
          Quiz complete!
        </h2>
      </div>
    );
  }

  // current question
  const question = questions[currentIndex];

  return (
    <div className="max-w-md mx-auto p-6">
      <p className="text-sm text-gray-500 mb-2">
        Question {currentIndex + 1} of {questions.length}
      </p>
      <h2 className="text-xl font-bold mb-4">{question.text}</h2>

      <div className="flex flex-col gap-2">
        {question.options.map((option, index) => (
          <button
            key={option}                      // React needs a unique key in lists
            onClick={() => setSelected(index)}
            className={`px-4 py-2 rounded border text-left ${
              selected === index
                ? 'bg-blue-600 text-white border-blue-600'   // selected
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={selected === null}
        className="mt-4 px-4 py-2 rounded bg-green-600 text-white disabled:opacity-40"
      >
        {isLast ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}

export default Quiz;