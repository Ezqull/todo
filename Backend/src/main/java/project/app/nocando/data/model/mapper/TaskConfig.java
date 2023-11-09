package project.app.nocando.data.model.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TaskConfig {

    @Bean
    public ModelMapper taskMapper(){

        return new ModelMapper();
    }

}
