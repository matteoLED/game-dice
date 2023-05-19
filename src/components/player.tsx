import { PlayerData } from "./playerData";
import "../styles/game.css";

type PlayerProps = {
  id: number;
  player: PlayerData;
  isActive: boolean;
};

const Player = ({ player, isActive }: PlayerProps) => {
  return (
    <div>
      <div
        // style={{ display: "flex", justifyContent: "center" }}
        className={`player ${isActive ? "active" : ""}`}
      >
        <div className="player-info-container">Player {player.id}</div>

        <div className="score-container">CURRENT {player.roundScore}</div>
      </div>
    </div>
  );
};

export default Player;
