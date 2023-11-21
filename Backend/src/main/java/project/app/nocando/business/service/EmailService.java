package project.app.nocando.business.service;

import project.app.nocando.business.payload.email.EmailDetails;

public interface EmailService {
    String sendSimpleMail(EmailDetails details);
    String sendMailWithAttachment(EmailDetails details);
}
