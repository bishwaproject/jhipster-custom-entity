package com.takeo.japp.service.impl;

import com.takeo.japp.domain.Student;
import com.takeo.japp.repository.StudentRepository;
import com.takeo.japp.service.StudentService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Student}.
 */
@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    private final Logger log = LoggerFactory.getLogger(StudentServiceImpl.class);

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student save(Student student) {
        log.debug("Request to save Student : {}", student);
        return studentRepository.save(student);
    }

    @Override
    public Student update(Student student) {
        log.debug("Request to update Student : {}", student);
        return studentRepository.save(student);
    }

    @Override
    public Optional<Student> partialUpdate(Student student) {
        log.debug("Request to partially update Student : {}", student);

        return studentRepository
            .findById(student.getId())
            .map(existingStudent -> {
                if (student.getPhoto() != null) {
                    existingStudent.setPhoto(student.getPhoto());
                }
                if (student.getPhotoContentType() != null) {
                    existingStudent.setPhotoContentType(student.getPhotoContentType());
                }
                if (student.getFirstName() != null) {
                    existingStudent.setFirstName(student.getFirstName());
                }
                if (student.getLastName() != null) {
                    existingStudent.setLastName(student.getLastName());
                }
                if (student.getEmail() != null) {
                    existingStudent.setEmail(student.getEmail());
                }
                if (student.getPhoneNumber() != null) {
                    existingStudent.setPhoneNumber(student.getPhoneNumber());
                }
                if (student.getCourse() != null) {
                    existingStudent.setCourse(student.getCourse());
                }
                if (student.getStartDate() != null) {
                    existingStudent.setStartDate(student.getStartDate());
                }

                return existingStudent;
            })
            .map(studentRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> findAll() {
        log.debug("Request to get all Students");
        return studentRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Student> findOne(Long id) {
        log.debug("Request to get Student : {}", id);
        return studentRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Student : {}", id);
        studentRepository.deleteById(id);
    }
}
