package project.app.nocando.web.controller;

import org.springframework.http.ResponseEntity;
import project.app.nocando.business.payload.request.BaseRequest;
import project.app.nocando.business.payload.response.BaseResponse;

import java.util.List;

public interface BaseController<T extends BaseRequest, E extends BaseResponse> {

    public ResponseEntity<E> getById(String id);

    public ResponseEntity<List<E>> getAll();

    public  ResponseEntity<E> add(T eto);

    public ResponseEntity<E> update(String id, T eto);

    public ResponseEntity<E> delete(String id);
}
