package project.app.nocando.config;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@EnableScheduling
@Component
public class ScheduleTasks {

    @Scheduled(cron = "0 0 0 * * ?", zone = "Europe/Warsaw")
    public void performTaskAtMidnight() {
        // Kod do wykonania o północy
    }
}
