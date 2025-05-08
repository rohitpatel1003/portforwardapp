const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
const kill = require('tree-kill');

let processes = {};

const commands = JSON.parse(fs.readFileSync('../commands.json', 'utf-8'));


app.get('/status', (req, res) => {
  const grouped = commands.map(group => ({
    category: group.category,
    services: group.services.map(service => ({
      ...service,
      running: !!processes[service.id]
    }))
  }));
  res.json(grouped);
});

app.post('/start/:id', (req, res) => {
  const serviceId = req.params.id;
  let foundService;

  for (const group of commands) {
    const svc = group.services.find(s => s.id === serviceId);
    if (svc) {
      foundService = svc;
      break;
    }
  }

  if (!foundService || processes[serviceId]) {
    return res.status(400).send('Invalid or already running');
  }

  const proc = spawn(foundService.command, { shell: true });
  processes[serviceId] = proc;

  proc.stdout.on('data', data => console.log(`[${foundService.name}]: ${data}`));
  proc.stderr.on('data', data => console.error(`[${foundService.name} ERR]: ${data}`));
  proc.on('close', () => {
    delete processes[serviceId];
  });

  res.send('Started');
});


app.post('/stop/:id', (req, res) => {
  const proc = processes[req.params.id];
  if (!proc) return res.status(400).send('Not running');

  kill(proc.pid, 'SIGKILL', (err) => {
    if (err) {
      console.error('Failed to kill process:', err);
      return res.status(500).send('Failed to stop');
    }

    delete processes[req.params.id];
    res.send('Stopped');
  });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
