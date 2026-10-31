import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export const sendEmail = async ({ to, html, subject }) => {
    try {
        const info = await transporter.sendMail({
            from: `"AI RESUME ANALYZER" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });

        console.log("Email sent:", info.messageId);

        
    } catch (err) {
        console.error("Email sending failed:", err);
        throw err;
    }
};