// // pages/api/send-email.js
// import transporter from '../../lib/nodemailer';

// export default async function POST(req, res) {
//   if (req.method === 'POST') {
//     const { to, name } = req.body;

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: to,
//       subject: 'Bem-vindo!',
//       template: 'welcome',
//       context: {
//         name: name,
//       },
//     };

//     try {
//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: 'Email enviado com sucesso!' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Erro ao enviar email' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
