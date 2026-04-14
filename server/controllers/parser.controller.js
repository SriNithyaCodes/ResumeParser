const fs = require('fs');
const { PDFParse } = require('pdf-parse');
const mammoth = require('mammoth');
const Tesseract = require('tesseract.js');
const { OpenAI } = require('openai');
const path = require('path');

// Local DB simulation using a JSON file
const DB_PATH = path.join(__dirname, '../data/history.json');
if (!fs.existsSync(path.join(__dirname, '../data'))) {
  fs.mkdirSync(path.join(__dirname, '../data'));
}
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

const getDB = () => JSON.parse(fs.readFileSync(DB_PATH));
const saveDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

exports.parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileExt = path.extname(req.file.originalname).toLowerCase();
    let extractedText = '';

    // 1. Extract Text based on file type
    if (fileExt === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const parser = new PDFParse({ data: dataBuffer });
      const result = await parser.getText();
      extractedText = result.text;
      await parser.destroy();
    } else if (fileExt === '.docx' || fileExt === '.doc') {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    } else if (['.png', '.jpg', '.jpeg'].includes(fileExt)) {
      const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
      extractedText = text;
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }

    // 2. Process with AI (or Mock)
    let parsedData;
    if (openai) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional resume parser. Extract the following information from the text and return it as a structured JSON: name, email, phone, location, summary, education (array of {degree, university, year}), experience (array of {company, role, duration, description}), skills (array of strings), projects (array of {title, description}), a matchingScore (0-100 based on resume quality), and suggestions (array of strings for improvement)."
          },
          { role: "user", content: extractedText }
        ],
        response_format: { type: "json_object" }
      });
      parsedData = JSON.parse(completion.choices[0].message.content);
    } else {
      // Mock Data for Demo
      parsedData = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        location: "New York, NY",
        summary: "Results-driven Software Engineer with 5+ years of experience in building scalable web applications.",
        education: [
          { degree: "B.S. Computer Science", university: "Tech University", year: "2018" }
        ],
        experience: [
          { company: "InnoTech", role: "Senior Developer", duration: "2018 - Present", description: "Led development of various AI-powered features." }
        ],
        skills: ["React", "Node.js", "Python", "AWS", "Docker"],
        projects: [
          { title: "AI Image Generator", description: "A tool that generates images using Stable Diffusion." }
        ],
        matchingScore: 85,
        suggestions: [
          "Add more quantitative metrics to experience.",
          "Highlight role-specific keywords.",
          "Expand on the 'AI Image Generator' project."
        ]
      };
      
      // Attempt to extract name/email from text even in mock mode for better feel
      const emailMatch = extractedText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (emailMatch) parsedData.email = emailMatch[0];
      
      const nameMatch = extractedText.split('\n')[0].trim();
      if (nameMatch && nameMatch.length < 50) parsedData.name = nameMatch;
    }

    // 3. Save to History
    const db = getDB();
    const newEntry = {
      id: Date.now().toString(),
      fileName: req.file.originalname,
      date: new Date().toISOString(),
      ...parsedData
    };
    db.push(newEntry);
    saveDB(db);

    // 4. Cleanup temp file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json(newEntry);
  } catch (error) {
    console.error('Parsing Error:', error);
    res.status(500).json({ error: 'Failed to parse resume', details: error.message });
  }
};

exports.getHistory = (req, res) => {
  try {
    const db = getDB();
    res.json(db);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

exports.deleteHistory = (req, res) => {
  try {
    const { id } = req.params;
    let db = getDB();
    db = db.filter(entry => entry.id !== id);
    saveDB(db);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete entry' });
  }
};
