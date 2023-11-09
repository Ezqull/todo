package project.app.nocando.business.payload.response;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class BaseResponse {
    private String id;
}
