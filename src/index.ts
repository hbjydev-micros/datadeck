import app from "./app";

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Started on port ${process.env.PORT ?? 3000}.`);
});

function closeGracefully(signal: string): void {
  process.exit()
}

process.on('SIGINT', closeGracefully);
