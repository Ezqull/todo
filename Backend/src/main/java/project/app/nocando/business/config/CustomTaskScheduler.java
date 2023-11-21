package project.app.nocando.business.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.TaskScheduler;
import project.app.nocando.business.payload.email.EmailDetails;
import project.app.nocando.business.payload.response.TaskEmailResponse;
import project.app.nocando.business.service.EmailService;
import project.app.nocando.business.service.TaskService;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Configuration
@EnableScheduling
@AllArgsConstructor
public class CustomTaskScheduler {

    private TaskService service;
    private final EmailService emailService;

//    @Scheduled(cron = "0 0 0 * * ?", zone = "Europe/Warsaw")
    @Scheduled(fixedDelay = 10000)
    public void performTaskAtMidnight() {
        service.updateTaskDateForIncompleteTasks();
    }

//    @Scheduled(fixedDelay = 10000)
//    @Scheduled(cron = "0 0 9 * * *", zone = "Europe/Warsaw")
    public void sendReminderForUnfinishedTasks() {
        LocalDate today = LocalDate.now();
        List<TaskEmailResponse> tasks = service.dateCheckForEmail(today);

        for (TaskEmailResponse task : tasks) {
            EmailDetails details = new EmailDetails();
            details.setRecipient(task.getUserEmail());
            details.setSubject("Przypomnienie o nieukończonym zadaniu: " + task.getTitle());
            long count = ChronoUnit.DAYS.between(task.getFinishDate(),LocalDate.now());
            details.setMsgBody(String.format("""
                                 Przypomnienie: Zadanie %s nie zostało ukończone.
                                 Dni spóźnienia: %d""",
                    task.getTitle(), count));


            emailService.sendSimpleMail(details);
        }
    }

    @Bean
    public TaskScheduler threadPoolTaskScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(10);
        scheduler.setThreadNamePrefix("scheduled-task-");
        scheduler.initialize();
        return scheduler;
    }
}