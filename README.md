# 웹/모바일(웹 기술) 스켈레톤 프로젝트

## 프로젝트 상세 설명

### 개발 환경 및 기술 스택

- Java 17
- Spring Boot
- Vue.js
- Frontend: Visual Studio Code
- Backend: IntelliJ IDEA



### ERD

![sub_pjt1_erd](README.assets/sub_pjt1_erd.png)

- 실선: 식별 관계 (identifying relationship) - 부모 테이블의 PK가 자식 테이블의 PK 또는 FK)
- 점선: 비식별 관계 (non-identifying relationship) - 부모 테이블의 PK가 자식 테이블의 일반 속성
- 데이터 형식
  - INT (4 bytes): `-2^31` ~ `2^31-1`
  - SMALLINT (2 bytes): `-2^15` ~ `2^15-1`
  - TINYINT (1 byte): `0` ~ `2^8`
  - VARCHAR: MySQL 4.1 이후부터 타입의 크기 = 글자수 (한글, ASCII 무관)



## TIL 2021/01/11 (화)

### 인증

> HTTP는 무상태 (stateless) 프로토콜이므로 로그인한 유저들이 요청할 때 유저의 접속 정보를 관리하기 위한 방법이 필요함. 크게는 세션 인증과 토큰 인증으로 나눌 수 있음.



#### 세션 인증

> 쿠키를 사용한 인증 방법

- 흐름
  - 사용자 로그인
  - 서버에서 사용자를 확인한 후, 고유한 ID값을 부여해 세션 저장소에 저장. 이와 연결되는 세션 ID 발급
  - 사용자는 서버에서 해당 세션 ID를 받아 쿠키에 저장. 이후 요청마다 쿠키를 헤더에 넣어 보냄
  - 서버는 쿠키를 받아 세션 저장소에 대조, 대응되는 정보를 가져옴
  - 인증 후 서버는 사용자에게 맞는 데이터를 보내줌
- 장점
  - 구현이 명확
  - 서버에서 세션 ID가 관리되므로 상대적으로 안전
  - ID값이 고유하므로 서버가 쿠키 값을 받았을 때 회원정보를 확인 할 필요 없이 바로 어떤 회원인지 확인 가능. -> 서버 자원에 접근하기 용이
- 단점
  - 세션 하이재킹이 가능 (해커가 요청을 가로채어 쿠키를 얻으면 서버가 사용자를 오인하게 할 수 있음)
    - HTTPS 사용, 세션의 유효 시간 설정으로 해결 가능
  - 세션 정보가 서버에 저장되므로 추가적인 저장 공간 요구, 서버 부하 



#### 토큰 인증

> 인증에 필요한 정보를 암호화시킨 토큰 (대표적으로 JWT)을 활용하는 인증 방법

- JWT 토큰 구성
  - 헤더 (header): 토큰의 타입과 해시 암호화 알고리즘
  - 페이로드 (payload): 토큰에서 사용할 정보의 조각 (claim)을 담고 있음
  - 서명 (signature): 토큰을 인코딩하거나 유효성 검증을 할 때 사용하는 암호화 코드. 헤더와 페이로드를 BASE64로 인코딩 후 SECRET KEY를 이용해 해싱, 이 값을 다시 BASE64로 인코딩

- 흐름
  - 사용자 로그인
  - 서버에서 사용자를 확인한 후, 토큰을 발급
  - 사용자는 서버에서 토큰을 받아 local storage에 저장. 이후 요청마다 토큰을 헤더에 넣어 보냄
  - 서버는 토큰 정보를 검증한 뒤 사용자에게 맞는 데이터를 보내줌
- 장점
  - 세션/쿠키와 같이 별도의 저장소 관리가 불필요 -> 서버 유지 보수에 유리
  - 높은 확장성 (토큰 기반의 다른 인증 시스템에 접근 가능)
- 단점
  - 이미 발급된 토큰은 악의적인 사용자도 유효기간이 지나기 전까지 사용 가능
    - 토큰의 유효기간을 짧게 하고 정기적으로 재발급을 요구하여 보완
  - 페이로드의 정보가 제한적 (디코딩으로 누구나 정보를 확인할 수 있어 유저의 중요한 정보는 넣을 수 없다)
  - 토큰의 길이가 길어 인증이 필요한 요청이 많아질수록 서버 부하



### Spring Boot

#### 프로젝트 생성

> start.spring.io

- 프로젝트 (Maven, Gradle): 필요한 라이브러리 가져오고, build하는 라이프 사이클 관리해주는 툴. 요즘 주로 Gradle 사용
- 의존성 (dependency): 어떤 라이브러리를 가져와 사용할 것인가?

- 구조
  - `gradle`: gradle 관련 폴더
  - `src/main/java`:  실제 패키지 및 소스 파일
  - `src/main/resources`: Java 파일 제외한 파일
  - `src/test`: 테스트 코드용
  - `build.gradle`



#### 동작 환경

![img](README.assets/image.png)

[^Source]: https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8/lecture/49573

- Controller에서 리턴 값으로 문자를 반환하면 `viewResolver`가 화면을 찾아서 처리한다.
  - 스프링 부트 템플릿엔진 기본 `viewName`매핑
    `resources:templates/` +`{ViewName}`+ `.html`



## TIL 2021/01/12 (수)

### Spring 웹 개발

> 정적 컨텐츠, MVC와 템플릿 엔진, API



#### 정적 컨텐츠

- Spring Boot 자동으로 제공하는 기능
- 웹 브라우저에서 요청이 들어오면 우선 관련 컨트롤러를 찾고, 이가 없다면 `resources`에서 파일을 찾음. 찾은 파일은 서버에서 그대로 반환
- `/static`, `/public`, `/resources`, `/META/INF/resources`



#### MVC와 템플릿 엔진

> Model, View, Controller

- 웹 브라우저에서 요청이 들어오면 Tomcat 서버가 Spring으로 넘김
- 컨트롤러에서 매핑되어 있는 메서드를 호출 
- 템플릿 엔진은 return값과 같은 이름의 템플릿을 찾아 렌더링 (viewResolver), 변환을 한 HTML 파일을 웹 브라우저에 반환

- Model, Controller: 로직 구현 및 내부적 처리

  `main/java/project/controller/`에 컨트롤러 java 파일

  ```java
  @Controller
  public class HelloController {
      
      @GetMapping("hello-mvc")  // hello-mvc로 요청시 해당 컨트롤러 실행
      // view에서 렌더링시 model 활용
      public String helloMvc(@RequestParam("name") String name, Model model) {  
          model.addAttribute("name", name);  // key, value
          return "hello-template";  // hello-template 템플릿을 반환
      }
  }
  ```

- View: 화면 그리기

  `main/resources/templates`에 템플릿 html 파일



#### API

- MVC와의 차이: view, template 없음!
- 웹 브라우저에서 요청이 들어오면 Tomcat 서버가 Spring으로 넘김
- 컨트롤러에서 매핑되어 있는 메서드를 호출 (`@ResponseBody` 어노테이션이 있음)
- 문자열이면 그대로 반환, 객체면 JSON 방식으로 데이터를 만들어 반환

- Controller

  - 문자 반환

  ```java
  @GetMapping("hello-string")
  @ResponseBody  // HTTP의 body부에 return값을 직접 넣기 위한 어노테이션 
  public String helloString(@RequestParam("name") String name) {
      return "hello " + name;
  }
  ```

  - 데이터 반환 (JSON 방식)

  ```java
  @GetMapping("hello-api")
  @ResponseBody
  public Hello helloApi(@RequestParam("name") String name) {
      Hello hello = new Hello();  // 생성자: Hello 클래스의 객체 생성
      hello.setName(name);
      return hello;
  }
  
  static class Hello {
      private String name;  // 은닉된 변수
      
      // getter: 은닉된 변수의 값 읽기
      public String getName() {
          return name;
      }
      
      // setter: 은닉된 변수에 값 넣기
      public void setName(String name) {
          this.name = name;
      }   
  }
  ```

  

## TIL 2021/01/13 (목)

### JPA

> Java Persistence API

- Java ORM 기술에 대한 표준 명세
- ORM을 사용하기 위한 인터페이스의 모음
- ORM 프레임워크를 선택해야 하며, 구현체 중에서는 대표적으로 Hibernate가 있다.



#### 장점

- 객체 지향적인 코드 및 데이터 관리 -> 비즈니스 로직에 집중 가능, 프로그램 구조를 일관되게 유지 가능
- SQL을 직접 작성할 필요가 없음 -> 유지보수가 편리
- DB 컬럼이 추가될 때마다 테이블 수정, SQL 수정하는 과정이 줄어듦
- DBMS가 변경되어도 소스, 쿼리, 구현 방법, 자료형 타입 등을 변경할 필요 없음 -> DBMS에 대한 종속성이 줄어듦



#### 단점

- 높은 난이도: JPA의 장점을 살리기 위해 많은 학습이 필요

- 복잡한 쿼리는 속도를 위해 별도의 튜닝 필요 (SQL문을 쓰는 것이 유리할 수도 있음)

- 프로젝트 규모가 크고 복잡하여 설계가 잘못된 경우, 속도 저하 및 일관성을 무너뜨리는 문제

  

#### 기본 이론

> https://incheol-jung.gitbook.io/docs/study/jpa



### Spring Boot REST API 구현

#### @Controller vs @RestController

> Spring에서 컨트롤러를 지정해주기 위한 어노테이션

- `@Controller` (Spring MVC Controller)
  - 주로 View 반환에 사용
  - 데이터를 반환하기 위해서는 `@ResponseBody`어노테어션 활용
- `@RestController` (Spring RESTful Controller)
  - Spring MVC Controller에 `@ResponseBody`가 추가된 것으로 주로 JSON 데이터 반환에 사용



#### @RequestMapping

> URL을 컨트롤러에 매핑해주는 어노테이션

- String 배열로 여러 개 지정, 와일드카드 사용 가능

  ```java
  @RequestMapping("/post")
  @RequestMapping("/post.*")
  @RequestMapping({"post", "/P"})
  ```

  

#### ResponseEntity

> HttpEntity 상속받는 객체, 상태 코드를 직접적으로 지정할 수 있음

- 일반적인 API가 반환하는 리소스는 상태 코드, 응답 메시지 등 value 이외도 포함하는데, 이를 위해 사용되는 클래스



#### API Test

>  회원가입
> [POST] `api/v1/users`

- Body에 데이터를 보낼 때 raw text가 아닌 JSON 형식으로 보내야 함 (그렇지 않을 경우 415 Unsupported Media Type 에러 발생)

  

  ![apitest_01](README.assets/apitest_01.png)

- 이미 존재하는 사용자 아이디일 경우 409 반환

  ![apitest_02](README.assets/apitest_02.png)



> 로그인
> [POST] `api/v1/auth/login`

- 로그인 성공시 JWT Token 발급

  ```java
  if(passwordEncoder.matches(password, user.getPassword())) {
      return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId)));
  }
  return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "잘못된 비밀번호입니다.", null));
  ```

  

  ![apitest_03](README.assets/apitest_03.png)

- 틀린 비밀번호 입력시 401 반환

![apitest_04](README.assets/apitest_04.png)

- 존재하지 않는 계정 입력시 404 반환

  ```java
  User user = userService.getUserByUserId(userId);
  
  if(user == null) {
  	return ResponseEntity.status(404).body(UserLoginPostRes.of(404, "존재하지 않는 계정입니다.", null));
  }
  ```

  ![apitest_05](README.assets/apitest_05.png)



> 내 프로필
> [GET] `/users/me`

![apitest_06](README.assets/apitest_06.png)



>존재하는 회원 확인
>[GET] `/users/<string:userId>`

- 존재하는 아이디인 경우 409 반환

  ```java
  User user = userService.getUserByUserId(userId);
  if (user == null) {
  	return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
  } else {
  	return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 존재하는 사용자 ID 입니다."));
  }
  ```

![apitest_07](README.assets/apitest_07.png)



> 유저 정보 수정
> [PATCH] `/users/<string:userId>`

- `userService.modifyUser` 메서드 활용
- 변경 사항은 내 프로필 요청으로 확인 가능

![apitest_08](README.assets/apitest_08.png)



>유저 정보 삭제 (회원 탈퇴)
>[DELETE] `/users/<string:userId>`

- `userService.deleteUser` 메서드 활용
- 변경 사항은 존재하는 회원 요청으로 확인 가능



> 인증이 필요한 API 요청은 다음과 같이 Bearer Token 형식으로 JWT Token값을 전달한다.
> Postman이 Header의 Authorization 필드를 자동으로 추가해줌

![apitest_09](README.assets/apitest_09.png)



### Swagger

> 서비스의 API들에 대한 테스트를 해 볼 수 있는 도구

- API의 스펙을 자동으로 문서화
- 프로젝트에서 지정한 URL을 HTML로 확인할 수 있게 해 줌
- 예시 (해당 프로젝트의 User 및 인증 관련 API의 Swagger UI)

![swagger_03](README.assets/swagger_03.png)

#### 어노테이션

- `@ApiOperation`
  - API의 이름, 설명을 기록
  - Controller에 작성
  - `value`: API 이름, `notes`: API 설명

![swagger_01](README.assets/swagger_01.png)

- `@ApiResponses`

  - API의 응답을 기록
  - Controller에 작성
  - `code`: HttpStatus, `message`: 응답 메시지, `response`: 응답 형태

  ![swagger_02](README.assets/swagger_02.png)

- `@ApiModel`
  - 모델을 설명할 때 사용
  - Value Object (VO), Data Transfer Object (DTO), Entity 등 모델에서 사용
  - `description`: 모델을 설명하는 옵션

- `@ApiModelProperty`

  - 모델의 필드를 설명할 때 사용

  - Value Object (VO), Data Transfer Object (DTO), Entity 등 모델에서 사용

  - `required`: 필수 여부 (true/false), `value`: 필드 이름, `example`: 필드 예시, `hidden`: 필드 숨김 여부 (true/false)

- `@ApiIgnore`

  - Swagger UI상 무시
  - 메서드의 return type 앞에 명시하면 해당 메서드는 Swagger UI에 노출되지 않음



### Java Bean

> 반복적인 작업을 효율적으로 하기 위해 사용하는 특정 형태의 클래스

- 필드가 private로 구성 (getter, setter를 통해서만 접근 가능)
- 전달 인자가 없는 (no-argument) 생성자를 가짐



### Spring Bean

> 스프링 IoC 컨테이너가 관리하는 Java 객체

- 스프링에 의해 생성, 라이프 사이클 수행, 의존성 주입
- **스프링에게 제어권을 넘긴 객체** (개발자가 관리하지 않음)
- `@Bean`어노테이션으로 등록



## 기타 학습 내용

### Java 문법 기초

#### Syntax

- 실행되는 코드는 모두 `class`안에 작성하며, `class`명은 Java 파일명과 동일해야 함
- `main()`: 실행되는 코드가 작성되는 메서드
- `System.out.println()`: 콘솔 출력 메서드, python의 `print()`와 같은 역할
- 주석 처리: `//` (단일 행), `/* */` (여러 행)

#### 변수

- `String`, `int`, `float`, `char`, `boolean` (단일 문자형과 문자열을 구분짓는 점이 python과 차이)

- 변수형은 명시적으로 선언해야 함

  ```java
  String name = "kim";
  int myNum = 20;
  ```

- `final` 키워드를 사용하면 상수 (불변값) 선언 가능

  ```java
  final int myNum = 20;
  ```

#### 원시 타입 vs 참조 타입

- 원시 타입 (primitive type): Java 내부적으로 정의되어 있는 타입

  - 메서드 호출 불가

  - 항상 값을 가짐

  - 소문자로 시작

  - 타입에 따라 크기가 다름

  - `byte`, `short`, `int`, `long`, `float`, `double`, `boolean`, `char`

  - 작은 크기 -> 큰 크기의 타입은 자동으로 캐스팅 가능, 반대의 경우 값 앞에 괄호로 명시해야 함

    ```java
    int myInt = 9;
    double myDouble = myInt;  // widening casting
    
    double myDouble = 9.78d;
    int myInt = (int) myDouble;  // narrowing casting
    ```

- 참조 타입 (reference type): 객체를 참조하는 타입

  - 메서드 호출 가능
  - `null`값을 가질 수 있음
  - 대문자로 시작
  - 크기 일정
  - `String`, `Array`, `Class`, `Interface` 등

#### 연산자

- Python과 유사하나 `+=1`, `-=1`과 동일한 `++`, `--`연산자 존재

#### 각종 조건문 및 반복문

> `if/else` 구문

```java
if (condition) {
    // 조건이 참이면 수행할 코드;
} else {
    // 조건이 거짓이면 수행할 코드
}
```

> `switch` 구문
> 특정 값에 따라 여러 코드 블록 중 하나를 선택하여 수행해야 할 경우에 사용. Python의 `if/elif/else`구조와 유사

```java
switch (expression) {
    case a:
        // 코드;
        break;
    case b:
        // 코드;
        break;
    default:  // 매칭되는 case가 없을 경우 수행
        // 코드
}
```

> `while`문

```java
while (condition) {
    // 수행할 코드;
}
```

> `for` loop
> 반복문을 몇 번 실행해야 하는지 알 때 활용. C언어와 유사

```java
for (처음 수행, 조건, 코드 블록 수행 후 매 번 수행) {
    // 코드 블록;
}
```

#### 배열

- 변수형을 `[]`와 함께 선언

  ```java
  String[] fruits = {"apple", "banana", "orange"};
  ```

- 인덱스로 접근 및 값 변경 가능

#### 메서드

- 호출될 때 수행되는 코드 블럭

  ```java
  public class Main {
      static void myMethod() {
          // 코드 블럭;
      }
      
      static void mySecondMethod(String paramName, int paramNum) {  // 인자를 받음
          // 코드 블럭
      }
      
      static int myMethod (int x) {
          return x + 5;  // 반환
      }
      
      public static void main(String[] args) {
          myMethod();  // 코드 블럭 내 코드 수행
      }
  }
  ```

  - `static`: 메서드가 `Main` class의 객체가 아닌 고정된 멤버임을 의미
  - `void`: 메서드의 반환값이 없음을 의미
  - `int`: 메서드의 반환값이 정수형임을 의미
