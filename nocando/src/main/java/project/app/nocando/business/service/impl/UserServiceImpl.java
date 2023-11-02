package project.app.nocando.business.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import project.app.nocando.business.exception.RequestWithIdException;
import project.app.nocando.business.exception.UserNotFoundException;
import project.app.nocando.business.payload.request.BaseRequest;
import project.app.nocando.business.payload.request.UserRequest;
import project.app.nocando.business.payload.response.BaseResponse;
import project.app.nocando.business.payload.response.UserResponse;
import project.app.nocando.business.service.UserService;
import project.app.nocando.data.model.UserAccountEntity;
import project.app.nocando.data.repo.UserRepository;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repo;
    private final ModelMapper userMapper;
    @Override
    public UserResponse getById(String id) {
        Objects.requireNonNull(id);

        try {
            return userMapper.map(repo.findById(id), UserResponse.class);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException();
        }
    }

    @Override
    public List<UserResponse> getAll() {
        return repo.findAll().stream()
                .map(entity -> userMapper.map(entity, UserResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse save(UserRequest request) {
        Objects.requireNonNull(request);

        if (request.getId() != null){
            throw new RequestWithIdException();
        }

        UserAccountEntity entity = userMapper.map(request, UserAccountEntity.class);

        return userMapper.map(repo.save(entity), UserResponse.class);
    }

    @Override
    public UserResponse update(UserRequest request, String id) {
        Objects.requireNonNull(request);
        Objects.requireNonNull(id);

        if (request.getId() != null){
            throw new RequestWithIdException();
        }

        request.setId(id);
        UserAccountEntity entity = userMapper.map(request, UserAccountEntity.class);

        return userMapper.map(repo.save(entity), UserResponse.class);
    }

    @Override
    public void delete(String id) {
        Objects.requireNonNull(id);
        try {
            repo.deleteById(id);
        } catch (UserNotFoundException e){
            throw new UserNotFoundException();
        }
    }
}
