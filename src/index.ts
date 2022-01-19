import Fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import fastifyCors from "fastify-cors";
import { Grid } from "./domain/Grid";
import { Player } from "./domain/Player/Player";

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

app.get("/new-game", (req, res) => {
  const grid = new Grid(8, 8);
  res.send({
    grid: {
      height: grid.height,
      width: grid.width,
    },
  });
});

app.ready((err) => {
  if (err) throw err;

  app.io.on("connection", (socket) => {
    console.info("Socket connected!", socket.id);
    socket.on("connecting-player", (socket) => {
      const player = new Player(socket);
      console.info("Joueur connecté!", player.name, player.role);
      const players = Player.getPlayers();
      app.io.emit("player-connected", players);
    });
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port} 👂`);
});
