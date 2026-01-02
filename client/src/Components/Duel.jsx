import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSocket } from "./SocketContext";
import {useNavigate} from "react-router-dom"
import "./Duel.css";

function Duel() {
  const { socket } = useSocket();

  const [roomId, setRoomId] = useState("");
  const [category, setCategory] = useState("");

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);

  const [quizStarted, setQuizStarted] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const [totalTimer, setTotalTimer] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(0);

  const [answers, setAnswers] = useState({});
  const [lockedQuestions, setLockedQuestions] = useState({});
  const [questionTimeLeft, setQuestionTimeLeft] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const user = localStorage.getItem("username");
  console.log(user)

  const navigate=useNavigate()

  /* FETCH CATEGORY */
  useEffect(() => {
    axios.get("http://localhost:9000/category1").then((res) => {
      setRoomId(res.data._id);
      setCategory(res.data.category);
    });
  }, []);

  /* JOIN ROOM */
  useEffect(() => {
    if (socket && roomId) 
      {socket.emit("join-room", {
      roomId,
      username: localStorage.getItem("username")
    });}
  }, [socket, roomId]);

  /* COUNTDOWN */
  useEffect(() => {
    if (quizStarted) return;

    const timer = setInterval(() => {
      setCountdown((p) => {
        if (p === 1) {
          clearInterval(timer);
          startQuiz();
           
          return 0;
        }
        return p - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, category]);

  useEffect(() => {
  if (!quizFinished) return;

  socket.emit("submit-quiz", { roomId, answers });

  navigate(`/duelresult/${roomId}`); // ✅ SAFE

}, [quizFinished]);


  const startQuiz = async () => {
    if (!category) return;

    setQuizStarted(true);

    const res = await axios.get(
      `http://localhost:9000/quiz/${category}`
    );

    const qs = res.data;
    setQuestions(qs);

    let total = 0;
    const timeMap = {};
    qs.forEach((q, i) => {
      const t = getTimeInSeconds(q.timelimit);
      total += t;
      timeMap[i] = t;
    });

    setTotalTimer(total);
    setQuestionTimeLeft(timeMap);
    setQuestionTimer(timeMap[0]);

    socket.emit("start-quiz", { roomId, questions: qs,username:user });
  };

  /* TOTAL TIMER */
  useEffect(() => {
    if (!quizStarted) return;

    const t = setInterval(() => {
      setTotalTimer((p) => {
        if (p <= 1) {
          clearInterval(t);
          submitQuiz();
          return 0;
        }
        return p - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [quizStarted]);

  /* QUESTION TIMER */
  useEffect(() => {
    if (!quizStarted || !questions.length) return;

    setQuestionTimer(questionTimeLeft[currentQ]);

    const t = setInterval(() => {
      setQuestionTimer((p) => {
        if (p <= 1) {
          clearInterval(t);
          setLockedQuestions((x) => ({ ...x, [currentQ]: true }));
          setQuestionTimeLeft((x) => ({ ...x, [currentQ]: 0 }));
          return 0;
        }
        setQuestionTimeLeft((x) => ({ ...x, [currentQ]: p - 1 }));
        return p - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [currentQ, quizStarted, questions]);

  const getTimeInSeconds = (t) => {
    const [n, u] = t.split(" ");
    return u.startsWith("min") ? parseInt(n) * 60 : parseInt(n);
  };

  const submitQuiz = () => {
    if (quizFinished) return;
    setQuizFinished(true);
  };

  return (
    <div className="duel-container">
      {!quizStarted && (
        <h2 className="countdown">Quiz starts in: {countdown}</h2>
      )}

      {quizStarted && questions.length > 0 && (
        <>
          <div className="total-timer-box">
            Total Time Left: {totalTimer}s
          </div>

          <div className="question-card">
            <h3 className="question-title">
              Q{currentQ + 1}: {questions[currentQ].question}
            </h3>

            <p className="question-timer">
              Question Time Left: {questionTimer}s
            </p>

            <div className="options-container">
              {questions[currentQ].options.map((opt, idx) => (
                <button
                  key={idx}
                
                  disabled={lockedQuestions[currentQ]}
                  className={`option-btn ${
                  answers[currentQ] === opt ? "option-selected" : ""
                  }`}
                  onClick={() =>
                    setAnswers((p) => ({ ...p, [currentQ]: opt }))
                  }
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="nav-buttons">
              {currentQ > 0 && (
                <button className="prev-btn" onClick={() => setCurrentQ(currentQ - 1)}>
                  Previous
                </button>
              )}

              {currentQ < questions.length - 1 && (
                <button className="next-btn" onClick={() => setCurrentQ(currentQ + 1)}>
                  Next
                </button>
              )}
            </div>
          </div>

          <button className="submit-btn" onClick={submitQuiz}>
            Submit
          </button>
        </>
      )}
    </div>
  );
}

export default Duel;