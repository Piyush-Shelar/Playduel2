import { useSocket } from "./SocketContext";
import React,{useContext} from "react"
import { IdContext } from "./Appcontext";
import "./All.css"

const InviteModal = () => {
  const { invite, setInvite, socket } = useSocket();
 
  const {id}=useContext(IdContext)

  if (!invite) return null;

  const acceptInvite = () => {
    socket.emit("accept-invite", {
      from: invite,
      to: id
    });
    setInvite(null);
  };

  const rejectInvite = () => {
    socket.emit("reject-invite", {
      from: invite,
      to: id
    });
    setInvite(null);
  };

  return (
    <div className="invite-overlay">
      <div className="invite-modal">
        <h2>🎮 Duel Invitation</h2>
        <p>You have been challenged!</p>

        <div className="invite-actions">
          <button className="accept-btn" onClick={acceptInvite}>
            Accept
          </button>
          <button className="reject-btn" onClick={rejectInvite}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;