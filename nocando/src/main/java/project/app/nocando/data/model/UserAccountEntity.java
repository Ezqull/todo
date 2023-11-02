package project.app.nocando.data.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "user_account")
public class UserAccountEntity extends BaseEntity {
    @Column(name = "username",
            nullable = false,
            unique = true)
    private String username;

    @Column(name = "password",
            nullable = false)
    private String password;

    @OneToMany(mappedBy = "user")
    private Set<TaskEntity> tasks = new HashSet<>();
}
