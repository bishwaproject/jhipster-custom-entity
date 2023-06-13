import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { StudentService } from '../service/student.service';

import { StudentComponent } from './student.component';

describe('Student Management Component', () => {
  let comp: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'student', component: StudentComponent }]), HttpClientTestingModule],
      declarations: [StudentComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(StudentComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StudentComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StudentService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.students?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to studentService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getStudentIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getStudentIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
