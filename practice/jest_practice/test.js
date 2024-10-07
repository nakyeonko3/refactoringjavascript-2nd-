test("return a user object", () => {
  expect(getUser(1)).toEqual({ id: 1, email: "user1@test.com" });
});
test("Boolean(1) 은 Truthy이다.", () => {
  expect(Boolean(1)).toBe(true);
});

test("Boolean(1) 은 Truthy이다.", () => {
  expect(1).toBeTruthy();
});

function getUser(id) {
  return {
    id,
    email: `user${id}@test.com`,
  };
}

/* 
# jest 테스트 코드 작성법
1. toEqual: 객체간 비교할 때는 toBe보다는 toEqual를 사용해라.
2. toBe: 프라이미티브 비교간에는 유용함.
3. toBeFalsy, toBeTruthy: Boolean()안에 넣는것과 같은 효과임. 


# 의문점
- Q: 왜 jest --watchAll 실행중일 때 package.json에서 수정한 내용(jest 관련 설정을 추가함)이 바로 반영되지 않았을까?
- A: jest 프로그램에서 일부 테스트 코드만 재실행하고 설정 관련 코드는 완전시 다시 실행시키지 않기 때문에 완전히 껃다가 켜야지 해결되는 경우가 생기는 것 같다.
*/
