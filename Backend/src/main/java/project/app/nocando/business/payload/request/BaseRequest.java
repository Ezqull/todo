package project.app.nocando.business.payload.request;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class BaseRequest {
    private String id;
}
