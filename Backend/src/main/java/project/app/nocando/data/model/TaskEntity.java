package project.app.nocando.data.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "task")
@EqualsAndHashCode(callSuper = true)
public class TaskEntity extends BaseEntity{

    @Column(name = "title",
            nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "priority")
    private Integer priority;

    @Column(name = "task_date")
    private LocalDate taskDate;

    @Column(name = "finish_date")
    private LocalDate finishDate;

    @Column(name = "is_done",
            nullable = false)
    private Boolean isDone;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "user_id",
                referencedColumnName = "id")
    private UserAccountEntity user;
}