import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import {ConfigService} from "@nestjs/config";

interface EmailOptions {
    from: string;
    to: string | string[];
    subject: string;
    html?: string;
}

interface TemplateParams {
    [key: string]: string;
}

class EmailService {
    private transporter: Mail;


    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASSWORD'),
            },
        });
    }

    async enviarEmailComTemplate(templateName: string, destinatario: string, assunto: string, parametros: TemplateParams): Promise<void> {
        try {
            const templatePath = path.resolve(__dirname, `template/${templateName}.html`);
            let html = await promisify(fs.readFile)(templatePath, 'utf8');
            Object.keys(parametros).forEach(key => {
                const regex = new RegExp(`{{${key}}}`, 'g');
                html = html.replace(regex, parametros[key]);
            });

            await this.enviarEmail({
                from: this.configService.get('EMAIL_FROM'),
                to: destinatario,
                subject: assunto,
                html: html,
            });

            console.log(`E-mail enviado para ${destinatario} com sucesso.`);
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            throw error;
        }
    }

    private async enviarEmail(opcoes: EmailOptions): Promise<void> {
        try {
            const info = await this.transporter.sendMail({
                ...opcoes,
            });
            console.log('E-mail enviado:', info.messageId);
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            throw error;
        }
    }
}

export default EmailService;
