package project.app.nocando.data.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "token")
public class TokenEntity extends BaseEntity{
    @Column(name = "token",
            nullable = false,
            unique = true)
    private String token;
    @Enumerated(EnumType.STRING)
    @Column(name = "token_type",
            nullable = false)
    private TokenType type;
    @Column(name = "expired",
            nullable = false)
    private Boolean expired;
    @Column(name = "revoked",
            nullable = false)
    private Boolean revoked;
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "user_id",
                referencedColumnName = "id")
    private UserAccountEntity user;
}
