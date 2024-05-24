package com.catwalk.world.exception;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class exceptionHandler {

    @ExceptionHandler(NumberFormatException.class)
    public ResponseEntity<Object> numberFormatExceptionHandler(NumberFormatException e) {
        return new ResponseEntity<>("숫자 형식이 올바르지 않습니다", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> illegalArgumentExceptionHandler(IllegalArgumentException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Object> dataAccessExceptionHandler(DataAccessException e) {
        return new ResponseEntity<>("요청을 처리하는데 실패했습니다", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> runtimeExceptionHandler(RuntimeException e) {
        return new ResponseEntity<>("요청을 처리하는데 실패했습니다", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
