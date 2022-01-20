import Fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import fastifyCors from "fastify-cors";
import { Grid } from "./domain/Grid";
import { Player } from "./domain/Player/Player";
import { Game } from "./domain/Game/Game";

const app = Fastify({
  logger: false,
});

const port = 8000;

app.register(fastifyCors, {
  origin: "*",
  methods: "GET,POST,PUT,PATCH,DELETE",
});
app.register(fastifyIO);

app.get("/", (req, res) => {
  app.io.emit("hello");
  res.send("Hello!");
});

app.ready((err) => {
  if (err) throw err;

  app.io.on("connection", (socket) => {
    app.io.emit("current-games", Game.getGames());
    console.info("Socket connected!", socket.id);
    socket.on("create-game-request", (socket) => {
      const player = new Player(socket);
      const game = new Game(5, 5, player);
      app.io.emit("game-created", game);
    });
    socket.on("join-game-request", (socket) => {
      const newPlayer = new Player(socket.name);
      socket.game.players.push(newPlayer);
      app.io.emit("player-joined-game", game);
    });
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port} 👂`);
});
