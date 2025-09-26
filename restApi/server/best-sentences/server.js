const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data', 'best-sentences.json');

// Middleware
app.use(cors());
app.use(express.json());

// Asegurar que el directorio de datos existe
const initDataDir = async () => {
  try {
    await fs.ensureDir(path.dirname(DATA_FILE));
    if (!(await fs.exists(DATA_FILE))) {
      await fs.writeJson(DATA_FILE, []);
    }
  } catch (error) {
    console.error('Error initializing data directory:', error);
  }
};

// Funciones helper para manejar los datos
const readData = async () => {
  try {
    return await fs.readJson(DATA_FILE);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

const writeData = async (data) => {
  try {
    await fs.writeJson(DATA_FILE, data, { spaces: 2 });
  } catch (error) {
    console.error('Error writing data:', error);
    throw error;
  }
};

// Routes

// GET /best-sentences - Obtener todas las frases
app.get('/best-sentences', async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// GET /best-sentences/:characterId - Obtener frase de un personaje específico
app.get('/best-sentences/:characterId', async (req, res) => {
  try {
    const characterId = parseInt(req.params.characterId);
    const data = await readData();
    const sentence = data.find(item => item.characterId === characterId);

    if (!sentence) {
      return res.status(404).json({ error: 'Sentence not found' });
    }

    res.json(sentence);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST /best-sentences - Crear nueva frase
app.post('/best-sentences', async (req, res) => {
  try {
    const { characterId, sentence } = req.body;

    if (!characterId || !sentence) {
      return res.status(400).json({ error: 'characterId and sentence are required' });
    }

    const data = await readData();

    // Verificar si ya existe
    const existingIndex = data.findIndex(item => item.characterId === characterId);
    if (existingIndex >= 0) {
      return res.status(409).json({ error: 'Sentence already exists for this character' });
    }

    const newSentence = {
      id: data.length > 0 ? Math.max(...data.map(item => item.id || 0)) + 1 : 1,
      characterId,
      sentence,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.push(newSentence);
    await writeData(data);

    res.status(201).json(newSentence);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sentence' });
  }
});

// PUT /best-sentences/:characterId - Actualizar frase existente
app.put('/best-sentences/:characterId', async (req, res) => {
  try {
    const characterId = parseInt(req.params.characterId);
    const { sentence } = req.body;

    if (!sentence) {
      return res.status(400).json({ error: 'sentence is required' });
    }

    const data = await readData();
    const existingIndex = data.findIndex(item => item.characterId === characterId);

    if (existingIndex < 0) {
      return res.status(404).json({ error: 'Sentence not found' });
    }

    data[existingIndex].sentence = sentence;
    data[existingIndex].updatedAt = new Date().toISOString();

    await writeData(data);

    res.json(data[existingIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sentence' });
  }
});

// DELETE /best-sentences/:characterId - Eliminar frase
app.delete('/best-sentences/:characterId', async (req, res) => {
  try {
    const characterId = parseInt(req.params.characterId);
    const data = await readData();
    const existingIndex = data.findIndex(item => item.characterId === characterId);

    if (existingIndex < 0) {
      return res.status(404).json({ error: 'Sentence not found' });
    }

    const deleted = data.splice(existingIndex, 1)[0];
    await writeData(data);

    res.json({ message: 'Sentence deleted successfully', deleted });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sentence' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Inicializar y arrancar servidor
const startServer = async () => {
  await initDataDir();

  app.listen(PORT, () => {
    console.log(`🚀 Best Sentences Server running on http://localhost:${PORT}`);
    console.log(`📝 Data stored in: ${DATA_FILE}`);
    console.log('\nAvailable endpoints:');
    console.log(`  GET    /best-sentences`);
    console.log(`  GET    /best-sentences/:characterId`);
    console.log(`  POST   /best-sentences`);
    console.log(`  PUT    /best-sentences/:characterId`);
    console.log(`  DELETE /best-sentences/:characterId`);
    console.log(`  GET    /health`);
  });
};

startServer().catch(console.error);
