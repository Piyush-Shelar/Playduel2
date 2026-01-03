import React,{useEffect,useState} from "react"
import { useSocket } from "./SocketContext";
import "./All.css"
import { useParams } from "react-router-dom";


function Duelresult()
{
  const { roomId } = useParams();
  console.log(roomId)
  const { socket } = useSocket();
  const [leaderboard, setLeaderboard] = useState([]);


   useEffect(() => {
    if (!socket || !roomId) return;

    // 🔥 explicitly ask for THIS room's leaderboard
    socket.emit("get-leaderboard", { roomId });

    socket.on("quiz-end", ({ leaderboard }) => {
      setLeaderboard(leaderboard);
    });

    socket.on("leaderboard-data", ({ leaderboard }) => {
      setLeaderboard(leaderboard);
    });

    return () => {
      socket.off("quiz-end");
      socket.off("leaderboard-data");
    };
  }, [socket, roomId]);

  
return(
    <div>
      {leaderboard.length > 0 && (
        <div className="leaderboard">
          <h2>🏆 Leaderboard</h2>

          {leaderboard.map((p, i) => (
            <div  className="leaderboard-row">
             {p.username}: <span>{p.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
    


  )
}
export default Duelresult;