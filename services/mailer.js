import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendLessonEmail(lesson) {
  const words = lesson.words
    .map((w, i) => `${i + 1}. ${w.marathi} - ${w.english}`)
    .join("<br>");

  const phrases = lesson.phrases
    .map((p, i) => `${i + 1}. ${p.marathi} - ${p.english}`)
    .join("<br>");

  const dialogue = lesson.dialogue
    .map((d) => `${d.speaker}: ${d.marathi}`)
    .join("<br>");

  const translation = lesson.dialogue
    .map((d) => `${d.speaker}: ${d.english}`)
    .join("<br>");

  const html = `
<h2>🇮🇳 Daily Marathi Lesson</h2>

<h3>Words</h3>
${words}

<h3>Phrases</h3>
${phrases}

<h3>Dialogue</h3>
${dialogue}

<h3>Translation</h3>
${translation}

<p style="color:gray;">Auto generated via AI</p>
`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // change if needed
    subject: "Daily Marathi Lesson",
    html,
  });
}