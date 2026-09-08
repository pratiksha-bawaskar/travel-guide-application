package com.travelguide.service;

import com.travelguide.dto.UserDTO;
import com.travelguide.model.User;
import com.travelguide.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUser() {
        UserDTO dto = new UserDTO();
        dto.setUsername("pratiksha");
        dto.setEmail("p@gmail.com");
        dto.setPassword("1234");

        User saved = new User(1L, "pratiksha", "p@gmail.com", "1234");

        when(userRepository.save(any(User.class))).thenReturn(saved);

        User result = userService.registerUser(dto);

        assertNotNull(result);
        assertEquals("pratiksha", result.getUsername());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testGetUserById() {
        User u = new User(1L, "test", "t@gmail.com", "pass");

        when(userRepository.findById(1L)).thenReturn(Optional.of(u));

        User result = userService.getUserById(1L);

        assertNotNull(result);
        assertEquals("test", result.getUsername());
    }

    @Test
    void testLoginUser_Success() {
        User u = new User(1L, "pratiksha", "p@gmail.com", "12345");

        when(userRepository.findByEmail("p@gmail.com"))
                .thenReturn(Optional.of(u));

        User result = userService.loginUser("p@gmail.com", "12345");

        assertNotNull(result);
        assertEquals("pratiksha", result.getUsername());
    }

    @Test
    void testLoginUser_Fail() {
        when(userRepository.findByEmail("wrong@gmail.com"))
                .thenReturn(Optional.empty());

        User result = userService.loginUser("wrong@gmail.com", "123");

        assertNull(result);
    }
}
