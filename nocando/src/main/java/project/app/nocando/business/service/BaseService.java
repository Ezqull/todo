package project.app.nocando.business.service;

import org.springframework.stereotype.Service;
import project.app.nocando.business.payload.request.BaseRequest;
import project.app.nocando.business.payload.response.BaseResponse;
import project.app.nocando.data.model.BaseEntity;
import project.app.nocando.data.repo.BaseRepository;

import java.util.List;

public interface BaseService<T extends BaseRequest, E extends BaseResponse> {
    public E getById(String id);
    public List<E> getAll();
    public E save(T requset);
    public E update(T request, String id);
    public void delete(String id);
}
